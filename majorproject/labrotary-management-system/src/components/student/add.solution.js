import React, { useState } from "react";
import axios from "axios";


const Addsolution = (props) =>{


    const [error, setError] = useState("");

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
const addhandler =  () =>{
    try{
        const qno = document.getElementById("Qno").value;
        const solution = document.getElementById("solution").value;
       
        const studentid = props.studentid;
        const subid =props.subid;
      axios.post( 'http://localhost:5000/api/auth/student/addsolution' , 
      {subid,studentid, qno,solution },
      config
    );
  
      }
      catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      } 
      window.location.reload()
    }
    return (
        <div>
         {error && <span className="error-message">{error}</span>}
          <ul>
          <li>
      <label htmlFor="Qno">
        Qno:{" "}
      </label>
      <input
        type="number"
        required
        id="Qno"
        placeholder="Enter Question Number"
        tabIndex={4}
      />
      </li>
         <li> <label htmlFor="solution" >Solution:</label>
      <input
        type="text"
        required
        id="solution"
        placeholder="Enter Solution "
        tabIndex={1}
      /> </li>
    
     
          </ul>
   
            <button onClick={() => {addhandler()}} >ADD  </button>
        </div>
    )
} 
export default Addsolution;