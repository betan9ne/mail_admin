import React,{useState, useReducer} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Row, Col, Form, FormGroup } from 'reactstrap';
import crud from 'service/crud';

 
 
const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
   }
const Vehicle = ({data}) => {
    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const [keyboard, setKeyboard] = useState(false);
   
    const[msg, setMsg] = useState()
    
    const [formData, setFormData] = useReducer(
        formReducer, 
        {
            model: data.model, 
            make:data.make,
            car_class:data.car_class,  
            price:data.price,            
      });
    
      const handleChange = event => {
        setFormData({
        name: event.target.name,
        value: event.target.value,
      });
     
    }

    
    const saveContact =(event) => {
        document.getElementById("myBtn").disabled = true;
        event.preventDefault()
        let datas = {       
            model: formData.model,           
            make:formData.make,
            car_class:formData.car_class,  
            price:formData.price,            
            updatedAt:new Date(Date.now()).toString() 
        };  
        crud.updateVehiclesDetails(data.id, datas)
            .then((doc) => {
            console.log("Awesome, you are now on the map")
            toggle()
           // PostAlert("added a new customer",doc.id, "6n9oHoZuRy4BXoAfhSPM", "Added a User")
            })
            .catch((e) => {
            console.log(e);
            console.log("Oops, well this doesn't look good. Please try again") 
            });
    }  

    function deleteVehicle(){
        crud.getVehicles().doc(data.id).delete().then(()=>{
            console.log("Vehicle deleted successfully")
                toggle()
        }).catch((e)=>{
                console.log(e)
        })
    }
    
    const toggle = () => setModal(!modal);
 
    return (
        <>
         <Modal isOpen={modal} toggle={toggle}  modalClassName="modal-search fade"  backdrop={backdrop} keyboard={keyboard}>
        <ModalHeader toggle={toggle}>Update Vehicle Details</ModalHeader>
        <ModalBody>
        <Form>
                  <Row>
                    
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Model</label>
                        <Input
                           placeholder="Username" name="model"
                          type="text" value={formData.model} onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Make</label>
                        <Input name="make"
                            placeholder="City"
                          type="text" value={formData.make} onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Car Class</label>
                        <Input type="select" name="car_class" value={formData.car_class} onChange={handleChange}>
                             <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Executive Sedan">Executive Sedan</option>
                            <option value="Double Cab">Double Cab</option>
                            <option value="Bus">Bus</option>
                        </Input>       
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Price</label>
                        <Input placeholder="Price" name="price" type="text" value={formData.price} onChange={handleChange}/>
                      </FormGroup>
                    </Col>
                  </Row>                
                </Form>
         </ModalBody>
        <ModalFooter>
         <Button color="primary" id="myBtn" onClick={saveContact}>Update</Button>
         <Button color="danger" onClick={deleteVehicle}>Delete</Button>
         
        </ModalFooter>
      </Modal>
        <tr>
            <td>{data.make}</td>
            <td>{data.model}</td>
            <td> {data.price}</td>
            <td>{data.car_class}</td>
            <td onClick={()=>toggle()}>View</td>
        </tr>
 </>
    )
}

export default Vehicle
