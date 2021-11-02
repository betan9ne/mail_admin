import React from 'react'
import crud from '../service/crud'

const useDriver  =(id) => {

    const[docs, setDocs] = React.useState([])

    React.useEffect(() => {     

      const unsub =  crud.getDrivers().doc(id).onSnapshot((doc)=>{        
          setDocs(doc.data())
      })     
    }, [id])

    return {docs}
}

export default useDriver
