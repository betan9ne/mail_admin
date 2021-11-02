import React,{useState, useEffect} from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row, Input,
  Col,
} from "reactstrap";

function Tables() {

  const[email, setEmail] = useState()
  const[pass, setPass]  = useState()
  const[expression, setExpression] = useState()

  function trackEmail (e){
    setEmail(e.target.value)
    if(e.target.value.includes("h"))
    {
     setExpression("start")
    }    
    if(e.target.value.includes("@"))
    {
      setExpression("middle")
    }
    if(e.target.value.includes("."))
    {
      setExpression("end")
    }
  }

  
  function trackPass (e){
    setPass(e.target.value)
   setExpression("hiddens")
  }



  return (
    <>
      <div className="content">      
      <label>{expression}</label>
                        <Input name="make"
                            placeholder="email address"
                          type="email" value={email} onChange={e =>trackEmail(e)}
                        />
                          <Input name="make"
                            placeholder="password"
                          type="password" value={pass} onChange={e =>trackPass(e)}
                        />
     
      </div>
    </>
  );
}

export default Tables;
