import axios from "axios";
import { useState,useEffect} from "react";
import { Link  } from "react-router-dom";

function Studentdashboard(props) {
  const [error, setError] = useState("");
  const [usn ] = useState(props.usn);
  const [id,setid] = useState("");
  const [studentname , setName] = useState("");
  const [subjects, setsubjects] = useState([])
  

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };


  const  logout = async (e) => {
      
        localStorage.removeItem("authToken");
        window.location.reload();
          
      }
      const fetch= async () =>{
      
        
       try {
         const { data } = await axios.post( 'http://localhost:5000/api/auth/student/findbyid' , 
           { usn },
           config
         );
         funtosetname(data)
         
       } catch (error) {
         setError(error.response.data.error);
         setTimeout(() => {
           setError("");
         }, 5000);
       }
 

       try{
        axios.get("http://localhost:5000/api/auth/student/getsub", { params: { params: props.usn } }).then((response) =>
          setsubid(response));
         }
         catch (error) {
             setError(error.response.data.error);
             setTimeout(() => {
               setError("");
             }, 5000);
           }
      } 
     const  funtosetname = (data) =>{ 
      
      setid(data[0]._id)
      setName(data[0].name)
      
     }  
      useEffect(() => { 
        
     fetch();
     
    },[usn] );

    const setsubid = (response) => {
     
      setsubjects(response.data[0]['subject'])
     
  }
    return(
     
        <div>
          {error && <span className="error-message">{error}</span>}
         <p>welcome to student dashboard { studentname } </p>
         <table rules = "all"> 
          <thead>
           <tr>
            <th> subjects </th>
           </tr> 
         </thead>
        </table> 
        {subjects.map(({_id,name}) => (
       <table key={_id} rules="all"><tbody>
         <tr>
             <td><Link to='/studentlogin/studentdashboard/substudent' state={{"name":studentname , "id" : id ,"subject" : name ,"sid":_id} }>{name}</Link>      
             </td>
       </tr>
       </tbody>
      
       </table> 
      ))
      }
        
         <button onClick = { logout } > logout </button>
  </div>  
    ); 

    
}; 


export default Studentdashboard