 
import React,{useState} from 'react'
 
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Table,
    Row,
    Col, Modal, ModalHeader, ModalBody, ModalFooter, Input,  Form, FormGroup  
  } from "reactstrap";
import useVehicles from 'hooks/useVehicles';
import Vehicle from 'components/Vehicle';
import crud from 'service/crud';

function Vehicles() {
    let vehicles  = useVehicles().docs
    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const [keyboard, setKeyboard] = useState(false);
    const[model, setModel] = useState()
    const[make, setmake] = useState()   
    const[car_class, setCarClass] = useState()
    const[msg, setMsg] = useState()
    const[price, setPrice] = useState()
    const toggle = () => setModal(!modal);

    const saveContact =(event) => {
      document.getElementById("myBtn").disabled = true;
      event.preventDefault()
      let data = {       
          model: model, 
          make:make,
          price:price,                
          car_class:car_class,
          createdAt:new Date(Date.now()).toString() 
      };  
      crud.getVehicles().add(data)
          .then((doc) => {
          console.log("Awesome, you are now on the map") 
          setMsg("Vehicle added successfully")   
          toggle()      
          })
          .catch((e) => {
              setMsg("Error adding vehicle, please try again.", e)
          console.log(e);
          console.log("Oops, well this doesn't look good. Please try again") 
          });
  } 

 
    return (
        <>
         <Modal isOpen={modal} toggle={toggle}  modalClassName="modal-search fade"  backdrop={backdrop} keyboard={keyboard}>
        <ModalHeader toggle={toggle}>Add Vehicle</ModalHeader>
        <ModalBody>
        <Form>
                  <Row>
                    
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Model</label>
                        <Input
                           placeholder="model" name="model"
                          type="text" required value={model} onChange={e =>setModel(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Make</label>
                        <Input name="make"
                            placeholder="make"
                          type="text" required value={make} onChange={e =>setmake(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Car Class</label>
                        <Input type="select" name="car_class" required value={car_class} onChange={e =>setCarClass(e.target.value)}>
                        <option value="">Select Type</option>
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
                        <Input placeholder="Price" name="price" type="number" required value={price} onChange={e =>setPrice(e.target.value)}/>
                      </FormGroup>
                    </Col>
                  </Row>                
                </Form>
        </ModalBody>
        <ModalFooter>
         <Button color="primary" id="myBtn" onClick={saveContact}>Add Vehicle</Button>
          
        </ModalFooter>
        </Modal>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <Button tag="h4" color="primary" onClick={toggle}>Add Vehicle</Button>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Make</th>
                          <th>Model</th>
                          <th>Price</th>
                          <th>Car Type</th>
                          <th></th>                           
                        </tr>
                      </thead>
                      <tbody>
                      {
                        vehicles.map(r=>(
                    <Vehicle  data={r} key={r.id}/>
                ))
            }</tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
               </Row>
          </div>
        </>
    )
}

export default Vehicles
