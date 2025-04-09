import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users, CalendarCheck, Settings, History, ShieldCheck, FileText, IndianRupee, Mail, BookOpen, UserPlus, Eye, Upload, BrainCircuit, Monitor } from 'lucide-react';

// import { username } from '../../Redux/Services/apiServer/ApiServer';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem("userName"); // Get username from localStorage

  const handleItemClick = (itemName, path) => {
    setActiveItem(itemName);
    navigate(path);
  };

  const handleMenuClick = () => {
    window.location.reload(); 
  };


  const mainMenuItems = [
    { icon: LayoutDashboard, text: "Sales Dashboard", id: "salesdashboard", path: "/salesdashboard" },
    // ...(storedUsername && ["admin", "Admin", "ADMIN"].includes(storedUsername) ?
    //   [{ icon: UserPlus, text: "Add Leads", id: "addleads", path: "/addleads" }] : []),
    { icon: Eye, text: "View Leads", id: "viewleads", path: "/viewleads" },
    { icon: CalendarCheck, text: "FollowUp", id: "followup", path: "/followup" },
    { icon: IndianRupee, text: "Payment", id: "payment", path: "/payment" },

    // ...(storedUsername && ["admin", "Admin", "ADMIN"].includes(storedUsername) ?
    //   [{ icon: Upload, text: "Upload Leads", id: "uploadleads", path: "/uploadleads" }] : []),
    { icon: FileText, text: "Sales Order", id: "salesorder", path: "/salesorder" },
    { icon: CalendarCheck, text: "Paid clients", id: "paidclients", path: "/paidclients" },
    // { icon: ShieldCheck, text: "Policies", id: "policies", path: "/policies" },
    { icon: History, text: "User History", id: "userhistory", path: "/userhistory" },
    { icon: BrainCircuit, text: "NixBot", id: "aiassistant", path: "/aiassistant" },
    { icon: Monitor, text: "Monitoring", id: "monitoring", path: "/monitoring" },
    { icon: Monitor, text: "CallingReport", id: "callingreport", path: "/callingreport" },

  ];
  // <Monitor className="me-2 fs-1" />



  return (
    <div style={{ marginTop: '159px' }}>
      <div style={{ display: 'flex', minHeight: '70vh' }}>
        <aside
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100%',
            backgroundColor: '#2c3e50', // Old CRM muted dark blue
            color: '#ecf0f1', // Light gray text
            transition: 'all 0.3s',
            maxWidth: isExpanded ? '175px' : '60px',
            marginTop: '82px',
          }}
        >
          <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #34495e' }}>
            {isExpanded && <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Dashboard</span>}
            <button
              style={{ backgroundColor: 'transparent', border: 'none', color: '#ecf0f1', cursor: 'pointer' }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {mainMenuItems.map((item) => (
                <li key={item.id} style={{ marginBottom: '4px' }}>
                  <button
                    onClick={() => handleItemClick(item.id, item.path)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: activeItem === item.id ? 'black' : 'transparent', 
                      border: 'none',
                      color: '#ecf0f1',
                      //borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      transition: 'background 0.2s ease-in-out',
                      ':hover': {
                        backgroundColor: '#95a5a6',
                        color: 'black',
                      },
                    }}
                  >
                    <item.icon size={18} />
                    {isExpanded && <span>{item.text}</span>}
                  </button>
                </li>
              ))}
  
              {storedUsername && ["admin", "Admin", "ADMIN"].includes(storedUsername) && (
                <li>
                  <button
                    style={{
                      width: '100%',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: activeItem === "settings" ? 'black' : 'transparent',
                      border: 'none',
                      color: '#ecf0f1',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      transition: 'background 0.2s ease-in-out',
                      ':hover': {
                        backgroundColor: '#95a5a6',
                      },
                    }}
                    onClick={() => handleItemClick("settings", "/settingdashboard")}
                    title="Settings"
                  >
                    <Settings size={18} />
                    {isExpanded && <span>Setting</span>}
                  </button>
                </li>
              )}
            </ul>
  
            <div style={{ marginTop: "3vh" }}></div>
          </nav>
        </aside>
  
        <main style={{ flex: 1, marginLeft: isExpanded ? '155px' : '60px', transition: 'margin-left 0.3s' }}>
        </main>
      </div>
    </div>
  );
  
};

// export default Sidebar;


export default Sidebar;
