import React,{useState, useEffect} from 'react'
import firebase from '../firebase'

// reactstrap components
import {
    Button,
    Table,
    Input,Form, FormGroup,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Row,
    Col,
  
  } from "reactstrap";
import crud from 'service/crud';
import useAdminUsers from 'hooks/useAdminUsers';
import {useSelector, useDispatch} from 'react-redux'
import {Session, Token, reset} from './../redux/userSessionSlice'

function Settings() {
    const[id, setId] = useState()
    const[msg, setMsg] = useState()
    const[token, setToken] = useState()
    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const [keyboard, setKeyboard] = useState(false);
    const[fullname, setFullname] = useState()
    const[phone, setPhone] = useState()
    let adminUsers = useAdminUsers().docs

    const session = useSelector((state)=> state.userSession)
    const dispatch = useDispatch()
    const toggle = () => setModal(!modal);
    const vkey = "BE_msJQNyQnkmTlq21Fmx-z9MK6iNItKMRR1b7FppDzcNaILYtS1eoj8IkOiIRMXuSgIKZE3iKULTiof_LqG2zQ"
    
    useEffect(()=>{
    firebase.firestore().collection("settings").doc("IMPALASETTINGS").onSnapshot((doc)=>{
    setToken(doc.data().token)
    dispatch(Token(doc.data().token))
})
    console.log(session)
    },[])
const getToken = () => {
    const messaging = firebase.messaging()
   messaging.requestPermission()
   .then(function() {
     console.log("have permission")
      return messaging.getToken({vapidKey: vkey}).then((currentToken) => {
     if (currentToken) {
        setId(currentToken)                            
       crud.updateToken({token:currentToken})
       setMsg("Notifications have been enabled")
       .then(function (res) {
                          
       }).catch((e) =>{
         console.log(e)
       })     
     } else {
       console.log('No registration token available. Request permission to generate one.');               
       // shows on the UI that permission is required 
     }
   }).catch((err) => {
     console.log('An error occurred while retrieving token. ', err);
     // catch error while creating client token
   });
   }).catch(function (err){
     console.log("err", err)
   })  
          
  
  }

  function createAdminUser(){
    let data = {
      name:fullname,
      phone: phone
    }
    crud.createAdminUser(data).then(()=>{
      toggle()
      alert("User added")
    }).catch((e)=>{
      alert(e)
    })
  }

  function logout(){
    dispatch(reset())
     firebase.auth().signOut()
     console.log(session)
  }

  function deleteUser(id){
    
      crud.getAdmuinUsers().doc(id).delete().then(()=>{
        alert("User deleted")
      }).catch((e)=>{
        alert("Error deleting the user", e)
      })
  }
  
     return (
         <>
        <Modal isOpen={modal} toggle={toggle}  modalClassName="modal-search fade"  backdrop={backdrop} keyboard={keyboard}>
        <ModalHeader toggle={toggle}>Add new user</ModalHeader>
        <ModalBody>
        <Form>
                  <Row>
                    
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>FUll Name</label>
                        <Input
                           placeholder="Full name" name="model"
                          type="text" value={fullname} onChange={e =>setFullname(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Phone</label>
                        <Input name="make"
                            placeholder="0977123456"
                          type="text" value={phone} onChange={e =>setPhone(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    </Row>
                              
                </Form>                
         </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={createAdminUser}>Add user</Button> 
         <Button color="secondary" onClick={toggle}>Cancel</Button> 
        </ModalFooter>
      </Modal>
        <div className="content">
        <Row>
          <Col><Button onClick={getToken}>Enable Notifications</Button><br/><br/>
          <h4>{token !== undefined ? "Enabled" : "Not Active"}</h4>
          <h4>{msg}</h4>
          <Button  color="primary"  onClick={logout}>Log out</Button>
          </Col>           
          <Col>
         
          <Button onClick={toggle}>Add User</Button> <br/><br/>
          <h4>Current Admin users</h4>
          <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Full Name</th>
                        <th>Phone Number</th>                        
                        <th></th>                           
                      </tr>
                    </thead>
                    <tbody>
                    {adminUsers.map(aU =>(
            <tr key={aU.id}>
            <td> {aU.name}</td>
            <td> {aU.phone}</td>
            <td onClick={()=>deleteUser(aU.id)}>Delete</td>
          </tr>
          ))}
                    </tbody>
                    </Table>
        </Col>
        </Row> 
        </div>
        </>
    )
}

export default Settings
