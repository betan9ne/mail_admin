import useRentals from 'hooks/useRentals';
import React, {useState} from 'react'
import RentalItem from './../components/Rental'
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table, Input, Label,
    Row,
    Col, Button
  } from "reactstrap";
function Rental() {

    let rentals = useRentals().docs
    const[tag, setTag] = useState("Pending")
  const[filtered, setfiltered] = useState(rentals)

     function sortByDate(){
       let f = []
        rentals.filter((r)=>{
          if(r.status.toLowerCase() === tag.toLowerCase()) f.push(r)
        })
        setfiltered(f)
        console.log(f)
    }
   return (
        <>
          <div className="content">
          <Row>
                <Col lg="6">
                <Card className="card-chart">
            <CardHeader>              
                <Row>
                <Col xs="9"><Label>Stream</Label>
                <Input type="select" name="select"  value={tag} onChange={e =>setTag(e.target.value)} >
                    <option>Select option</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
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
                          <th>Client Name</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Car</th>
                          <th>Status</th>
                          <th className="text-center">Cost</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                     filtered && filtered.map(r=>(
                    <RentalItem key={r.id} data={r}/>
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
      );
    }

export default Rental
