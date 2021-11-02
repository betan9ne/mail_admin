import React,{useEffect, useState} from 'react'
import crud from '../service/crud'

function useDrivers() {
    const[docs, setDocs] = useState([])
    let d_ = []
    useEffect(() => {       
      const unsub =  crud.getDrivers()
            .onSnapshot((snap) =>{
              const contacts_ = [];
              snap.docs.forEach(document => {
                const contact_ = {
                  id: document.id,
                  ...document.data()
                }
                contacts_.push(contact_)
              })
              setDocs(contacts_)
                    return () => unsub() 
                 })        
    }, [])
 
    return {docs}
}

export default useDrivers
