import React,{useEffect, useReducer, useState} from 'react'
import firebase from '../../firebase'
 
import crud from '../../service/crud'

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
   }

const Vehicle_details = props => {
    let s = props.location.state 
    const [rentals, setrentals] = useState([])
    const[state, setState] = React.useState({right:false})
    let sdf = []

    const [formData, setFormData] = useReducer(
        formReducer, 
        {
            model: s.model, 
            make:s.make,
            car_class:s.car_class,  
            price:s.price,
            
      });
    
      const handleChange = event => {
        setFormData({
        name: event.target.name,
        value: event.target.value,
      });
     
    }

    const saveContact =(event) => {
        document.getElementById("myBtn").disabled = true;
        event.preventDefault()
        let data = {       
            model: formData.model,           
            make:formData.make,
            car_class:formData.car_class,  
            price:formData.price,            
            updatedAt:new Date(Date.now()).toString() 
        };  
        crud.updateVehiclesDetails(s.id, data)
            .then((doc) => {
            console.log("Awesome, you are now on the map")
           // PostAlert("added a new customer",doc.id, "6n9oHoZuRy4BXoAfhSPM", "Added a User")
            })
            .catch((e) => {
            console.log(e);
            console.log("Oops, well this doesn't look good. Please try again") 
            });
    }  

    useEffect(()=>{
        firebase
        .firestore()
        .collection("rental")
        .where("car","==",s.id)
        .get()
        .then((snap)=>{
            snap.docs.forEach(d=>{
                let asd ={
                    id: d.id,
                    ...d.data()
                }
                sdf.push(asd)
            })
            setrentals(sdf)
        })
    },[s.id])
    
    const toggleDrawer = (anchor, open)  => () => {           
        setState({ ...state, [anchor]: open });  
      };

    return (

        <div className="contain">
              {/* <Drawer anchor={"right"} open={state["right"]}
           onClose={toggleDrawer("right", false)}>
               <div className="add_shipment">
               <form onSubmit={saveContact} >
                   <h5>Update Driver details</h5>
                   <br/>                    
                   <p>Model</p>                   
                   <input type="text" name="model" required value={formData.model} onChange={handleChange}  placeholder=""/>
                   <br/><br/>      
                   <p>Make</p>                   
                   <input type="text" name="make" required value={formData.make} onChange={handleChange} placeholder=""/>
                   <br/><br/>       
                        <p>Car Class</p>         
                   <select className="input" name="car_class" required value={formData.car_class} onChange={handleChange} >
                   <option value="">Select Type</option>
                       <option value="Sedan">Sedan</option>
                       <option value="SUV">SUV</option>
                       <option value="Executive Sedan">Executive Sedan</option>
                       <option value="Double Cab">Double Cab</option>
                       <option value="Bus">Bus</option>
                       </select> 
                  <br/><br/>  
                   <p>Price</p>           
                   <input type="number" name="price" required value={formData.price} onChange={handleChange}  />
                   <br/><br/>
                         <button id="myBtn" type="submit">Save</button>                 
                   </form>
               </div>
           </Drawer> */}
            <div className="three">
                <div>
                    <h4>Vehicle Details</h4>
                    <br/>
                    <p>Make</p>
                        <h4>{s.make}</h4>
                    <p>Model</p>
                    <h4>{s.model}</h4>                   
                    <p>Car group</p>
                    <h4>{s.car_class}</h4>
                    <p>Price</p>
                    <h4>{s.price}</h4>  
                    <hr/>
                    <button type="button" onClick={toggleDrawer("right", true)} >Edit Vehicle</button>                  
                </div>
                <div>
                    <h4>Past Requests</h4>
                    <br/>                   
                        {
                            rentals.map(r=>(
                                <div className="shipment_item" style={{marginBottom:"10px"}} key={r.id}>
                                    <p>From</p>
                                   <h4> {r.from_date}</h4>
                                   <p>To</p>
                                   <h4> {r.to_date}</h4>                                   
                                   <p>Status</p>
                                   <h4> {r.status}</h4>
                                   <p>Created on</p>
                                   <h4> {new Date(r.createdAt).toLocaleDateString()}</h4>
                                   <hr/>
                                   
                                </div>
                            ))
                        }                   
                   
                </div>
                <div>
                    <h4>Analytics</h4>
                    <br/>
                    <p>Total requests</p>
                    <h4>{rentals.length}</h4>
                </div>
            </div>
        </div>
    )
}

export default Vehicle_details
