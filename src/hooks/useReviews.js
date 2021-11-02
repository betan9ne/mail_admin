import React,{useEffect, useState} from 'react'
import crud from '../service/crud'

function useReviews() {
    const[docs, setDocs] = useState([])
      useEffect(() => {       
      const unsub =  crud.getReviews()
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

export default useReviews
