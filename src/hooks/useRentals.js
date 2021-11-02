import React from 'react'
import crud from '../service/crud'

function useRentals() {
    const[docs, setDocs] = React.useState([])

    React.useEffect(() => {     

      const unsub =  crud.getRentals().onSnapshot((snap)=>{        
        const contacts_ = [];              
        snap.docs.forEach(document => {
          const contact_ = {
            id: document.id,
            ...document.data()
          }
          contacts_.push(contact_)
        })
        setDocs(contacts_)
        
      })     
    }, [])

    return {docs}
}

export default useRentals
