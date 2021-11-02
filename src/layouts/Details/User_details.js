import React, {useReducer, useState} from 'react'
import useGetCustShipments from '../../hooks/useGetCustShipments'
import { Link } from 'react-router-dom'
 
import crud from '../../service/crud'

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
   }

const User_details =props => {
    let s = props.location.state
    const[state, setState] = React.useState({right:false})
    const[status, setStatus] = React.useState()

    const [formData, setFormData] = useReducer(
        formReducer, 
        {
            name: s.name, 
            email:s.email,
            address:s.address,  
            country:s.country,
            city:s.city,
      });

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
        crud.updateCustumerDetails(s.id, data)
            .then((doc) => {
            console.log("Awesome, you are now on the map")
           // PostAlert("added a new customer",doc.id, "6n9oHoZuRy4BXoAfhSPM", "Added a User")
            })
            .catch((e) => {
            console.log(e);
            console.log("Oops, well this doesn't look good. Please try again") 
            });
    }  

   
    let ships = useGetCustShipments(s.id).docs
   
    return (
        <div className="contain">
             {/* <Drawer anchor={"right"} open={state["right"]}
           onClose={toggleDrawer("right", false)}>
               <div className="add_shipment">
               <form onSubmit={saveContact} >
                   <h5>Edit User</h5>
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
               <h4> User details</h4><br/><br/>
                <p>Full name</p>
    <h4>{s.name}</h4>
    <br/>
    <p>Phone</p>
    <h4>{s.phone}</h4>
    <br/>
    <p>City</p>
    <h4>{s.city}</h4>
    <br/>
    <p>Address</p>
    <h4>{s.address}</h4>
    <br/>
    <hr/>
    <br/>
    <button  onClick={toggleDrawer("right", true)}>Edit User Details</button>
    </div>
    <div style={{display:"grid",gap:"20px", height:"10px"}}>
    <div className="filters">    
    <div className="filter">
                <h4>All</h4>
            </div>      
    <div className="filter">
                <h4>Completed</h4>
            </div>
            <div className="filter">
                <h4>Cancelled</h4>
            </div>
            <div className="filter">
                <h4>Pending</h4>
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
    <div>
    <h4>Update User Status</h4><br/><br/>
                       <select className="input" value={status} onChange={e =>setStatus(e.target.value)}>
                           <option >Select status</option>                           
                           <option value="1">Active</option>
                           <option value="2">Blocked</option>
                           <option value="3">Disabled</option>
                       </select>
                       <br/><br/>
                   <button type="button" >Update</button>
                   <br/><br/>
        <h4>Reviews</h4>
    </div>
            </div>
        </div>
    )
}

export default User_details
