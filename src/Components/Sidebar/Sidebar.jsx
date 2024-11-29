import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    dashboard: false,
    leads: false,
  });
  const [activeItem, setActiveItem] = useState("");

  const toggleDropdown = (itemName) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [itemName]: !prevState[itemName],
    }));
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <div
      className="d-flex mt-5 flex-column bg-dark text-white pt-4"
      style={{ width: "250px", minHeight: "100vh", overflowY: "auto" }}
    >
      <nav className="flex-grow-1">
        <ul className="nav flex-column p-0">
          {/* Dashboard with dropdown */}
          <li className="nav-item">
            <Link
              to="#"
              onClick={() => toggleDropdown("dashboard")}
              className={`nav-link text-white d-flex align-items-center px-3 py-2 w-100 ${
                activeItem === "dashboard" ? "bg-primary" : ""
              } ${isDropdownOpen.dashboard ? "bg-secondary" : ""}`}
            >
              <i className="fas fa-tachometer-alt me-2"></i>
              <span>Dashboard</span>
              <i
                className={`fas fa-chevron-down ms-auto ${
                  isDropdownOpen.dashboard ? "rotate-180" : ""
                }`}
                style={{ transition: "transform 0.2s" }}
              ></i>
            </Link>
            <div
              className={`collapse ${isDropdownOpen.dashboard ? "show" : ""}`}
            >
              <ul className="nav flex-column bg-dark ps-4">
                <li className="nav-item">
                  <Link
                    to="/salesdashboard"
                    className={`nav-link text-white ${
                      activeItem === "salesDashboard" ? "bg-primary" : ""
                    }`}
                    onClick={() => handleItemClick("salesDashboard")}
                  >
                    Sales Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="Callingdashboard"
                    className={`nav-link text-white ${
                      activeItem === "callingDashboard" ? "bg-primary" : ""
                    }`}
                    onClick={() => handleItemClick("callingDashboard")}
                  >
                    Calling Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </li>

         

          {/* Leads dropdown */}
          <li className="nav-item">
            <Link
              to="#"
              onClick={() => toggleDropdown("leads")}
              className={`nav-link text-white d-flex align-items-center px-3 py-2 w-100 ${
                activeItem === "leads" ? "bg-primary" : ""
              } ${isDropdownOpen.leads ? "bg-secondary" : ""}`}
            >
              <i className="fas fa-user-friends me-2"></i>
              <span>Leads</span>
              <i
                className={`fas fa-chevron-down ms-auto ${
                  isDropdownOpen.leads ? "rotate-180" : ""
                }`}
                style={{ transition: "transform 0.2s" }}
              ></i>
            </Link>
            <div className={`collapse ${isDropdownOpen.leads ? "show" : ""}`}>
              <ul className="nav flex-column bg-dark ps-4">
                <li className="nav-item">
                  <Link
                    to="/addleads"
                    className={`nav-link text-white ${
                      activeItem === "leadsPage" ? "bg-primary" : ""
                    }`}
                    onClick={() => handleItemClick("leadsPage")}
                  >
                    Add Leads
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/viewleads"
                    className={`nav-link text-white ${
                      activeItem === "leadDetails" ? "bg-primary" : ""
                    }`}
                    onClick={() => handleItemClick("leadDetails")}
                  >
                    View Leads
                  </Link>
                </li>
                <li className="nav-item"></li>
                <li>
                  <Link
                    to="/uploadleads"
                    className={`nav-link text-white ${
                      activeItem === "leadsUpload" ? "bg-primary" : ""
                    }`}
                    onClick={() => handleItemClick("leadsUpload")}
                  >
                    Upload Leads
                  </Link>
                </li>
                <li>
                  <Link
                    to="/viewmarketingleads"
                    className={`nav-link text-white ${
                      activeItem === "leadsViewMarketing" ? "bg-primary" : ""
                    }`}
                    onClick={() => handleItemClick("leadsViewMarketing")}
                  >
                    View Marketing Leads
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {[
            {
              icon: "calendar-check",
              text: "Follow up",
              id: "followUp",
              link: "/follow-up",
            },
            {
              icon: "pencil-alt",
              text: "Free Trial",
              id: "freeTrial",
              link: "/free-trial",
            },
            {
              icon: "user-circle",
              text: "Client",
              id: "client",
              link: "/client",
            },
            {
              icon: "file-invoice",
              text: "salesorder",
              id: "salesorder",
              link: "/salesorder",
            },
            {
              icon: "rupee-sign",
              text: "Payment",
              id: "payment",
              link: "/payment",
            },
            {
              icon: "shield-alt",
              text: "Compliance",
              id: "compliance",
              link: "/compliance",
            },
            {
              icon: "microphone",
              text: "Voice Box",
              id: "voiceBox",
              link: "/voice-box",
            },
            {
              icon: "book",
              text: "Policies",
              id: "policies",
              link: "/policies",
            },
            {
              icon: "chart-line",
              text: "Forecast",
              id: "forecast",
              link: "/forecast",
            },
            { icon: "clock", text: "EOD", id: "eod", link: "/eod" },
            {
              icon: "chart-pie",
              text: "Reports",
              id: "reports",
              link: "/reports",
            },
          ].map((item) => (
            <li key={item.id} className="nav-item">
              <Link
                to={item.link}
                className={`nav-link text-white d-flex align-items-center px-3 py-2 w-100 ${
                  activeItem === item.id ? "bg-primary" : ""
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <i className={`fas fa-${item.icon} me-2`}></i>
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
