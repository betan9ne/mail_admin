import React,{useState, useEffect} from 'react'
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup,
    Input,
    Label,
    Row,
    Col,
    Table,
  
  } from "reactstrap";
import useFeed from 'hooks/useFeed';
import Ride from 'components/Ride';
import useRentals from 'hooks/useRentals';
import RentalItem from './../components/Rental'
function Reports() {

    const feed = useFeed().docs
    const rental = useRentals().docs
   
    const[from_date, setFromdate] = useState(new Date())
    const[to_date, setToDate] = useState(new Date())
    const[tag, setTag] = useState("1")
    const[filtered, setFiltered] = useState([])
    const[Rentalfiltered, setRentalFiltered] = useState([])
    const[rideStats, setRideStats] = useState(0)

    let filter = []
    let rentalFilter = []
    
    function sortByDate(){
         tag === "1" ? feed.filter(function (a){
               if(new Date(a.createdAt).toLocaleDateString() >= new Date(from_date).toLocaleDateString()
               && new Date(a.createdAt).toLocaleDateString() <= new Date(to_date).toLocaleDateString())
               {
                filter.push(a)
               }
               setFiltered(filter)
               return
    }) : 
    rental.filter(function (a){
        if(new Date(a.createdAt).toLocaleDateString() >= new Date(from_date).toLocaleDateString()
        && new Date(a.createdAt).toLocaleDateString() <= new Date(to_date).toLocaleDateString())
        {
            rentalFilter.push(a)
        }
        setRentalFiltered(rentalFilter)
        return
        }) 
    }

    useEffect(()=>{
        filterRides()
    },[feed])

let completed = 0
let cancelled = 0
function filterRides(){
     feed.filter((val)=>{      
      if(val.status === 5)
      {
        completed = completed + 1   
         
      }
      else if (val.status === 2)
      {
          
        cancelled = cancelled + 1
      }    
    })
    let asd  = {
        completed: completed,
        cancelled: cancelled,
      
    }
    setRideStats(asd)    
  }
  console.log(rideStats)
     
    return (
        <div className="content">
             <Row>
          <Col lg="2">
            <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Total Number of Rides</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" />{feed.length} 
                </CardTitle>
              </CardHeader>             
            </Card>
            </Col>
            <Col lg="2">
            <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Total Revenue</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 
                </CardTitle>
              </CardHeader>             
            </Card>
            </Col>
            <Col lg="2">
            <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Total Cancelled Rides</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> {rideStats.cancelled}
                </CardTitle>
              </CardHeader>             
            </Card>
            </Col>
            <Col lg="2">
            <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Total Completed Rides</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> {rideStats.completed}
                </CardTitle>
              </CardHeader>             
            </Card>
            </Col>
            <Col lg="2">
            <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Total Commission</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 
                </CardTitle>
              </CardHeader>             
            </Card>
            </Col>
            </Row>

            <Row>
                <Col lg="8">
                <Card className="card-chart">
            <CardHeader>              
                <Row>
                <Col><Label>Stream</Label>
                <Input type="select" name="select"  value={tag} onChange={e =>setTag(e.target.value)} >
                    <option>Select stream</option>
                    <option value="1">Ride Service</option>
                    <option value="2">Rental Service</option>
                </Input>
                </Col>
                <Col><Label for="exampleDate">From date: {new Date(from_date).toLocaleDateString()}</Label>
            <Input type="date" name="date" id="exampleDate" placeholder="date placeholder"  value={from_date} onChange={e =>setFromdate(e.target.value)}/></Col>
            <Col><Label for="exampleDate">To date: {new Date(to_date).toLocaleDateString()}</Label>
                <Input type="date" name="date" id="exampleDate" placeholder="date placeholder"  value={to_date} onChange={e =>setToDate(e.target.value)}/></Col>
                <Col><Label>{tag=== "1" ? filtered.length : Rentalfiltered.length} results found</Label><br/><Button color="primary" onClick={sortByDate}>Search</Button></Col>
                </Row>
                <br/>
                </CardHeader>             
            </Card>
                </Col>
            </Row>
           
            {tag === "1" ? 
            <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                          <th>Client</th>
                        <th>Driver</th>
                        <th>Status</th>
                        <th>Cost</th>
                        <th>Distance</th>
                        <th>Created On</th>                       
                      </tr>
                    </thead>
                    <tbody>
                    {
                     filtered.map(r=>(
                  <Ride data={r} key={r.id}/>              
              ))
          }</tbody>
                  </Table>
             :
            
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
                        Rentalfiltered.map(r=>(
                    <RentalItem key={r.id} data={r}/>
                ))
            } </tbody>
                    </Table>
            }

        
        </div>
    )
}

export default Reports
