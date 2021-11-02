 
import Ride from 'components/Ride';
import useFeed from 'hooks/useFeed';
import React,{useState, useEffect} from 'react'
 
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
function Rides() {
    const feed = useFeed().docs

    let cost = 0
    feed.forEach(element => {
      cost = cost + element.cost
    })


    return (
        <>
        <div className="content">
        <Card>
                <CardHeader>
                <Row>
                  <Col className="pr-md-1" md="5"> <CardTitle tag="h4">Total Trips : <b>{feed.length}</b></CardTitle></Col>
                  <Col className="pr-md-1" md="5"> <CardTitle tag="h4">Lifetime Spent : ZMW<b>{cost}</b></CardTitle></Col>
                </Row>
                 
                </CardHeader>
                 
                </Card>
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
                        feed.map(r=>(
                  <Ride data={r} key={r.id}/>
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

export default Rides
