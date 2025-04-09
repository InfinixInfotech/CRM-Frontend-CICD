import React from "react";
import { useNavigate } from "react-router-dom";
import { emp, logOutUrl } from "../../Redux/Services/apiServer/ApiServer";
import { IoLogOut } from "react-icons/io5";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
   
    try {
      const response = await fetch(
        `${logOutUrl}?EmployeeCode=${emp}`,
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("employcode");
        localStorage.removeItem("groupName");
        localStorage.removeItem("username");

        navigate("/");
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="btn btn-danger">
      <IoLogOut/>
      </button>
    </div>
  );
};

export default LogoutPage;
