import React from 'react'
import useVehicle from 'hooks/useVehicle'

const VIewCar = ({data})=> {
    let v = useVehicle(data).docs
    return (
        <>
           <b>{v.make} {v.model}</b>
        </>
    )
}

export default VIewCar
