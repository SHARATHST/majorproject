import React, { useState } from "react";
import axios from "axios";
import "./register.css"



const Registerstudent = (props) => {
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [id,]=useState(props.id)

    const registerHandler = async (e) => {
        e.preventDefault();
    
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
    
        try {
            const data = await axios.post(
            "http://localhost:5000/api/auth/teacher/register",
            { name,password,id},
            config
          );
         
         if(data.data.sucess===true){
             window.alert("registratation sucessfull")
         }
        } catch (error) {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
        
      };


  return (<div> 
       <h4 > Register for { props.name } subject</h4>
      <div className="Register-screen">
  
  <form onSubmit={registerHandler} className="Register-screen__form">
    <h3 className="Register-screen__title" style={{backgroundColor: "white"}}>Teacher Register</h3>
    {error && <span className="error-message">{error}</span>}
    <div className="form-group" style={{backgroundColor: "white"}}>
      <label htmlFor="name" style={{backgroundColor: "white"}} >NAME:</label>
      <input
        type="text"
        required
        id="email"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        tabIndex={1}
      />
    </div>
    <div className="form-group" style={{backgroundColor: "white"}}>
      <label htmlFor="password" style={{backgroundColor: "white"}}>
        Password:{" "}
      
      </label>
      <input
        type="password"
        required
        id="password"
        autoComplete="true"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        tabIndex={2}
      />
    </div>
   
 
    <button type="submit" className="btn btn-primary">
     Register
    </button>

   
  </form>
</div></div>
   
      
  );

} 

export default Registerstudent