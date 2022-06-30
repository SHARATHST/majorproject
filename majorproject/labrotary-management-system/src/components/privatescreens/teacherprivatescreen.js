import { useState, useEffect } from "react";
import axios from "axios";
import Teacherdashboard   from "../dashbords/teacherdashboard";


const PrivateScreen = () => {
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
        await axios.get("http://localhost:5000/api/private/teacher/", config);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login ");
        

      }
    };

    fetchPrivateData();
  }, []);
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div>
     <Teacherdashboard  name={localStorage.getItem("name")} /></div>
   
  );
};

export default PrivateScreen;
