import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users, CalendarCheck, Settings,History , ShieldCheck ,FileText, IndianRupee, Mail, BookOpen, UserPlus, Eye, Upload } from 'lucide-react';
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

  const mainMenuItems = [
    { icon: LayoutDashboard, text: "Sales Dashboard", id: "salesdashboard", path: "/salesdashboard" },
    ...(storedUsername && ["admin", "Admin", "ADMIN"].includes(storedUsername) ?
      [{ icon: UserPlus, text: "Add Leads", id: "addleads", path: "/addleads" }] : []),
    { icon: Eye, text: "View Leads", id: "viewleads", path: "/viewleads" },
    ...(storedUsername && ["admin", "Admin", "ADMIN"].includes(storedUsername) ?
      [{ icon: Upload, text: "Upload Leads", id: "uploadleads", path: "/uploadleads" }] : []),
    { icon: FileText, text: "Sales Order", id: "salesorder", path: "/salesorder" },
    { icon: IndianRupee, text: "Payment", id: "payment", path: "/payment" },
    // { icon: Mail, text: "Mail Box", id: "mailBox", path: "/mailbox" },
    { icon: ShieldCheck, text: "Policies", id: "policies", path: "/policies" },
    { icon: History, text: "User History", id: "userhistory", path: "/userhistory" },
    { icon: CalendarCheck , text: "FollowUp", id: "followup", path: "/followup" },
    { icon: CalendarCheck , text: "Paid clients", id: "paidclients", path: "/paidclients" },
  ];

  return (
    <div style={{ marginTop: '259px' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <aside style={{ position: 'fixed', left: 0, top: 0, height: '100%', backgroundColor: '#1a1a1a', color: 'white', transition: 'all 0.3s', width: isExpanded ? '250px' : '60px', marginTop: '50px' }}>
          <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333' }}>
            {isExpanded && <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Dashboard</span>}
            <button style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {mainMenuItems.map((item) => (
                <li key={item.id} style={{ marginBottom: '4px' }}>
                  <button onClick={() => handleItemClick(item.id, item.path)} style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: activeItem === item.id ? '#2563eb' : 'transparent', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                    <item.icon size={20} />
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
                      backgroundColor: activeItem === "settings" ? '#2563eb' : 'transparent',
                      border: 'none',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleItemClick("settings", "/settingdashboard")}
                    title="Settings"
                  >
                    <Settings size={20} />
                    {isExpanded && <span>Setting</span>}
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </aside>
        <main style={{ flex: 1, marginLeft: isExpanded ? '250px' : '60px', transition: 'margin-left 0.3s' }}>
          {/* Main content goes here */}
        </main>
      </div>
    </div>
  );
};

// export default Sidebar;


export default Sidebar;
