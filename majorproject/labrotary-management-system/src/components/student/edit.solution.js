import React, { useState } from "react";
import axios from "axios";




const Editsolution = (props ) =>{
    const [error, setError] = useState("");
    const [qno,setqno] = useState(props.data.qno);
    const [solution,setsolution]=useState(props.data.solution);
   
   
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

   
    const backhandler = () =>{
     window.location.reload()
      
      }
    const  edithandler = async ()  =>{
            try{
                const qno=document.getElementById("qno").value
                const solution=document.getElementById("solution").value
                const _id=props.data.id;
                const studentid=props.data.studentid
                const subid=props.data.subid
                const { data } = await axios.post( 'http://localhost:5000/api/auth/student/editsolution' , 
              { _id,studentid,subid,qno,solution },
              config
            );
              window.alert(data)
              window.location.reload();
            } 
            catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
            }
    }
    return (

        <div>
        <button onClick={()=>backhandler()}>back</button>
        <button onClick={() => {edithandler()}} >
     Edit
    </button>
        <div className="Register-screen">
  
  <form  className="Register-screen__form">
    <h3 className="Register-screen__title">Solution Edit</h3>
    {error && <span className="error-message">{error}</span>}
    <div className="form-group">
      <label htmlFor="qno">
      Qno:{" "}
      
      </label>
      <input
        type="number"
        required
        id="qno"
        onChange={(e) => setqno(e.target.value)}
        value={qno || ''}
        tabIndex={1}
      />
    </div>
    <div className="form-group">
      <label htmlFor="solution">
      Solution:{" "}
      
      </label>
      <input
        type="text"
        required
        id="solution"
        onChange={(e) => setsolution(e.target.value)}
        value={ solution || ''}
        tabIndex={2}
      />
    </div>
    
   

   
  </form>
  
</div></div>
    );
};

export default Editsolution;