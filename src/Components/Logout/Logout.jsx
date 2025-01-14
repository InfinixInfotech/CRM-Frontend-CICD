import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("authToken");
    localStorage.removeItem("employcode");
    localStorage.removeItem("groupName");
    localStorage.removeItem("username");
  };
  return (
    <div >
    
            <button onClick={handleLogout} className="btn btn-danger"> Logout</button>
            {/* <button onClick={() => navigate(-1)} className="cancel-btn">Cancel</button> */}
         
    </div>
  );
};

export default LogoutPage;