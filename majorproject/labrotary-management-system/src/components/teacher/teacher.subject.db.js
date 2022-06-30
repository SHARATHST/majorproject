import React, {  useState, useEffect } from "react";
import { useLocation,useNavigate,Link } from "react-router-dom"
import axios from "axios";
import Editstudent from "../admin/student"
import "./t_s.css"
import ReactDOM from 'react-dom';
import Addassignment from "./add.assignment";


const Teachersub = () => {
    const [students, setstudents] = useState([]);
    const [prop, setprop] = useState({});
    const [gotoedit,setgotoedit ] = useState(false);

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const navigate = useNavigate();
    const location = useLocation();
 useEffect(( ) => 
     {  
        axios.get("http://localhost:5000/api/auth/teacher/findall",{ params: { params:location.state.id}}).then((response) =>
        setsubname(response)
        );
     }
 ,[])

 const setsubname = (response) => {
     setstudents(response.data['student'])
    } 

 const backbtn = () => {
   navigate(-1)
   }
 const  addassignment =  () => {
    var btn=document.getElementById("removeonclick")
    btn.remove()
    ReactDOM.render(
      <React.StrictMode>
        <Addassignment id={location.state.teacahid} subid={location.state.id}  />
      </React.StrictMode>,
      document.getElementById('addassignment')
    );
    
   }
 const editstudent = (id,attendence,ia1,ia2,cta,cie) => {
  const sprop ={
    "id":id,
    "sid":location.state.id,
    "attendence":attendence,
        "ia1":ia1,
        "ia2":ia2,
        "cie":cie,
        "cta":cta
  }
  setprop(sprop)
  setgotoedit(true)
 }
 const getattendence = async ()  => {
  const subid=location.state.id
  const { data } = await axios.post( 'http://localhost:5000/api/auth/teacher/getattendence' , 
  { subid },
  config
     );
  window.alert(data)
  window.location.reload()

 }

return (
  <div>
    {gotoedit ? <Editstudent  data={prop} /> :  <div>
        <h5> welcome to {location.state.subject } subject {location.state.name}</h5>
        <div id ="addassignment">
        </div>
        <button id="removeonclick" onClick={()=>addassignment()}>ADD Assignment</button> 
        <button onClick={()=>getattendence()}>Get attendence</button> 
       
        <table rules = "all"> 
          <thead>
           <tr>
            <th> name </th>
            <th> usn </th>
           <th> attendence </th>
           <th> IA1 </th>
           <th> IA2 </th>
           <th> CTA </th>
           <th> CIE </th>
           <th> Edit </th>
           </tr> 
         </thead>
        </table> 
        {students.map(({_id,attendence,ia1,ia2,cta,cie}) => (
       <table key={_id._id} rules="none"><tbody>
         <tr>
           <td> <Link to='/teacherlogin/teacherdashboard/subteacher/teacherstudent' state={{"name":location.state.name , "id" : _id._id ,"subject" : location.state.subject,"teachid":location.state.teachid,"subid":location.state.id } } >{_id.name}</Link></td>
     
           <td> {_id.usn} </td>
           <td> {attendence }</td>
           <td> {ia1} </td>
           <td> {ia2} </td>
           <td> {cta} </td>
           <td> {cie} </td>
           <td> <button onClick={()=>{editstudent(_id,attendence,ia1,ia2,cta,cie)}}>edit</button> </td>
       </tr>
       </tbody>
      
       </table> 
      ))
      }

        <button onClick = {() =>{backbtn()}} > back </button>

    </div>}
  </div>
)
} 

export default Teachersub;