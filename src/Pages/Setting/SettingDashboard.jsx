import React from "react";
import NavigationButton from "../../Components/Button/NavigateButton/NavigationButton";
import { FaCog } from "react-icons/fa";

export default function SettingDashboard() {
  return (
    <div className=" mt-5 " style={{ width: "100%" }}>
      <section
        style={{
          position: "relative",
          textAlign: "center",
          background: "#2c3e50",

          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          marginBottom: "0px",
          marginBottom: "5px",
        }}
        className="mt-2"
      >
        <h2
          className="mb-0 mt-5 mb-2"
          style={{
            padding: "18px 16px",
            fontSize: "30px",
            color: "white",
          }}
        >
          <FaCog
            className="fs-1"
            style={{ marginRight: "8px", color: "white" }}
          />
          Setting Dashboard
        </h2>
      </section>

      <div className="w-100 mt-4 px-4">
        {/* Grid container */}
        <div
          className="row g-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Card design for each NavigationButton */}
          {[
            { label: "Users", to: "/viewuser", icon: "fas fa-user" },
            // { label: "Add Groups", to: "/addgroups", icon: "fas fa-users "  },
            { label: "Groups", to: "/viewgroups", icon: "fas fa-eye" },
            {
              label: "Lead Status",
              to: "/leadstatus",
              icon: "fas fa-chart-line",
            },
            { label: "Department", to: "/department", icon: "fas fa-building" },
            {
              label: "Designation",
              to: "/designation",
              icon: "fas fa-id-badge",
            },
            // { label: "Lead Source", to: "/leadsource", icon: "fas fa-source" },
            {
              label: "Qualification",
              to: "/qualification",
              icon: "fas fa-graduation-cap",
            },
            {
              label: "UploadLeads",
              to: "/uploadleads",
              icon: "fas fa-upload",
            },
            // {
            //   label: "Segment Plans",
            //   to: "/segmentplans",
            //   icon: "fas fa-layer-group",
            // },
            // { label: "Setting Data", to: "/settingdata", icon: "fas fa-cog" },
            // { label: "Add User", to: "/adduser", icon: "fas fa-user-plus" },
            // {
            //   label: "User Operation",
            //   to: "/useroperation",
            //   icon: "fas fa-tools",
            // },
            // {
            //   label: "Sip Trunck",
            //   to: "/siptrunck",
            //   icon: "fas fa-network-wired",
            // },
            // { label: "Segment List", to: "/segmentlist", icon: "fas fa-list" },
            // { label: "Upload Images", to: "/uploadimages", icon: "fas fa-upload" },
            // { label: "Upload  Polycies", to: "/uploadPolicy", icon: "fas fa-upload" },
            { label: "Pool Access", to: "/poolaccess", icon: "fas fa-key" },
            { label: "Lead Info", to: "/leadinfo", icon: "fas fa-info-circle" }

          ].map((item, index) => (
            <div
              key={index}
              className="card text-center shadow-sm bg-light border"
              style={{
                borderRadius: "10px",
                transition:
                  "transform 0.2s, box-shadow 0.2s, background-color 0.2s",
                border: "1px solid #ccc",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.backgroundColor = "#2f2f2f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 1px 5px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.backgroundColor = "#f8f9fa";
              }}
            >
              <div className="card-body d-flex flex-column align-items-center">
                <i
                  className={`${item.icon} mb-3 `}
                  style={{ fontSize: "24px", color: "#2c3e50" }}
                ></i>
                <h5 className="card-title text-dark">{item.label}</h5>
                <NavigationButton label="Explore" to={item.to} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
