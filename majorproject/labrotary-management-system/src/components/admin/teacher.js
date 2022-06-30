import React, { useState } from "react";
import axios from "axios";
import "./register.css"



const Editteacher = (props ) =>{
    const [error, setError] = useState("");
    const [name,setName] = useState(props.data.id.name);
   
   
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

   
    const backhandler = () =>{
     window.location.reload()
      
      }
      const  edithandler = async ()  =>{
      const id=props.data.id._id
        try{
        const data = await axios.post(
          "http://localhost:5000/api/auth/admin/editteacher",
          {  id,name },
          config
        );
        if(data.data["acknowledged"]===true){
          window.alert("update sucessful..!")
        }
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
        <button onClick={()=>backhandler()}>back</button>
        <button onClick={() => {edithandler()}} >
     Edit
    </button>
        <div className="Register-screen">
  
  <form  className="Register-screen__form">
    <h3 className="Register-screen__title">Student Edit</h3>
    {error && <span className="error-message">{error}</span>}
    <div className="form-group">
    <label htmlFor="name" >NAME:{}</label>
      <input
        type="text"
        required
        id="name"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
        value={name || ''}
        tabIndex={1}
      />
    </div>
   
   

   
  </form>
  
</div></div>
    );
};

export default Editteacher;