import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCog } from "react-icons/fa";
import LogoutPage from "../Logout/Logout";
const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <strong className="fs-6">INFINIX INFOTECH PVT. LTD.</strong>
        </a>

        <ul className="navbar-nav">
          <li className="nav-item dropdown mx-2">
            <button
              className="btn btn-outline-light btn-sm dropdown-toggle"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              title="Profile"
            >
              <FaUser />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="profileDropdown"
            >
              <li className="text-center mb-2">
                <button
                  className="btn btn-success"
                  onClick={() => handleNavigation("/profiledashbord")}
                >
                  Profile
                </button>
              </li>
              <li className="text-center">
                <LogoutPage />

              </li>
            </ul>
          </li>
          <li className="nav-item mx-2">
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => handleNavigation("/settingdashboard")}
              title="Settings"
            >
              <FaCog />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
