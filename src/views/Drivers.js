import Driver from 'components/Driver';
import useDrivers from 'hooks/useDrivers';
import React,{useState} from 'react'
import {
  Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table, Input, Label,
    Row,
    Col, Button
  } from "reactstrap";
function Drivers() {
    let drivers = useDrivers().docs
    const[tag, setTag] = useState("Online")
    const[filtered, setfiltered] = useState(drivers)
  
       function sortByDate(){
         let f = []
         drivers.filter((r)=>{
            if(r.status.toLowerCase() === tag.toLowerCase()) f.push(r)
          })
          setfiltered(f)
          console.log(f)
      }
    return (
        <>
        <div className="content">
        <Row>
                <Col lg="9">
                <Card className="card-chart">
            <CardHeader>              
                <Row>
                <Col xs="9"><Label>Stream</Label>
                <Input type="select" name="select"  value={tag} onChange={e =>setTag(e.target.value)} >
                    <option>Select option</option>
                    <option value="Online">Online</option>
                    <option value="Active">Active</option>
                    <option value="Offline">Offline</option>
                    <option value="Inactive">Inactive</option>
                </Input>
                </Col>
                 <Col xs="3"><br/><Button color="primary" onClick={sortByDate}>Search</Button></Col>
                </Row>
                <br/>
                </CardHeader>             
            </Card>
                </Col>
            </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4"></CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>City</th>
                        <th></th>                           
                      </tr>
                    </thead>
                    <tbody>
                    {
                      filtered && filtered.map(r=>(
                  <Driver data={r} key={r.id}/>
              ))
          }       
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
             </Row>
        </div>
      </>
    )
}

export default Drivers
