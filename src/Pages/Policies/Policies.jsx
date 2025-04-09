import React from "react";
import NavigationButton from "../../Components/Button/NavigateButton/NavigationButton";
import { FiFileText } from "react-icons/fi";

export default function Policies() {
  return (
    <div className="mt-5" style={{ width: "100%" }}>
      {/* Header Section */}
      <section
        style={{
          position: "relative",
          textAlign: "center",
          background: "#2c3e50",
          borderBottom: "1px solid #E1E6EF",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          paddingBottom: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px", // Adjust height as needed
        }}
        className="mt-2"
      >
        <h2
          className="mb-0 mt-0 text-white"
          style={{
            fontSize: "2rem", // Responsive font size
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FiFileText
            className="fs-1"
            style={{ marginRight: "8px", color: "#fff" }}
          />
          Our Policies
        </h2>
      </section>

      {/* Card Grid Section */}
      <div className="w-100 mt-4 px-4">
        <div className="row g-4">
          {[
            { label: "HR Policy", to: "/hrpolicy", icon: "fas fa-file-alt" },
            { label: "Incentive Plans", to: "/incentiveplans", icon: "fas fa-chart-line" },
            { label: "Leave Policy", to: "/leavepolicy", icon: "fas fa-calendar-alt" },
            { label: "Probation", to: "/probation", icon: "fas fa-user-clock" },
          ].map((item, index) => (
            <div
              key={index}
              className="col-12 col-md-6 col-lg-3" // Responsive grid classes
            >
              <div
                className="card text-center shadow-lg bg-light border rounded-3"
                style={{
                  transition: "all 0.4s ease",
                  overflow: "hidden",
                  position: "relative",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                }}
              >
                {/* Front of the Card */}
                <div
                  className="card-body d-flex flex-column align-items-center"
                  style={{
                    background: `linear-gradient(135deg, #ffffff, #f1f1f1)`,
                    padding: "20px",
                  }}
                >
                  <i
                    className={`${item.icon} mb-3`}
                    style={{
                      fontSize: "2rem", // Responsive icon size
                      color: "#2c3e50",
                      transition: "color 0.3s ease",
                    }}
                  ></i>
                  <h5
                    className="card-title text-dark"
                    style={{
                      fontSize: "1.25rem", // Responsive font size
                      fontWeight: "500",
                      marginBottom: "15px",
                    }}
                  >
                    {item.label}
                  </h5>
                  <NavigationButton label="Explore" to={item.to} />
                </div>

                {/* Back of the Card */}
                <div
                  className="card-body d-flex flex-column align-items-center"
                  style={{
                    backgroundColor: "#2c3e50",
                    color: "#fff",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    transition: "transform 0.5s ease",
                  }}
                >
                  <h5>Click to Explore</h5>
                  <p>Discover more about {item.label} policies</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
