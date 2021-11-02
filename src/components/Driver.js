import React,{useState, useEffect} from 'react'
import { Button, Modal, ModalHeader, ModalBody, Card,
    CardHeader,
    CardBody,
    CardTitle, ModalFooter, Input, Table, Label, Row, Col, Form, FormGroup, CardText } from 'reactstrap';
import crud from 'service/crud';
import useGetDriverShipments from 'hooks/useGetDriverShipments';
import Ride from './Ride';
import useGetDriverReviews from 'hooks/useGetDriverReviews';

const Driver = ({data}) => {

    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const [keyboard, setKeyboard] = useState(false);
    const[wallet, setWallet] = useState(data.wallet)
    const[status, setStatus] = useState(data.status)
    const[tripsStatus, setTripsStats] = useState()
    const[msg, setMsg] = useState()
  const[docs, setDocs] = useState()
    let reviews = useGetDriverReviews(data.id).docs
    let rides = useGetDriverShipments(data.id).docs

useEffect(() => {
    rides && filterTaxis()
}, [rides])

let overallR = 0
reviews.forEach(e=>{
  overallR = overallR + e.driver_rating    
})

useEffect(()=>{
  crud.getDrivers().doc(data.id).collection("documents").get().then((doc)=>{
    const contacts_ = [];
    doc.docs.forEach(document => {
      const contact_ = {
        id: document.id,
        ...document.data()
      }
      contacts_.push(contact_)
    })
    setDocs(contacts_)
  })
},[])

console.log(docs)
    const toggle = () => setModal(!modal);
    let completed = 0
    let cancelled=  0
    let declined= 0
    function filterTaxis(){
        rides && rides.filter((val)=>{
          if(rides && val.status === 5)
          {
            completed = completed + 1        
          }
          else if (rides && val.status === 3)
          {
            cancelled = cancelled + 1
          }
          else if (rides && val.status === 2){
            declined = declined + 1
          }
        })
        let asd  = {
            completed: completed,
            cancelled: cancelled,
            declined:declined
        }
        setTripsStats(asd)
        
      }
    
    function Wallet(){
       crud.getDrivers().doc(data.id)
        .update({wallet:parseInt(wallet)})
        .then(()=>{
            setMsg("wallet value set to " + wallet)
            toggle()
            console.log(wallet)
        }).catch((e)=>{
            setMsg("Error sending offer, Please try again later")
            console.log(e)
        })
    }

    function Status(){
        crud.getDrivers().doc(data.id)
         .update({status:status})
         .then(()=>{
             setMsg("status changed to " + status)
             toggle()
             console.log(status)
         }).catch((e)=>{
             setMsg("Error sending offer, Please try again later")
             console.log(e)
         })
     }

    return (
        <>
        <Modal isOpen={modal} toggle={toggle}  modalClassName="modal-search fade"  backdrop={backdrop} keyboard={keyboard}>
       
        <ModalBody> 
        <b>{data.name}</b> <br/> Current balace is ZMW<b>{Math.round(data.wallet)}</b> and status is <b>{data.status}</b> and has made <b>{rides.length}</b> trips, rating of <b>{parseInt(overallR/reviews.length)}</b>
        <br/><br/>
        <Row>
            <Col  className="pr-md-1" md="4">
            <Form>
                  <Row>
                    <Col>
                    <label>Set Account Status</label><br/> 
                       <FormGroup>
                       <Input type="select" name="select"  value={status} onChange={e =>setStatus(e.target.value)} id="exampleSelect">
                       <option >Select driver status</option>
          <option value="Online">Online</option>
          <option value="Inactive">Inactive</option>
          </Input>              <Button color="primary" onClick={Status}>Set Status</Button>  
                      </FormGroup>
                     
                    </Col>
                    </Row>
                    </Form> 
            </Col>
            <Col  className="pr-md-1" md="4">
            <Form>
                  <Row>
                    <Col>
                    <label>Set Wallet</label><br/> 
                       <FormGroup>
                          <Input
                        
                        placeholder="set price"
                        value={Math.round(wallet)} onChange={e =>setWallet(e.target.value)}
                        type="number"
                      />                     
                      </FormGroup>
                      <Button color="primary" onClick={Wallet}>Set Wallet</Button>  
                    </Col>
                    </Row>
                    </Form> 
            </Col>
            <Col  className="pr-md-1" md="4">
            <label>Documemts</label><br/> 
            {docs === undefined ? "No documents uploaded" : docs.map((d, diX)=>(
              <label key={diX}>{d.id}</label>
            ))}
            </Col>
        </Row>             
       <br/>
       <Card>
                <CardHeader>
                  <CardTitle tag="h5">Driver trips</CardTitle>
                  <Row>
                      <Col><CardText tag="h5">Completed : <b>{tripsStatus && tripsStatus.completed}</b></CardText></Col>
                      <Col><CardText tag="h5">Declined : <b>{tripsStatus && tripsStatus.declined}</b></CardText></Col>
                      <Col><CardText tag="h5">Cancelled : <b>{tripsStatus && tripsStatus.cancelled}</b></CardText></Col>
                  </Row>
                  
                </CardHeader>
                <CardBody>
        <Table className="tablesorter" >
                    <thead className="text-secondary">
                      <tr>
                          <th>Client</th>
                        <th>Driver</th>
                        <th>Status</th>
                        <th>Cost</th>
                        <th>Distance</th>
                        <th>Created On</th>
                         <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        rides.map(r=>(
                  <Ride data={r} key={r.id}/>
              ))
          }</tbody>
                  </Table>
                  </CardBody>
                  </Card>
       
        </ModalBody>


        <ModalFooter>
      
                   
            <Button color="secondary" onClick={toggle}>Close</Button>        
        
        </ModalFooter>
      </Modal>
        <tr>
            <td>{data.name}</td>
            <td>{data.phone}</td>
            <td>{data.address}</td>
            <td>{data.status}</td>
            <td>{Math.round(data.wallet)}</td>
            <td onClick={()=>toggle()}>View</td>
        </tr>
       </>
    )
}

export default Driver
