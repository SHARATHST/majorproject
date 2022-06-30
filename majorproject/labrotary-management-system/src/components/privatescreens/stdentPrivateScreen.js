import { useState, useEffect } from "react";
import axios from "axios";
import Studentdashboard   from "../dashbords/studentdashboard";

    

const PrivateScreen = (props) => {
  const [error, setError] = useState("");

  

  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        await axios.get("http://localhost:5000/api/private/student/", config);
      } catch (error) {
        
        localStorage.removeItem("authToken");
        setError("You are not authorized please ");
      }
    };
    fetchPrivateData();
  },);
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    
    <div>
     <Studentdashboard usn={localStorage.getItem("usn")}/></div>
   
  );
};

export default PrivateScreen;
