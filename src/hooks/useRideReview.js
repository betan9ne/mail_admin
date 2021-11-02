import React from 'react'
import crud from '../service/crud'

const useRideReview =(id) => {
   
    const[docs, setDocs] = React.useState([])

    React.useEffect(() => { 
      const unsub =  crud.getReviews().where("ride_id", "==", id).get().then((doc)=>{        
        doc.docs.forEach(doc => {
          const contact_ = {
            id: doc.id,
            ...doc.data()
          }
          setDocs(contact_)
        })
      })     
    }, [])

    return {docs}
}

export default useRideReview
