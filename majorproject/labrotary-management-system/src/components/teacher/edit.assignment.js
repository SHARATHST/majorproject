import React, { useState } from "react";
import axios from "axios";




const Editassinment = (props ) =>{
    const [error, setError] = useState("");
    const [qno,setqno] = useState(props.data.qno);
    const [question,setquestion]=useState(props.data.question);
   
   
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
                const question=document.getElementById("question").value
                const _id=props.data.id;
                const teachid=props.data.teachid
                const subid=props.data.sid
                const { data } = await axios.post( 'http://localhost:5000/api/auth/teacher/editassignment' , 
              { _id,teachid,subid,qno,question },
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
    <h3 className="Register-screen__title">Assignment Edit</h3>
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
      <label htmlFor="question">
      Question:{" "}
      
      </label>
      <input
        type="text"
        required
        id="question"
        onChange={(e) => setquestion(e.target.value)}
        value={ question || ''}
        tabIndex={2}
      />
    </div>
    
   

   
  </form>
  
</div></div>
    );
};

export default Editassinment;