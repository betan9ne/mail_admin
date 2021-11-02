import React,{useState, useEffect} from 'react'
import crud from '../../service/crud'
import useDrivers from '../../hooks/useDrivers'
import useDriver from '../../hooks/useDriver'
import useUser from '../../hooks/useUser'
import firebase from '../../firebase'

const Shipment_Details = props => {
    let s = props.location.state  
    let u = useUser(s.cust).docs
 console.log(s)
  console.log(u)

    return (
        <div className="contain"> 
        <h2>Hello</h2>
        </div>
    )
}

export default Shipment_Details
