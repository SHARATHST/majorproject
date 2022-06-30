import React, { useState } from "react";
import axios from "axios";


const Addassignment = (props) =>{


    const [error, setError] = useState("");

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
const addhandler =  () =>{
    try{
        const qno = document.getElementById("Qno").value;
        const question = document.getElementById("question").value;
       
        const teachid = props.teachid;
        const subid =props.subid;
      axios.post( 'http://localhost:5000/api/auth/teacher/addassignment' , 
      {subid,teachid, qno,question },
      config
    );
  
      }
      catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      } 
    //   window.location.reload()
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
         <li> <label htmlFor="question" >Question:</label>
      <input
        type="text"
        required
        id="question"
        placeholder="Enter Question "
        tabIndex={1}
      /> </li>
    
     
          </ul>
   
            <button onClick={() => {addhandler()}} >ADD  </button>
        </div>
    )
} 
export default Addassignment;