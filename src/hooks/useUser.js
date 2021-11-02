import React from 'react'
import crud from '../service/crud'

const useUser =(id) => {
   
    const[docs, setDocs] = React.useState([])

    React.useEffect(() => { 
      const unsub =  crud.getCustomers().doc(id).get().then((doc)=>{        
          setDocs(doc.data())
      })     
    }, [])

    return {docs}
}

export default useUser
