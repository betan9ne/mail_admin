import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage"
import "firebase/messaging"
import "firebase/auth"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
    apiKey: "AIzaSyBUFvZwaCZZ-NjGgAJhHf2jKc63oMt8p_s",
    authDomain: "mail-d.firebaseapp.com",
    projectId: "mail-d",
    storageBucket: "mail-d.appspot.com",
    messagingSenderId: "12526957903",
    appId: "1:12526957903:web:759eef71c6393e2b41813a"  
  };
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;

 
export const onMessageListener = () =>
new Promise((resolve) => {
  firebase.messaging().onMessage((payload) => {
    resolve(payload);
    console.log(payload)
  });
});