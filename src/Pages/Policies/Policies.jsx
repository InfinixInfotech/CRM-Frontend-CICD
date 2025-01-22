import React from "react";
import NavigationButton from "../../Components/Button/NavigateButton/NavigationButton";
import { FiFileText } from "react-icons/fi";

export default function Policies() {
  return (
    <div className=" mt-5 " style={{ width: "100%" }}>
      <section
        style={{
          position: "relative",
          textAlign: "center",
          backgroundColor: "#fff",
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
            color: "#2D2D2D",
          }}
        >
          <FiFileText
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Our Policies
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
            { label: "HR Policy", to: "/hrpolicy", icon: "fas fa-file-alt" },
            { label: "Incentive Plans", to: "/incentiveplans", icon: "fas fa-chart-line" },
            { label: "Leave Policy", to: "/leavepolicy", icon: "fas fa-calendar-alt" },
            { label: "Probation", to: "/probation", icon: "fas fa-user-clock" },
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
                  style={{ fontSize: "24px", color: "#009688" }}
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
