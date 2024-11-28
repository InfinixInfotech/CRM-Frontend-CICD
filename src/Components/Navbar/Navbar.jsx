import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleDropdownChange = (event) => {
    const selectedRoute = event.target.value; // Get the selected route
    if (selectedRoute) {
      navigate(selectedRoute); // Navigate directly to the selected route
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <strong className="fs-6">INFINIX INFOTECH PVT LTD</strong>
        </a>

        <li className="nav-item">
          <select
            className="form-select form-select-sm"
            onChange={handleDropdownChange}
            defaultValue=""
          >
            <option value="" disabled>
              --Admin--
            </option>
            <option value="/profiledashbord">Profile</option>
            <option value="/settingdashboard">Setting</option>
          </select>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
