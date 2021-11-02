import React, {useReducer, useEffect, useState} from 'react'
import useGetDriverShipments from '../../hooks/useGetDriverShipments'
 
import {Link} from 'react-router-dom'
import crud from '../../service/crud'
 
import useDriver from '../../hooks/useDriver'
import firebase from '../../firebase'

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
   }

const Driver_details = props => {
    let s = props.location.state
    const[state, setState] = React.useState({right:false})
    const [balance, setBalance] = useState()
    let ships = useGetDriverShipments(s.id).docs
    const[docs, setDocs] = useState()
    const[msg, setMsg] = useState()
  const[v, setVehicle] = useState()
  let driver = useDriver(s.id).docs
  console.log(s)
  const [formData, setFormData] = useReducer(
    formReducer, 
    {
        name: s.name, 
        email:s.email,
        address:s.address,  
        country:s.country,
        city:s.city,
  });
 
  useEffect(()=>{
    getDocuments()
  },[])

const getDocuments = () =>{
    firebase.firestore().collection("drivers").doc(s.id).collection("documents").get().then((doc)=>{
        const contacts_ = [];              
        doc.docs.forEach(document => {
          const contact_ = {
            id: document.id,
            ...document.data()
          }
          contacts_.push(contact_)
        })
        setDocs(contacts_)
        
    })
}

  const handleChange = event => {
    setFormData({
    name: event.target.name,
    value: event.target.value,
  });
 
}

const toggleDrawer = (anchor, open)  => () => {           
    setState({ ...state, [anchor]: open });  
  };

const saveContact =(event) => {
    document.getElementById("myBtn").disabled = true;
    event.preventDefault()
    let data = {       
        name: formData.name,           
        email:formData.email,
        address:formData.address,  
        country:formData.country,
        city:formData.city,                    
        updatedAt:new Date(Date.now()).toString() 
    };  
    crud.updateDriverDetails(s.id, data)
        .then((doc) => {
        console.log("Awesome, you are now on the map")
       // PostAlert("added a new customer",doc.id, "6n9oHoZuRy4BXoAfhSPM", "Added a User")
        })
        .catch((e) => {
        console.log(e);
        console.log("Oops, well this doesn't look good. Please try again") 
        });
}  


    const assignDriverToVehicle =()=>{
        let data_ = {  
            vehicle_assigned:v,
            updatedAt:new Date(Date.now()).toString() 
        };  
        crud.getShipments().doc(s.id).update(data_)
            .then(() => {
            console.log("Awesome, you are now on the map")     
            PostAlert("shipment status updated", s.id, "6n9oHoZuRy4BXoAfhSPM","Updated Shipment Status")       
            })
            .catch((e) => {
            console.log(e);
            });
    }

    const updateDriverBalance =() =>{
        if(balance === null || balance === "")
        {
            alert("Enter a value to proceed")
        }
        else{
            let bbalance = 0
            driver.balance === NaN ? bbalance = 0 : bbalance = driver.balance
            let data_ = {  
                balance:parseInt(bbalance) + parseInt(balance),
                updatedBalanceAt:new Date(Date.now()).toString() 
            };  
            crud.getDrivers().doc(s.id).update(data_)
                .then(() => {
                    setMsg("Driver balance updated")
                    setBalance("")               
                })
                .catch((e) => {
                    setMsg("Error, we could not update balance at this time, try again later.")
                console.log(e);
                });
        }
       
    }

    const PostAlert = (alert, item_id, user_id, type ) => {          
        let data ={
            msg:alert,
            item_id, item_id,
            user_id: user_id,
            createdAt:new Date(Date.now()).toString(),
            type:type,
            read: false 
        }    
        crud.getAlerts().add(data)
        .then(() => {
        console.log("Awesome, you are now on the map")
        
         })
        .catch((e) => {
        console.log(e);
          });   
            }

    return (
        <div className="contain">
             {/* <Drawer anchor={"right"} open={state["right"]}
           onClose={toggleDrawer("right", false)}>
               <div className="add_shipment">
               <form onSubmit={saveContact} >
                   <h5>Update Driver details</h5>
                   <br/>                   
                   <p>Full Name</p>                   
                   <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder=""/>                 
                   <br/><br/>                   
                   <p>Email Address</p>                   
                   <input type="text" name="email" required value={formData.email} onChange={handleChange} placeholder=""/>
                   <br/><br/> 
                   <p>Address</p>                   
                   <input type="text" name="address" required value={formData.address} onChange={handleChange} placeholder=""/>
                   <br/><br/>
                   <p>Country</p>                   
                   <input type="text" required name="country" value={formData.country} onChange={handleChange} placeholder=""/>
                   <br/><br/>
                   <p>City</p>                   
                   <input type="text" required name="city" value={formData.city} onChange={handleChange} placeholder=""/>
                   <br/><br/> 
                   <button id="myBtn" type="submit">Save</button>
                   </form>
               </div>
           </Drawer> */}
            <div className="three">
                <div>
               <h4>Driver Details</h4><br/><br/>
                <p>Driver name</p>
    <h4>{s.name}</h4>
    <br/>
    <p>Phone</p>
    <h4>{s.phone}</h4>
   
    <hr/><br/>
    <h4>Statement</h4><br/>
    <h4>{ships.length}</h4>
        <p>Total number of Rides</p>
        <br/>
        <h4>{ships.length}</h4>
        <p>Cancelled Rides</p>
        <br/>
        <h4>{ships.length}</h4>
        <p>Completed Rides</p>
        <br/>
        <h4>{ships.length}</h4>
        <p>Revenue</p><br/><br/>
        <hr/><br/>
        <button type="button" onClick={toggleDrawer("right", true)} >Edit Profile</button>

    </div>

    <div style={{display:"grid",gap:"20px", height:"50px"}}>
    <div className="filters">          
    <div className="filter">
                <h4>Completed</h4>
            </div>            
            <div className="filter">
                <h4>Cancelled</h4>
            </div>           
            </div>
    {ships.map(s=>(           
            <Link to={{
                pathname:"/s/"+s.id,
                state:s
            }}>
                {/* <Shipment data={s}/> */}
            </Link>

        ))}
    </div>

    <section>
                       <h4>Update Driver Status</h4><br/>
                       <select className="input" value={v} onChange={e =>setVehicle(e.target.value)}>
                           <option >Select status</option>                           
                           <option value="In transit">Approved</option>
                           <option value="Driver Assigned">Blocked</option>
                       </select>
                       <br/><br/>
                   <button type="button" onClick={assignDriverToVehicle}>Update</button>        
                   <br/><br/>
                   <hr/><br/>
                   <h4>Update Credit Status</h4><br/>
                   <h5>Current Balance : {driver.balance}</h5>
                   <input className="imput" value={balance} onChange={e=>setBalance(e.target.value)} type="number" />
                   <br/><br/>
                   {msg}
                   <br/><br/>
                   <button type="button" onClick={updateDriverBalance}>Update Balance</button> 
                   <br/><br/>
                   <h4>Documents</h4><br/>
                   {docs && docs.map(doc=>(
                       <h4 key={doc.id}><a href={doc.file}>Document {doc.type}</a></h4>
                   ))}
                   <br/><br/>
                   <h4>Reviews</h4>
                   <p>No reviews found</p>
                   </section>

            </div>
        </div>
    )
}

export default Driver_details
