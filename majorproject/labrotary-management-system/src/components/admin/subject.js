import teacher from "../images/teachericon.png";
import student from "../images/studenticon.jpg";
import { Link,useLocation ,useNavigate} from "react-router-dom";


import "../main.component.css"

const Subjectedit = ()=>{
   const location = useLocation();
   const navigate = useNavigate();
    const  logout = async () => {
        localStorage.removeItem("authToken");
        window.location.reload();   
      }
      const backhandler = () =>{
        navigate(-1)
      }
      const style={
        padding:"5px 25px",
        border:"2px solid black",
        borderRadius:10
      };
    return (
        <center><div>
            <h3>WELCOME TO {location.state.name } EDIT   </h3>
            <button style={style} onClick={( ) => {backhandler() }}>BACK</button>&emsp; &emsp;&emsp;
        <div className="main">
        <Link to='/adminlogin/admindashboard/subjectedit/teacheredit' state={{ id : location.state.id ,name :location.state.name }}> <img   className="im1" src={teacher} alt=""></img></Link>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;   
        <Link to='/adminlogin/admindashboard/subjectedit/studentedit' state={{ id : location.state.id ,name :location.state.name }} ><img style={{width:160}} className="im2" src={student} alt=""></img>   </Link>  
        </div>
        <button style={style}  onClick={logout} >LOGOUT </button>
   </div>
   </center>   
    );
};

export default Subjectedit;