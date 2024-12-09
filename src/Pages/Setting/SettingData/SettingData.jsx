import React, { useState } from "react";
import BackButton from "../../../Components/Button/BackButton/BackButton";

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
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Settings
      </h2>
      <BackButton />
      <div  className="container-fluid border border-2 border-gray mt-2 py-3"
        style={{ padding: "18px 16px" }}>
      <div
        className="container"
        style={{
          maxWidth: "100%",
          padding: "20px",
          background: "rgb(227,227,227)",
          border: "2px solid grey" ,
          borderRadius: "5px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <form>
          <div className="form-group">
            <label htmlFor="title" className="form-label fw-bold">
              Title
            </label>
            <input
              style={{fontSize:"14px"}}
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
            style={{fontSize:"14px"}}
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
            style={{fontSize:"14px"}}
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
            style={{fontSize:"14px"}}
              type="text"
              id="liveUpdates"
              name="liveUpdates"
              className="form-control"
              value={settings.liveUpdates}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-primary px-2 py-2"
            
            >
              CRM Payment
            </button>
            <button
              type="button"
              className="btn btn-success px-2 py-1"
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
