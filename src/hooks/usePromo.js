import React,{useEffect, useState} from 'react'

import firebase from '../firebase'

function usePromo() {
    const[docs, setDocs] = useState([])
    let data = []
    useEffect(() => {       
    firebase.firestore().collection("promo") 
         .onSnapshot({
             includeMetadataChanges:true
         },(snap)=>{
            snap.docs.forEach(d=>{
                let asd ={
                    id: d.id,
                    ...d.data()
                }
                data.push(asd)
            })
            setDocs(data)            
          })        
    }, []) 
    return {docs}
}

export default usePromo


  // return rides.reduce((acc, obj)=>{
  //   let key = new Date(obj[property]).toLocaleString('en-us', { month: 'short' });
  //   if(!acc[key]){
  //     acc[key] = []
  //   }
  //   acc[key].push(obj)
  //   setChartData(acc)
  //   return acc
  // },{})

  //  rides &&  rides.reduce((result, currentItem)=>{
  //   (result[currentItem[key]] = result[currentItem[key]] || []).push(currentItem)
  //   return result
  // })