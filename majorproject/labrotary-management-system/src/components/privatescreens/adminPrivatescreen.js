import { useState, useEffect } from "react";
import axios from "axios";
import Admindashboard   from "../dashbords/admindashboard";



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
        await axios.get("http://localhost:5000/api/private/admin/", config);
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
     <Admindashboard   /></div>
   
  );
};

export default PrivateScreen;
