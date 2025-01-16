import React, { useState } from "react";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { FaCog } from "react-icons/fa";

const SettingData = () => {
  const [settings, setSettings] = useState({
    title: "INFINIX INFOTECH PVT LTD",
    name: "INFINIX INFOTECH PVT LTD",
    notifications: "WELCOME TO INFINIX INFOTECH PVT LTD",
    liveUpdates: "WELCOME TO INFINIX INFOTECH PVT LTD",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    console.log("Updated settings:", settings);
    alert("Settings updated successfully!");
  };

  return (
    <>
      <section
        style={{
          position: "relative",
          // padding: "12px 30px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          marginBottom: "0px", // Uncomment and fix if needed
          marginBottom: "5px", // Uncomment and fix if needed
        }}
        className="mt-2"
      >
        <h2
          className="mb-0 mt-5 mb-2"
          style={{
            padding: "18px 16px",
            fontSize: "30px",
            color: "#2D2D2D",
            // backgroundColor: "#E3E3E3",
          }}
        >
          <FaCog
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Settings
        </h2>
      </section>

      <BackButton />
      <div
        className=" mt-3"
      >
        <div
          className=" border border-2 border-grey"
          style={{
            maxWidth: "100%",
            padding: "20px",
            backgroundColor: "#E8F1F3",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <form>
            <div className="form-group">
              <label htmlFor="title" className="form-label fw-bold">
                Title
              </label>
              <input
                style={{ fontSize: "14px" }}
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={settings.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="name" className="form-label fw-bold">
                Name
              </label>
              <input
                style={{ fontSize: "14px" }}
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={settings.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="notifications" className="form-label fw-bold">
                Notifications
              </label>
              <input
                style={{ fontSize: "14px" }}
                type="text"
                id="notifications"
                name="notifications"
                className="form-control"
                value={settings.notifications}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="liveUpdates" className="form-label fw-bold">
                Live Updates
              </label>
              <input
                style={{ fontSize: "14px" }}
                type="text"
                id="liveUpdates"
                name="liveUpdates"
                className="form-control"
                value={settings.liveUpdates}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn px-2 py-2 text-white" style={{backgroundColor:"#009688"}}>
                CRM Payment
              </button>
              <button
                type="button"
                className="btn px-2 py-1 text-white"
                style={{backgroundColor:"#009688"}}
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingData;
