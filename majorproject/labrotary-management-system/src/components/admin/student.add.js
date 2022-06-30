import React, { useState } from "react";
import axios from "axios";


const Addstudent = (props) =>{


    const [error, setError] = useState("");

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
const addhandler =  () =>{
    try{
        const usn = document.getElementById("usn").value;
        const attendence = document.getElementById("attendence").value;
        const IA1 = document.getElementById("IA1").value;
        const IA2 = document.getElementById("IA2").value;
        const CTA = document.getElementById("CTA").value;

        const id = props.id
      axios.post( 'http://localhost:5000/api/auth/student/addsubject' , 
      { usn ,attendence,id,IA1,IA2,CTA },
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
         <li> <label htmlFor="name" >USN:</label>
      <input
        type="text"
        required
        id="usn"
        placeholder="enter valid usn"
        tabIndex={1}
      /> </li>
      <li>
      <label htmlFor="attendence">
        Attendence:{" "}
      </label>
      <input
        type="number"
        required
        id="attendence"
        autoComplete="true"
        placeholder="Enter Attendence"
        tabIndex={4}
      />
      </li>
     <li>
     <label htmlFor="IA1">
        IA1:{" "}
      </label>
      <input
        type="number"
        required
        id="IA1"
        placeholder="Enter IA1 marks"
        tabIndex={5}
      />
     </li>
     <li>
      <label htmlFor="IA2">
      IA2:{" "}
      </label>
      <input
        type="number"
        required
        id="IA2"
        placeholder="Enter IA2 marks"
        tabIndex={6}
      />
    </li>
    <li>
    <label htmlFor="CTA">
      CTA:{" "}
      </label>
      <input
        type="number"
        required
        id="CTA"
        placeholder="Enter CTA marks"
        tabIndex={7}
      /></li>  
          </ul>
   
            <button onClick={() => {addhandler()}} >ADD  </button>
        </div>
    )
} 
export default Addstudent;