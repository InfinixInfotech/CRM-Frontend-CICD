import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear authentication token
  
    localStorage.removeItem("authToken");
    navigate("/");

    localStorage.removeItem("employcode");
    localStorage.removeItem("groupName");
  };

  
  return (
    <div >
    
            <button onClick={handleLogout} className="btn btn-danger"> Logout</button>
            {/* <button onClick={() => navigate(-1)} className="cancel-btn">Cancel</button> */}
         
    </div>
  );
};

export default LogoutPage;