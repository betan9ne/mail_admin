import React,{useState} from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup, Row, Col,
    Input, Button
  } from "reactstrap";
import {Redirect} from 'react-router-dom'
import firebase from './../firebase'
import {useDispatch} from 'react-redux'
import {Session} from './../redux/userSessionSlice'

function Login() {

    const dispatch = useDispatch()

    const[phone, setPhone] = useState()
    const[result, setResult] = useState()
    const[code, setVerificationCode] = useState()
    const[uid, setUid] = useState()
    const[status, setStatus] = useState()
    const[msg, setMsg] = useState()
    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': function(response) {             
              console.log(response) 
             return true   
            }
          });
    }

    function phoneNumberFormatter(number){  
        //condition
        //trim the string first
        //number have 10 charaters
        //number start with a zero 
        //pick last 10 numbers   
        //if 9 numbers add a zero to front    

    //     let pNs = ["+260978314531","260978314532", "0978314533","978314534","78314535"]
    //     let allowedNumbers = []
      //  pNs.forEach(pN => {
            let pNtrimmed = number.trim()
            if(pNtrimmed.length === 10)
            {
                if(pNtrimmed.startsWith("0"))
                {
                //    allowedNumbers.push(pNtrimmed)
                setMsg(pNtrimmed)
                }
            } 
            else if(pNtrimmed.length === 9) {
                let zero = "0"
                if(pNtrimmed.startsWith("0"))
                {   
                    setMsg("not a number")
                }
                else{
                    let pNConcat = zero.concat('',pNtrimmed) 
                    setMsg(pNConcat)
                }
               
              //  allowedNumbers.push(pNConcat)
           } 
            else if(pNtrimmed.length > 10)
            {
               let newpN = pNtrimmed.substring(pNtrimmed.length -10)
               setMsg(newpN)
              //  allowedNumbers.push(newpN)
            }
            else{
                
            }          
       // });
         //   console.log(allowedNumbers)
    }

    const handleSendCode = () => {   
         var appVerifier = window.recaptchaVerifier;     
          firebase.firestore().collection("users").where("phone","==",phone+"").get().then((doc)=>{
            if(doc.empty)
            {
              alert("User with that account does not exist, please contact your admin for login details")
            }
            else{
                console.log("something here")
                setUpRecaptcha()
                    firebase
                    .auth()
                    .signInWithPhoneNumber("+26"+phone, appVerifier)
                    .then(confirmResult => {
                      setResult(confirmResult)
                     })
                    .catch(error => {                
                      console.log(error, phone)
                    })
                
          }
        })     
      }

      const changePhoneNumber =()=>{
        setPhone("")
        setResult()
        setVerificationCode()
    }

    const handleVerifyCode = () => {
        // Request for OTP verification
       
        if (code.length == 6) {
          result
            .confirm(code)
            .then(user => {
                renderLoggedin(user)            
              })
            .catch(error => {
              alert(error.message)
              console.log(error)
            })
        } else {
          alert('Please enter a 6 digit OTP code.')
        }
      }

console.log(firebase.auth().currentUser)

function renderLoggedin(user){  
            let asd ={
                id: user.user.uid,
                phone: user.user.phoneNumber
            }
            dispatch(Session(asd))
            setStatus(asd)
            console.log(asd)
         return <Redirect  to="/admin/dashboard" />      
}

    return (
        <div className="content">
        <Button color="primary" onClick={()=>phoneNumberFormatter(" 978314539 ")} >That Number {msg}</Button> 
              <div id="recaptcha-container"></div>
        <Card className="card-chart" style={{width:"25%", padding:"20px", margin:"20px auto"}}>
            <CardHeader>
                <h5 className="card-category">Login with your phone number</h5>               
              </CardHeader>
              <CardBody>
              <FormGroup>
                        <label>Phone</label>
                        <Input name="make"
                            placeholder="0977123456"
                          type="number" value={phone} onChange={e =>setPhone(e.target.value)}
                        />
                      </FormGroup>
              </CardBody>
              <Button color="primary" onClick={handleSendCode} >Get OTP</Button> 
              <div id="recaptcha-container"></div>
              {result ? <CardBody>
              <FormGroup>
                        <label>OTP(One Time Pin)</label>
                        <Input name="make"
                            placeholder="123456"
                          type="number" value={code} onChange={e =>setVerificationCode(e.target.value)}
                        />
                      </FormGroup>
                      <Button color="primary" onClick={handleVerifyCode} >Verify Code</Button> 
              </CardBody>
              
              : null
              }               
              </Card>

        </div>
    )
}

export default Login
