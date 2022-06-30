import React, { useState } from "react";
import axios from "axios";


const Addteacher = (props) =>{


    const [error, setError] = useState("");

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
const addhandler =  () =>{
    try{
        const name = document.getElementById("name").value;
        const id = props.id
      axios.post( 'http://localhost:5000/api/auth/teacher/addsubject' , 
      { name ,id },
      config
    );
   
     
   
   
      }
      catch (error) {
        console.log(error)
        setTimeout(() => {
          setError("");
        }, 5000);
      } 
      window.location.reload()
    
    }
    return (
        <div>
         {error && <span className="error-message">{error}</span>}
         <label htmlFor="name" >Teacher name:</label>
      <input
        type="text"
        required
        id="name"
        placeholder="enter valid name "
        tabIndex={1}
      />
            <button onClick={() => {addhandler()}} >ADD  </button>
        </div>
    )
} 
export default Addteacher;