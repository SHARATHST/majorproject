import { useLocation,useNavigate} from "react-router-dom"
import axios from "axios";
import { useState,useEffect} from "react";
import Editassinment from "./edit.assignment";
import deleteimg from "../images/deleteimg.jpg"

const Teacherstudent = ()=> {
    const [error, setError] = useState("");
    const [questions ,setqstn] = useState([]);
    const [solutions ,setsol] = useState([]);
    const [gotoedit,setgotoedit ]= useState(false);
    const [prop,setprop]=useState({});
    const location = useLocation();
    const navigate = useNavigate();
 

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const backhandler = () => {
        navigate(-1)
    }
    const fetch= async() => {
        try {
          axios.get("http://localhost:5000/subject/getsol", { params: { param1: location.state.subid ,parms2:location.state.id } }).then((response) =>
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

    const editassignment = (id,qno,question) =>{
         setprop({
          "id":id,
          "qno":qno,
          "question":question,
          "sid":location.state.subid,
          "teachid":location.state.teachid })
          setgotoedit(true)
    }
    const  deleteassignment = async (_id) => {
      if(window.confirm("Are u sure?") ===false){
        return
      }
    try{
      const teachid=location.state.teachid
      const subid=location.state.subid
      const { data } = await axios.post( 'http://localhost:5000/api/auth/teacher/removeassignment' , 
    { _id,teachid,subid },
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
    
    return(
       <div>
        {gotoedit ?<Editassinment data={prop} />: <div>
            <h4>Below are the given Assignment questions</h4>
            
              <table  rules="all"><tbody>
         <tr>
             <td>sl no</td>
             <td>questions</td>
             <td>Edit</td>
             <td>Remove</td>
       </tr>
       </tbody>
      
       </table>


        {questions.map(({_id,qno,question}) => (
       <table key={_id} rules="all"><tbody>
         <tr>
             <td>{qno}</td>
             <td>{question}</td>
             <td><button onClick={()=>{editassignment(_id,qno,question )}}>edit</button></td>
             <td><button onClick={() => {deleteassignment(_id)}} ><img className="imgs" src={deleteimg} alt=" " ></img></button> </td>
       </tr>
       </tbody>
      
       </table> 
      ))
      }
      <h4>Below is student solutions </h4>
      <table  rules="all"><tbody>
         <tr>
             <td>sl no</td>
             <td>solutions</td>
       </tr>
       </tbody>
      
       </table>
      {solutions.map(({_id,qno,solution}) => (
       <table key={_id} rules="all"><tbody>
         <tr>
             <td>{qno}</td>
             <td><a href={solution} target="_blank">{solution}</a></td>
       </tr>
       </tbody>
      
       </table> 
      ))
      }
            <button onClick = { () =>{backhandler()} } > back </button>
        </div>
        }
       </div>

    )
}

export default Teacherstudent;