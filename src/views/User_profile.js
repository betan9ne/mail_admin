import Customer from 'components/Customer';
import useCustomers from 'hooks/useCustomers';
import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
function User_profile() {
    let customers = useCustomers().docs
    return (
        <>
        <div className="content">
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
                        <th>Email</th>
                        <th>Address</th>
                         <th></th>                           
                      </tr>
                    </thead>
                    <tbody>
                    {
                        customers.map(r=>(
                  <Customer data={r}/>
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

export default User_profile
