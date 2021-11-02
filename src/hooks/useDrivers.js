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

              d_ = contacts_.sort(function (a, b){
                var nameA = new Date(a.createdAt).toLocaleString();
                var nameB = new Date(b.createdAt).toLocaleString();
                if(nameA > nameB){
                  return -1
                }
                if(nameA < nameB){
                return 1
              }
              return 0
              }); 
      
              setDocs(d_)
                    return () => unsub() 
                 })        
    }, [])
 
    return {docs}
}

export default useDrivers
