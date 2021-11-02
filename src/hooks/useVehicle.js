import React from 'react'
import crud from '../service/crud'

const useVehicle =(id) => {
   
    const[docs, setDocs] = React.useState([])

    React.useEffect(() => { 
      const unsub =  crud.getVehicles().doc(id).get().then((snap)=>{ 
         let ad = {
          id: id,
          ...snap.data()
        }

          setDocs(ad)
      })     
    }, [id])

    return {docs}
}

export default useVehicle
