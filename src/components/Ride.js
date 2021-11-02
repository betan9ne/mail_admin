import React,{useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Row, Col, Form, FormGroup } from 'reactstrap';
import useDriver from '../hooks/useDriver'
import useUser from '../hooks/useUser'
import useRideReview from 'hooks/useRideReview';
 

const Ride =({data}) => {

  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState("static");
  const [keyboard, setKeyboard] = useState(false);
  const[cost, setCost]  = useState(data.cost)
  const[msg, setMsg] = useState()
  let review = useRideReview(data.id).docs
  const toggle = () => setModal(!modal);
    let u = useUser(data.cust).docs
      let driver = useDriver(data.driver).docs

      const tripStatus = () =>{
        switch (data.status) {
          case 0:
            return("Pending")
           case 1:
            return("Accepted")
             case 2:
              return("Declined")
               case 3:
                return("Cancelled")
             case 4:
              return("started")
            case 5:
              return("Completed")
            default:
            break;
        }
      }

     
    return ( 
      <>
        <Modal isOpen={modal} toggle={toggle}  modalClassName="modal-search fade"  backdrop={backdrop} keyboard={keyboard}>
        <ModalHeader toggle={toggle}>Ride Details</ModalHeader>
        <ModalBody>
        <h4 style={{color:"black"}}>Ride {tripStatus()}</h4>
             <Row>
             <Col className="pr-md-1" md="6">
             <b>Client</b><br/>
               {u.name}<br/>
               <b>Driver</b><br/>
               {driver.name}
             </Col>
             <Col className="pr-md-1" md="6">
             <b>Review</b><br/>
            {review.driver_rating}<br/>
            {review.feedback}<br/>
            <b>Pick up</b><br/>
            {data.pickup.name}<br/>
            <b>Drop Off</b><br/>
            {data.delivery.name}<br/>
            <b>Fare</b><br/>
            ZMW{data.cost}<br/>
            <b>Distance (Estimated)</b><br/>
            {data.distance}KM<br/>
            <b>Date/Time ordered</b><br/>
            {new Date(data.createdAt).toLocaleDateString()} at {new Date(data.createdAt).toLocaleTimeString()}
             </Col>
             </Row>                    
         </ModalBody>
        <ModalFooter>
         <Button color="secondary" onClick={toggle}>Cancel</Button> 
        </ModalFooter>
      </Modal>
              <tr>
                
            <td>{u && u.name}</td>
            <td>{driver && driver.name}</td>
            <td>{tripStatus()}</td>
             <td>ZMW<b>{data.cost}</b></td>
            <td>{data.distance}KM</td>
            <td>{new Date(data.createdAt).toLocaleDateString()}</td>
            <td onClick={toggle}>View</td>
    </tr>        
             
       </>        
    )
}

export default Ride
