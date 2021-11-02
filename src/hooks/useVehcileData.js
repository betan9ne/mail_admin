import React from 'react'
import firebase from './../firebase'

function useVehicleData() {
    const[docs, setContacts] =  React.useState([])
    let bac, resultAll, d_;

    React.useEffect(() => {       
        const unsub =   firebase.firestore().collection("vehicles")
              .onSnapshot((snap) =>{
                const contacts_ = [];
                snap.docs.forEach(document => {
                  const contact_ = {
                    id: document.id,
                    createdAt: document.data().createdAt
                  }
                  contacts_.push(contact_)
                })
                d_ = contacts_.sort(function (a, b){
                    var nameA = a.createAt;
                    var nameB = b.createAt;
                    if(nameA < nameB){
                      return -1
                    }
                    if(nameA > nameB){
                    return 1
                  }
                  return 0
                  }); 
                 setContacts(d_)
                      return () => unsub() 
                   })        
      }, [])

      bac =  docs.reduce((r, e) =>{         
    let l = new Date(e.createdAt).toLocaleString('default',{month:'short'})
    if(!r[l])
    {
        r[l] = {l, count:[e]}
    }
    else 
    {
        r[l].count.push(e)
       // console.log(r[l].count.push(e))
    }
    return r
  }, {})
  
 resultAll = Object.values(bac) 
   
    return {resultAll} 
}

export default useVehicleData
