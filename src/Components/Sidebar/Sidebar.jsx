import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users, PenLine, FileText, IndianRupee, Mail, BookOpen, ChevronDown,UserPlus,Eye ,Upload   } from 'lucide-react';
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    dashboard: false,
    leads: false,
  });
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const toggleDropdown = (itemName) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [itemName]: !prevState[itemName],
    }));
  };
  // const handleItemClick = (itemName, path) => {
  //   setActiveItem(itemName);
  //   console.log(`Navigating to: ${path}`);
  // };
  const handleItemClick = (itemName, path) => {
    setActiveItem(itemName);
    console.log(`Navigating to: ${path}`);
    navigate(path); // Perform navigation
  };
  const mainMenuItems = [
    {
      icon: LayoutDashboard,
      text: "Sales Dashboard",
      id: "salesdashboard",
      path: "/salesdashboard",
    },
    {
      icon: UserPlus,
      text: "Add Leads",
      id: "addleads",
      path: "/addleads",
    },
    {
      icon: Eye,
      text: "View Leads",
      id: "viewleads",
      path: "/viewleads",
    },
    {
      icon: Upload ,
      text: "Upload Leads",
      id: "uploadleads",
      path: "/uploadleads",
    },
    {
      icon: FileText,
      text: "Sales Order",
      id: "salesorder",
      path: "/salesorder",
    },
    {
      icon: IndianRupee,
      text: "Payment",
      id: "payment",
      path: "/payment",
    },
    {
      icon: Mail,
      text: "Mail Box",
      id: "mailBox",
      path: "/mailbox",
    },
    {
      icon: BookOpen,
      text: "Policies",
      id: "policies",
      path: "/policies",
    },
    {
      icon: BookOpen,
      text: "UserHistory",
      id: "userhistory",
      path: "/userhistory",
    },
    {
      icon: BookOpen,
      text: "FollowUp",
      id: "followup",
      path: "/followup",
    },
  ];
  const sidebarStyle = {
    wrapper: {
      display: 'flex',
      minHeight: '100vh',
    },
    sidebar: {
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100%',
      backgroundColor: '#1a1a1a',
      color: 'white',
      transition: 'all 0.3s',
      display: 'flex',
      flexDirection: 'column',
      width: isExpanded ? '250px' : '60px',
      marginTop: '50px',
    },
    header: {
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #333',
    },
    nav: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px',
    },
    menuItem: {
      width: '100%',
      padding: '10px',
      marginBottom: '4px',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'background-color 0.2s',
    },
    activeMenuItem: {
      backgroundColor: '#2563eb',
    },
    dropdownContent: {
      marginLeft: '16px',
      marginTop: '4px',
    },
    iconButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      padding: '6px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    dropdownItem: {
      width: '100%',
      padding: '8px 12px',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      textAlign: 'left',
      cursor: 'pointer',
      borderRadius: '4px',
    },
    main: {
      flex: 1,
      marginLeft: isExpanded ? '250px' : '60px',
      transition: 'margin-left 0.3s',
    },
    menuText: {
      flex: 1,
      textAlign: 'left',
    },
    chevron: {
      transform: 'rotate(0deg)',
      transition: 'transform 0.2s',
    },
    chevronRotated: {
      transform: 'rotate(180deg)',
    },
  };
  return (
    <div style={{ marginTop: '259px' }}>
      <div style={sidebarStyle.wrapper}  >
        <div style={sidebarStyle.sidebar}>
          {/* Header */}
          <div style={sidebarStyle.header}>
            {isExpanded && <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Dashboard</span>}
            <button
              style={sidebarStyle.iconButton}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {/* Main Menu */}
          <nav style={sidebarStyle.nav}>
            <div>
              {/* Dashboard Dropdown */}
              <div style={{
                backgroundColor: "#1c1c1c",
                color: "#fff",
                fontFamily: "Arial, sans-serif",
              }}
              >
                {/* <button
                  onClick={() => {
                    toggleDropdown("dashboard");
                    // handleItemClick("salesDashboard", );
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 15px",
                    backgroundColor: isDropdownOpen.leads ? "#333" : "#1c1c1c",
                    color: "#fff",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  
                  <i
                    class="bi bi-speedometer"
                    style={{ marginRight: "10px", fontSize: "20px" }}
                  ></i>
                  <span style={{ marginLeft: "10px" }}>Dashboard</span>
                  <i
                    className={`fas fa-chevron-${isDropdownOpen.dashboard ? "up" : "down"}`}
                    style={{ marginLeft: "auto", }}
                  ></i>
                </button> */}
                <div style={{
                  backgroundColor: "#2a2a2a",
                  maxHeight: isDropdownOpen.dashboard ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.5s ease",
                  transitionDelay: isDropdownOpen.dashboard ? "0.1s" : "0s",
                }}>
                  <button
                    onClick={() => handleItemClick("salesDashboard", "/salesdashboard")}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 15px",
                      backgroundColor: "#2a2a2a",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Sales Dashboard
                  </button>
                  <button
                    onClick={() => handleItemClick("callingDashboard", "/callingdashboard")}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 15px",
                      backgroundColor: "#2a2a2a",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Calling Dashboard
                  </button>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#1c1c1c",
                  color: "#fff",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {/* <button
                  onClick={() => toggleDropdown("leads")}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 15px",
                    backgroundColor: isDropdownOpen.leads ? "#333" : "#1c1c1c",
                    color: "#fff",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  <i
                    className="fas fa-briefcase"
                    style={{ marginRight: "10px", fontSize: "20px" }}
                  ></i>
                  <span style={{ marginLeft: "10px" }}>Leads</span>
                  <i
                    className={`fas fa-chevron-${isDropdownOpen.leads ? "up" : "down"}`}
                    style={{ marginLeft: "auto", }}
                  ></i>
                </button> */}
                <div
                  style={{
                    backgroundColor: "#2a2a2a",
                    maxHeight: isDropdownOpen.leads ? "500px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.5s ease",
                    transitionDelay: isDropdownOpen.leads ? " max-height 0.8s ease" : "0s",
                  }}
                >
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 15px",
                      backgroundColor: "#2a2a2a",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                    onClick={() => handleItemClick("leadsPage", "/addleads")}
                  >
                    Add Leads
                  </button>
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 15px",
                      backgroundColor: "#2a2a2a",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                    onClick={() => handleItemClick("leadDetails", "/viewleads")}
                  >
                    View Leads
                  </button>
                  <button
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 15px",
                      backgroundColor: "#2a2a2a",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                    onClick={() => handleItemClick("leadsUpload", "/uploadleads")}
                  >
                    Upload Leads
                  </button>
                  {/* <button
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 15px",
                      backgroundColor: "#2a2a2a",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                    onClick={() =>
                      handleItemClick("leadsViewMarketing", "/viewmarketingleads")
                    }
                  >
                    View Marketing Leads
                  </button> */}
                </div>
              </div>
              {/* Other Menu Items */}
              {mainMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id, item.path)}
                  style={{
                    ...sidebarStyle.menuItem,
                    ...(activeItem === item.id ? sidebarStyle.activeMenuItem : {}),
                  }}
                >
                  <item.icon size={20} />
                  {isExpanded && <span style={sidebarStyle.menuText}>{item.text}</span>}
                </button>
              ))}
            </div>
          </nav>
        </div>
        {/* Main Content Spacer */}
        <div style={sidebarStyle.main}>
          {/* Your main content goes here */}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;