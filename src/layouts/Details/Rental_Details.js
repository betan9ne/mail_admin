import React,{useState, useEffect} from 'react'
import firebase from '../../firebase'
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
 
import Footer from "../../components/Footer/Footer.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FixedPlugin from "../../components/FixedPlugin/FixedPlugin.js";
import routes from "../../routes.js";
import logo from "../../assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

var ps;
const Rental_Details = props => {
    let s = props.location.state
  
 console.log(s)
    const[msg, setMsg] = useState("")
    
       
    const updateRental = (status) =>{
        let asd ={
            status : status
        }
        firebase.firestore().collection("rental").doc(s[0].id).update(asd).then((doc) =>{
            setMsg(status)      
            console.log(doc)
        }).catch((e)=>{
            console.log(e)
            setMsg("Error updating status.")
        }
        )
    }
 
    const location = useLocation();
    const mainPanelRef = React.useRef(null);
    const [sidebarOpened, setsidebarOpened] = React.useState(
      document.documentElement.className.indexOf("nav-open") !== -1
    );
    React.useEffect(() => {
      if (navigator.platform.indexOf("Win") > -1) {
        document.documentElement.className += " perfect-scrollbar-on";
        document.documentElement.classList.remove("perfect-scrollbar-off");
        ps = new PerfectScrollbar(mainPanelRef.current, {
          suppressScrollX: true,
        });
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      // Specify how to clean up after this effect:
      return function cleanup() {
        if (navigator.platform.indexOf("Win") > -1) {
          ps.destroy();
          document.documentElement.classList.add("perfect-scrollbar-off");
          document.documentElement.classList.remove("perfect-scrollbar-on");
        }
      };
    });
    React.useEffect(() => {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      if (mainPanelRef.current) {
        mainPanelRef.current.scrollTop = 0;
      }
    }, [location]);
    // this function opens and closes the sidebar on small devices
    const toggleSidebar = () => {
      document.documentElement.classList.toggle("nav-open");
      setsidebarOpened(!sidebarOpened);
    };
    const getRoutes = (routes) => {
      return routes.map((prop, key) => {
        if (prop.layout === "/admin") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else if(prop.layout === "/details") {
          return (
            <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
          )
        }
      });
    };
    const getBrandText = (path) => {
      for (let i = 0; i < routes.length; i++) {
        if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
          return routes[i].name;
        }
      }
      return "Brand";
    };

    return (
        <BackgroundColorContext.Consumer>
        {({ color, changeColor }) => (
          <React.Fragment>
            <div className="wrapper">
              <Sidebar
                routes={routes}
                logo={{
                 
                  text: "Impala Rental Dashboard",
                  imgSrc: logo,
                }}
                toggleSidebar={toggleSidebar}
              />
              <div className="main-panel" ref={mainPanelRef} data={color}>
                <AdminNavbar
                  brandText={getBrandText(location.pathname)}
                  toggleSidebar={toggleSidebar}
                  sidebarOpened={sidebarOpened}
                />
            <div className="content">
       
       <div className="three">
           <div >
               <h4>Client</h4>
               <br/>
              <h5><p>Name</p>{s[1].name}</h5><br/>
              <h5><p>Email</p>{s[1].email}</h5><br/>
               <h5><p>Phone</p>{s[1].phone}</h5><br/>
               <h5><p>Address</p>{s[1].address}</h5><br/>                 
               <h5><p>City</p>{s[1].city}</h5><br/>
           </div>
           <div >
               <h4>Vehicle</h4>
               <br/>
              <h5><p>Make</p>{s[2].make}</h5><br/>
              <h5><p>Model</p>{s[2].model}</h5><br/>
               <h5><p>Price</p>{s[2].price}</h5><br/>
               <h5><p>Car Class</p>{s[2].car_class}</h5><br/>
           </div>
           <div >
               <h4>Details</h4>
               <br/>
               <h5><p>Total</p>ZMW {s[0].total}</h5><br/>
              <h5><p>From</p>{s[0].from_date}</h5><br/>
              <h5><p>To</p>{s[0].to_date}</h5><br/>
                 <h5><p>Order Placed On</p>{new Date(s[0].createdAt).toLocaleDateString()}</h5><br/>
               <h5><p>Status</p>{s[0].status}</h5><br/>
               <hr/>
               <div style={{display:"flex",flex:1,gap:10, flexDirection:"row"}}>
               <button type="button"  onClick={()=>updateRental("Approved")}>Approve</button>                    
               <button type="button" onClick={()=>updateRental("Declined")}>Decline</button>
               <button type="button" onClick={()=>updateRental("Returned")}>Returned</button>
               </div>
               {msg}
           </div>
       </div>
   </div>
              </div>
            </div>
            <FixedPlugin bgColor={color} handleBgClick={changeColor} />
          </React.Fragment>
        )}
      </BackgroundColorContext.Consumer>
      
    )
}

export default Rental_Details
