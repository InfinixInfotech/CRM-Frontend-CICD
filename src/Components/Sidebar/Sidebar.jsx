import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users, PenLine, FileText, IndianRupee, Mail, BookOpen, ChevronDown } from 'lucide-react';

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
    // {
    //   icon: PenLine,
    //   text: "salesdashboard",
    //   id: "salesdashboard",
    //   path: "/salesdashboard",
    // },
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
    <div style={{marginTop:'259px'}}>
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
            <div style={{ marginBottom: '8px' }}>
              <button
               onClick={() => {
                toggleDropdown("dashboard");
                handleItemClick("salesDashboard", "/salesdashboard");
              }}
                style={{
                  ...sidebarStyle.menuItem,
                  ...(activeItem === "dashboard" || isDropdownOpen.dashboard ? sidebarStyle.activeMenuItem : {}),
                }}
              >
                <LayoutDashboard size={20} />
                {isExpanded && (
                  <>
                    <span style={sidebarStyle.menuText}>Dashboard</span>
                    <ChevronDown
                      size={16}
                      style={{
                        ...sidebarStyle.chevron,
                        ...(isDropdownOpen.dashboard ? sidebarStyle.chevronRotated : {}),
                      }}
                    />
                  </>
                )}
              </button>
              {isExpanded && isDropdownOpen.dashboard && (
                <div style={sidebarStyle.dropdownContent}>
                  <button
                    onClick={() => handleItemClick("salesDashboard", "/salesdashboard")}
                    style={{
                      ...sidebarStyle.dropdownItem,
                      ...(activeItem === "salesDashboard" ? sidebarStyle.activeMenuItem : {}),
                    }}
                  >
                    Sales Dashboard
                  </button>
                  <button
                    onClick={() => handleItemClick("callingDashboard", "/callingdashboard")}
                    style={{
                      ...sidebarStyle.dropdownItem,
                      ...(activeItem === "callingDashboard" ? sidebarStyle.activeMenuItem : {}),
                    }}
                  >
                    Calling Dashboard
                  </button>
                </div>
              )}
            </div>

            {/* Leads Dropdown */}
            <div style={{ marginBottom: '8px' }}>
              <button
                onClick={() => toggleDropdown("leads")}
                style={{
                  ...sidebarStyle.menuItem,
                  ...(activeItem === "leads" || isDropdownOpen.leads ? sidebarStyle.activeMenuItem : {}),
                }}
              >
                <Users size={20} />
                {isExpanded && (
                  <>
                    <span style={sidebarStyle.menuText}>Leads</span>
                    <ChevronDown
                      size={16}
                      style={{
                        ...sidebarStyle.chevron,
                        ...(isDropdownOpen.leads ? sidebarStyle.chevronRotated : {}),
                      }}
                    />
                  </>
                )}
              </button>
              {isExpanded && isDropdownOpen.leads && (
                <div style={sidebarStyle.dropdownContent}>
                  <button
                    onClick={() => handleItemClick("leadsPage", "/addleads")}
                    style={{
                      ...sidebarStyle.dropdownItem,
                      ...(activeItem === "leadsPage" ? sidebarStyle.activeMenuItem : {}),
                    }}
                  >
                    Add Leads
                  </button>
                  <button
                    onClick={() => handleItemClick("leadDetails", "/viewleads")}
                    style={{
                      ...sidebarStyle.dropdownItem,
                      ...(activeItem === "leadDetails" ? sidebarStyle.activeMenuItem : {}),
                    }}
                  >
                    View Leads
                  </button>
                  <button
                    onClick={() => handleItemClick("leadsUpload", "/uploadleads")}
                    style={{
                      ...sidebarStyle.dropdownItem,
                      ...(activeItem === "leadsUpload" ? sidebarStyle.activeMenuItem : {}),
                    }}
                  >
                    Upload Leads
                  </button>
                  <button
                    onClick={() => handleItemClick("leadsViewMarketing", "/viewmarketingleads")}
                    style={{
                      ...sidebarStyle.dropdownItem,
                      ...(activeItem === "leadsViewMarketing" ? sidebarStyle.activeMenuItem : {}),
                    }}
                  >
                    View Marketing Leads
                  </button>
                </div>
              )}
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