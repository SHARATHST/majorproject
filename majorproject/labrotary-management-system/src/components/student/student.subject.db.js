import axios from "axios";
import React,{ useState,useEffect} from "react";
import {  useLocation,useNavigate } from "react-router-dom";
import Editsolution from "./edit.solution";
import ReactDOM from 'react-dom';
import Addsolution from "./add.solution";
import deleteimg from "../images/deleteimg.jpg"



const Studentsub = () => {
  const [error, setError] = useState("");
  const [questions ,setqstn] = useState([]);
  const [solutions ,setsol] = useState([]);
  const [gotoedit ,setgotoedit] = useState(false);
  const [prop ,setprop] = useState({});


  const navigate = useNavigate();
  const location = useLocation();

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

 const fetch= async() => {
    
    try {
      axios.get("http://localhost:5000/subject/getsol", { params: { param1: location.state.sid ,parms2:location.state.id } }).then((response) =>
      setqa(response));
      
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

    useEffect(() => {
        fetch()
       },[] );

       const setqa = (data)=>{
      
        data.data[0].student.forEach(element => {
          if(element._id===location.state.id){
            setsol(element['solutions'])
          }
       });  
       setqstn(data.data[0]['teacher'][0]['questions'])
       }
    const  deleteassignment = async (_id) => {
        if(window.confirm("Are u sure?") ===false){
          return
        }
      try{
        const studentid=location.state.id
        const subid=location.state.sid
        const { data } = await axios.post( 'http://localhost:5000/api/auth/student/removesolution' , 
      { _id,studentid,subid },
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

 
    const backbtn = () => {
      navigate(-1)

    }
    const edithandler = (_id,qno,solution) => {
      const data = {
        "id":_id,
        "studentid":location.state.id,
        "subid":location.state.sid,
        "qno":qno,
        "solution":solution
      }

      setprop(data)
      setgotoedit(true)
    }
    const  addsolution =  () => {
      var btn=document.getElementById("removeonclick")
      btn.remove()
      ReactDOM.render(
        <React.StrictMode>
          <Addsolution studentid={location.state.id} subid={location.state.sid}  />
        </React.StrictMode>,
        document.getElementById('addsolution')
      );
    }
return (
    <div>
      {gotoedit ? <Editsolution data={prop} />:<div>
          {error && <span className="error-message">{error}</span>}
          <div id ="addsolution">
        </div>
        <button id="removeonclick" onClick={()=>addsolution()}>ADD Solution</button> 

        <h5> welcome to {location.state.subject } subject {location.state.name} and  </h5>
        <table  rules="all"><tbody>
         <tr>
             <td>sl no</td>
             <td>questions</td>
       </tr>
       </tbody>
      
       </table>


        {questions.map(({_id,qno,question}) => (
       <table key={_id} rules="all"><tbody>
         <tr>
             <td>{qno}</td>
             <td>{question}</td>
       </tr>
       </tbody>
      
       </table> 
      ))
      }
      <h4>the below is your solutions </h4>
      <table  rules="all"><tbody>
         <tr>
             <td>sl no</td>
             <td>solutions</td>
             <td>Edit</td>
             <td>Remove</td>
       </tr>
       </tbody>
      
       </table>
      {solutions.map(({_id,qno,solution}) => (
       <table key={_id} rules="all"><tbody>
         <tr>
             <td>{qno}</td>
             <td><a href={solution} target="_blank">{solution}</a></td>
             <td><button onClick={()=>{edithandler(_id,qno,solution)}}>edit</button></td>
             <td><button onClick={() => {deleteassignment(_id)}} ><img className="imgs" src={deleteimg} alt=" " ></img></button> </td>
       </tr>
       </tbody>
      
       </table> 
      ))
      }

        <button onClick = { backbtn } > back </button>

    </div>}
    </div>
)
} 

export default Studentsub;