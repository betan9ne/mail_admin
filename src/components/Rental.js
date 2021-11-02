import React,{useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Row, Col, Form, FormGroup } from 'reactstrap';
import useUser from '../hooks/useUser'
import VIewCar from './bits/VIewCar';
import crud from 'service/crud';
 

const Rental = ({data}) => {
    let u = useUser(data.cust).docs

     const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const [keyboard, setKeyboard] = useState(false);
    const[cost, setCost]  = useState(data.cost)
    const[msg, setMsg] = useState()

    const toggle = () => setModal(!modal);
 
    function negotiate(){
        crud.getRentals().doc(data.id)
        .update({cost:parseInt(cost)})
        .then(()=>{
            setMsg("Offer of "+cost+" sent")
            sendMessage("Negotiated")
            toggle()
            console.log(cost)
        }).catch((e)=>{
            setMsg("Error sending offer, Please try again later")
            console.log(e)
        })
    }

    async function sendMessage(msg){
      try{
        let res =  await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'key=AAAAAuqqNU8:APA91bG_GuLw79jZsBI3bfDCLAPvQg7gmNeq-T9GWcn76omMUzvAiZb9GaWc3ErmzRnqvmNa5MN-0WPB4S1qZmnVXr49xQQ5oGcSgiboGT-mII40svS3JxzrH65EGr-6HMnLiwaknBqp',
            },
            body: JSON.stringify({
              to: u.token,
              priority: 'normal',             
              data: {
                experienceId: '@betan9ne/mail_app',
                title: "Rental Request "+msg,
                message: 'Your rental Request was ' + msg,
              },
            }),
          });        
          console.log(await res.json())
      }
      catch (error) {
            console.log("here",error)
      }
  
  }

    function accept(){
        crud.getRentals().doc(data.id)
        .update({status:"Accepted"})
        .then(()=>{
            setMsg("Thank you for accepting the offer")
            sendMessage("Accepted")
            toggle()
               console.log(cost)
        }).catch((e)=>{
            setMsg("Soory, we had a problem processing the offer.")
            console.log(e)
        })
    }

    return (<>
        <Modal isOpen={modal} toggle={toggle}  modalClassName="modal-search fade"  backdrop={backdrop} keyboard={keyboard}>
        <ModalHeader toggle={toggle}>Rental</ModalHeader>
        <ModalBody>
             <b>{u.name}</b> is requesting a {data.car === null ? <b>{data.other}</b> : <VIewCar data={data.car}/>} from <b>{data.from_date}</b> to <b>{data.to_date}</b>
<br/><br/>
             <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Set a price or Accept the offer</label><br/><br/>
                        <Input                        
                          placeholder="set price"
                          value={cost} onChange={e =>setCost(e.target.value)}
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    </Row>
                    </Form>
                    
         </ModalBody>
        <ModalFooter>
        {data.status === "Accepted" ?  <Button color="primary" onClick={toggle}>Cancel</Button> : 
        <><Button color="primary" onClick={negotiate}>Negotiate Price</Button>
            <Button color="secondary" onClick={accept}>Accept Offer</Button></>
        }
        
        </ModalFooter>
      </Modal>
                    <tr>
                          <td>{u.name}</td>
                          <td>{data.from_date}</td>
                          <td>{data.to_date}</td>
                          <td>
                          {data.car === null ? <b>{data.other}</b> : <VIewCar data={data.car}/>}
                          
                          </td>
                          <td>{data.status}</td>
                          <td className="text-center">{data.cost}</td>
                          <td onClick={()=>toggle()}>View</td>
                        </tr>
                        </>
    )
}

export default Rental
