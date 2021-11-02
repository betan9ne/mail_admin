import React,{useState, useEffect} from 'react'
import { Button, Modal, ModalHeader, ModalBody, Card,
  CardHeader,
  CardBody,CardText,
  CardTitle, ModalFooter, Table, Label, Row, Col, Form, FormGroup } from 'reactstrap';
import useUserRides from 'hooks/useUserRides';
import Ride from './Ride';

const Customer =({data}) => {
   
  let rides = useUserRides(data.id).docs

  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState("static");
  const [keyboard, setKeyboard] = useState(false);
  const[cost, setCost]  = useState(data.cost)
  const[msg, setMsg] = useState()
  const[tripsStatus, setTripsStats] = useState()
  const toggle = () => setModal(!modal);

  useEffect(() => {
    rides && filterTaxis()
}, [rides])

  let completed = 0
  let cancelled=  0
  let declined= 0
  function filterTaxis(){
      rides && rides.filter((val)=>{
        console.log(val.status)
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


    return (
      <>
        <Modal isOpen={modal} toggle={toggle}  modalClassName="modal-search fade"  backdrop={backdrop} keyboard={keyboard}>
        <ModalHeader toggle={toggle}>{data.name}'s Profile -   Rides ({rides.length})</ModalHeader>
        <ModalBody>
         <Card>
                <CardHeader>
                  <CardTitle tag="h3">Trips</CardTitle>
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
              <td>{data.email}</td>
              <td>{data.address}</td>
              <td onClick={toggle}>View</td>
          </tr>  
          </>
       )
}

export default Customer
