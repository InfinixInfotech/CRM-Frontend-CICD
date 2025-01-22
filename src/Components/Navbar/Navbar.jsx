import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCog } from "react-icons/fa";
import LogoutPage from "../Logout/Logout";
import { BiSearch } from "react-icons/bi";
import SearchByMobileNumberFilter from "../Filter/SearchByMobileNumberFilter/SearchByMobileNumberFilter";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
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

        <ul className="navbar-nav d-flex gap-2">
        <SearchByMobileNumberFilter/>

          <li className="nav-item dropdown">
            <button
              className="btn text-white btn-sm fs-5"
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

          {username && ["admin", "Admin", "ADMIN"].includes(username) && (
          <li className="nav-item">
            <button
              className="btn text-white btn-sm fs-5"
              onClick={() => handleNavigation("/settingdashboard")}
              title="Settings"
            >
              <FaCog />
            </button>
          </li>
            )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
