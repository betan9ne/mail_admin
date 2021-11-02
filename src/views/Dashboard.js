import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,

  Row,
  Col,

} from "reactstrap";

 
import useCustomers from "hooks/useCustomers";
import useFeed from "hooks/useFeed";
import useDrivers from "hooks/useDrivers";
import useReviews from "hooks/useReviews";
import useRentals from "hooks/useRentals";
import {onMessageListener } from '../firebase';

function Dashboard(props) {

  const [bigChartData, setbigChartData] = React.useState("data1");
  const[taxiStats, setTaxiStats] = useState()
  const[chart, setChartData] = useState()
  const[userChart, setUserChartData] = useState()
  const [notification, setNotification] = useState({title: '', body: ''});

  let users = useCustomers().docs
  let rides = useFeed().docs
  let drivers = useDrivers().docs
  let reviews = useReviews().docs
  let rentals = useRentals().docs

  var month=new Array();
    month[0]="January";
    month[1]="February";
    month[2]="March";
    month[3]="April";
    month[4]="May";
    month[5]="June";
    month[6]="July";
    month[7]="August";
    month[8]="September";
    month[9]="October";
    month[10]="November";
    month[11]="December";

  let chart1_2_options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 15,
            padding: 20,
            fontColor: "#9a9a9a",
          },
        },
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a",
          },
        },
      ],
    },
  };
  
  let delabel = [ chart && chart.map(c =>(
    month[c.l]
  ))]

  let dedata = [ chart && chart.map(c =>(
    c._rides.length
  ))]

  let userlabel = [ userChart && userChart.map(c =>(
    month[c.l]
  ))]

  let userData = [ userChart && userChart.map(c =>(
    c._rides.length
  ))]
  
 
  let chartExample2 = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");
  
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
  
      return {
        labels: delabel[0],
        datasets: [
          {
            label: "Trips",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: dedata[0],
          },
        ],
      };
    },
    options: chart1_2_options,
  };

  let userChatData = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");
  
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
  
      return {
        labels: userlabel[0],
        datasets: [
          {
            label: "Trips",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: userData[0],
          },
        ],
      };
    },
    options: chart1_2_options,
  };
   
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  let cost = 0
  let distance = 0
  rides.forEach(element => {
    cost = cost + element.cost
    distance = distance + element.distance
  })
  let overallR = 0
  reviews.forEach(e=>{
    overallR = overallR + e.driver_rating    
  })

  let online = 0
  let inactive = 0
  let offline = 0

  useEffect(() => {
     
      filterTaxis()
      groupBy("createdAt")
      groupUsers()
  }, [drivers])

  function filterTaxis(){
    drivers && drivers.filter((val)=>{
      
      if(drivers && val.status.toLowerCase().includes("online"))
      {
         online = online + 1        
      }
      else if (drivers && val.status.toLowerCase().includes("offline"))
      {
         offline = offline + 1
      }
      else if (drivers && val.status.toLowerCase().includes("inactive")){
         inactive = inactive + 1
      }
    })
    let asd  = {
      online: online,
      offline: offline,
      inactive:inactive
    }
    setTaxiStats(asd)    
  }
  
const groupBy = ()=>{
  let result  
  //toLocaleString('en-us', {month:'short'})
  let abc =  rides.reduce((r, e) =>{
    let l = e === undefined ? new Date(e.createdAt).getMonth() : new Date(e.createdAt).getMonth()
    if(!r[l])r[l] = {l, _rides:[e]}
    else r[l]._rides.push(e)
    return r
  }, {}) 
   result = Object.values(abc)
   setChartData(result) 
}

const groupUsers = ()=>{
  let result  
  //toLocaleString('en-us', {month:'short'})
  let abc =  users.reduce((r, e) =>{
    let l = e === undefined ? new Date(e.createdAt).getMonth() : new Date(e.createdAt).getMonth()
    if(!r[l])r[l] = {l, _rides:[e]}
    else r[l]._rides.push(e)
    return r
  }, {}) 
   result = Object.values(abc)
   setUserChartData(result) 
}
 
 //const vkey = "BO0QwT50YzcRfqPWwuXqSUXl-0fsLGYmdkKZLObVgBBRt72irj93ykxVsDztEiihdsDegCzy5RgGdU582eUumsk"
 
onMessageListener().then(payload => {
  //setShow(true);
  setNotification({title: payload.notification.title, body: payload.notification.body})
  console.log(payload);
}).catch(err => console.log('failed: ', err));


  return (
    <>
      <div className="content">
      <Row>
          <Col lg="2">
            <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Total Distance</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> {distance}KM
                </CardTitle>
              </CardHeader>
             
            </Card>
            </Col>
            <Col lg="2">
            <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Total Trips</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> {rides.length}
                </CardTitle>
              </CardHeader>
            </Card>
            </Col>
            <Col lg="2">
            <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Total Rentals</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> {rentals.length}
                </CardTitle>
              </CardHeader>
            </Card>
            </Col>
            <Col lg="3">
            <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Total Users</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> {users.length}
                </CardTitle>
              </CardHeader>
            </Card>
            </Col>
            <Col lg="3">
            <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Revenue Generated(Estimated)</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> ZMW{cost}
                </CardTitle>
              </CardHeader>
            </Card>
            </Col>
            </Row>

        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Monthly Trips</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                  </Row>
              </CardHeader>
              <CardBody>
              <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="8">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Monthly User Additions</h5>
                    <CardTitle tag="h3">Month on Month</CardTitle>
                  </Col>
                  </Row>
              </CardHeader>
              <CardBody>
              <div className="chart-area">
                  <Line
                    data={userChatData.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        
          <Col lg="4">
          <Row>
          <Col xs="6"> <Card className="card-chart"> 
              <CardBody  style={{padding:"20px"}}>
              <h6>Average Driver Rating</h6><br/>
              <h1>{parseInt(overallR/reviews.length)}</h1>
                </CardBody>
            </Card></Col>
            <Col xs="6"> <Card className="card-chart"> 
              <CardBody  style={{padding:"20px"}}>
              <h6>Total Number of Reviews</h6><br/>
              <h1>{reviews.length}</h1>
                </CardBody>
            </Card></Col>
            </Row>
            <Card className="card-chart">               
              <CardBody style={{padding:"20px"}}>
              <Row>
                <Col><h6>Total Taxis</h6><br/>
                <h1>{drivers.length}</h1></Col>
                <Col><h6>Online Taxis</h6><br/><h1>{taxiStats &&  taxiStats.online}</h1></Col>
               
                <Col><h6>Offline Taxis</h6><br/><h1>{taxiStats && taxiStats.offline}</h1></Col>
                <Col><h6>Inactive Taxis</h6><br/><h1>{taxiStats && taxiStats.inactive}</h1></Col>
              </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
       </div>
    </>
  );
}

export default Dashboard;

