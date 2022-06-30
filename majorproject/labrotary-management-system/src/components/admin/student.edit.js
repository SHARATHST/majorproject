import React, { useState,useEffect } from "react";
import axios from "axios";
import { useLocation,useNavigate} from "react-router-dom";
import ReactDOM from 'react-dom';

import deleteimg from  "../images/deleteimg.jpg";
import Registerstudent  from "./register.student";
import Editstudent from "./student";
import Addstudent from "./student.add";


const Studentedit = () =>{
    const location = useLocation();
    const navigate = useNavigate();

    const [gotoregister, setgotoreg] = useState(false);
    const [gotoedit, setgotoedit] = useState(false);
    const [prop, setprop] = useState({});
    const [error, setError] = useState("");
    const [students,setstudents]=useState([]);

    const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

    const  logout =  () => {  
      localStorage.removeItem("authToken");
      window.location.reload();
        
    }
    const successShow = (data) =>{ 
     
        setstudents(data.data['student'])  
        

    
  }
    useEffect(() => {
      
      try{
        axios.get("http://localhost:5000/api/auth/admin/getstudent",{ params: { params: location.state.id } }).then((response) =>
        successShow(response)
        );
      }
        catch (error) {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
    }
    ,[location.state.id]);
    const backhandler = () =>{
     navigate(-1);
    }
    const  edithandler = (id,attendence,cie,cta,ia1,ia2 ) =>{
      setprop({
        "id":id,
        "sid":location.state.id,
        "attendence":attendence,
        "ia1":ia1,
        "ia2":ia2,
        "cie":cie,
        "cta":cta
      })
      setgotoedit(true)
    }
    const  deletestudent = async (_id) => {
      if(window.confirm("Are u sure?") ===false){
        return
      }
    try{
      const { data } = await axios.post( 'http://localhost:5000/api/auth/student/delete' , 
    { _id },
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
  const  registerstudent =  () => {
      setgotoreg(true) 
  }

  const  addstudent =  () => {
    var btn=document.getElementById("removeonclick")
    btn.remove()
    ReactDOM.render(
      <React.StrictMode>
        <Addstudent id={location.state.id} />
      </React.StrictMode>,
      document.getElementById('addstudent')
    );
    
}
  const removehandler = async (_id)  => {
    try{
      const subid = location.state.id
     
      const { data } = await axios.post( 'http://localhost:5000/api/auth/student/remove' , 
    { _id ,subid},
    config
  );
    window.alert(data)
    window.location.reload()
    
    }
    catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }  
  }
 
    return(
       <center><div>
         {gotoedit ? <Editstudent data={prop}/> :
          <div> 
          {gotoregister ? <Registerstudent id={location.state.id} name={location.state.name}  />:
         <div>
         <h4>Welcome To Student Edit Of {location.state.name} Subject </h4>
         {error && <span className="error-message">{error}</span>}
          <button style={{padding:"5px 25px",border:"2px solid black",borderRadius:5}} onClick={()=>backhandler()}>Back</button><br></br>
        <ul> 
        <button style={{padding:"5px 25px",border:"2px solid black",borderRadius:5}} onClick={()=>registerstudent()}>Register Student</button> 
        <div id ="addstudent">
        </div>
        <button style={{padding:"5px 25px",border:"2px solid black",borderRadius:5}} id="removeonclick" onClick={()=>addstudent()}>ADD Student</button> 
        <table rules="all"><thead>
       <tr>
       <th>Name</th>
       <th>Remove</th>
       <th>Delete</th>
      
       </tr>
       </thead>
          
        </table> 
       {students.map(({_id,attendence,cie,cta,ia1,ia2 }) => (
        <table key={_id._id} rules="all"><tbody>
          <tr >
       <td><button onClick={()=>edithandler(_id,attendence,cie,cta,ia1,ia2 )}>{_id.name}</button></td>
       <td><button onClick={()=>removehandler(_id._id)}>remove</button></td>
       <td><button onClick={() => {deletestudent(_id._id)}} ><img className="imgs" src={deleteimg} alt=" " ></img></button> </td>
      
        </tr>
        </tbody>
       
        </table> 
       ))
       }
     </ul>
     <button style={{padding:"5px 25px",border:"2px solid black",borderRadius:5}} onClick={logout} >logout</button>
 </div> }
    </div>}
       </div>
       </center>
    
    );
};

export default Studentedit;