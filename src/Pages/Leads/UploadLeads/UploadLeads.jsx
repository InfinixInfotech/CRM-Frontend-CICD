import React, { useState } from "react";

const UploadLeads = () => {
  const [formData, setFormData] = useState({
    campaignName: "",
    file: null,
    includeHeader: true,
    assignedTo: "Fresh Pool",
    leadSource: "Fresh Pool",
    overwrite: false,
    flushData: false,
    flushTimeline: false,
    leadStatus: "None",
    mobileColumn: 0,
    nameColumn: 0,
    emailColumn: 0,
    cityColumn: 0,
    stateColumn: 0,
    investmentColumn: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Handle form submission logic here
  };

  return (
  <>
    <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-0">
    Upload Leads
      </h2>
    <div className="container-fluid border border-2 border-gray mt-1  w-50">
    <div className="container-fluid  rounded mt-2 mb-2" style={{width:"100%" , background:"rgb(227,227,227)" , border :"2px solid grey"}}>
    <div className="container-fluid mt-3 me-0 ms-0" style={{fontSize:"14px"}}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Campaign Name</label>
          <input
            type="text"
            className="form-control"
            name="campaignName"
            value={formData.campaignName}
            onChange={handleChange}
            style={{
              height: "28px",
              fontSize: "14px",
              padding: "0px 32px 0px 8px", // Space for the arrow
              lineHeight: "28px",
              appearance: "none", // Hide default arrow
              background: `white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%236c757d' d='M0 0l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 8px center`,
              backgroundSize: "10px 6px", // Adjust arrow size
              border: "1px solid #ced4da", // Optional: match the theme
              borderRadius: "4px", // Optional: rounded corners
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select File</label>
          <input
            type="file"
            className="form-control"
            name="file"
            onChange={handleChange}
            style={{
              height: "28px",
              fontSize: "14px",
              padding: "0px 32px 0px 8px", // Space for the arrow
              lineHeight: "28px",
              appearance: "none", // Hide default arrow
              background: `white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%236c757d' d='M0 0l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 8px center`,
              backgroundSize: "10px 6px", // Adjust arrow size
              border: "1px solid #ced4da", // Optional: match the theme
              borderRadius: "4px", // Optional: rounded corners
            }}
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="includeHeader"
            checked={formData.includeHeader}
            onChange={handleChange}
          />
          <label className="form-check-label">Include Header</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Assigned To</label>
          <select
            className="form-select"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            style={{
              height: "28px",
              fontSize: "14px",
              padding: "0px 32px 0px 8px", // Space for the arrow
              lineHeight: "28px",
              appearance: "none", // Hide default arrow
              background: `white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%236c757d' d='M0 0l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 8px center`,
              backgroundSize: "10px 6px", // Adjust arrow size
              border: "1px solid #ced4da", // Optional: match the theme
              borderRadius: "4px", // Optional: rounded corners
            }}
          >
            <option value="Fresh Pool">Fresh Pool</option>
            {/* Add more options here if needed */}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Lead Source</label>
          <select
            className="form-select"
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            style={{
              height: "28px",
              fontSize: "14px",
              padding: "0px 32px 0px 8px", // Space for the arrow
              lineHeight: "28px",
              appearance: "none", // Hide default arrow
              background: `white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%236c757d' d='M0 0l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 8px center`,
              backgroundSize: "10px 6px", // Adjust arrow size
              border: "1px solid #ced4da", // Optional: match the theme
              borderRadius: "4px", // Optional: rounded corners
            }}
          >
            <option value="Fresh Pool">Fresh Pool</option>
            {/* Add more options here if needed */}
          </select>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="overwrite"
            checked={formData.overwrite}
            onChange={handleChange}
          />
          <label className="form-check-label">Overwrite</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Flush</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="flushData"
              checked={formData.flushData}
              onChange={handleChange}
            />
            <label className="form-check-label">Flush Data</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="flushTimeline"
              checked={formData.flushTimeline}
              onChange={handleChange}
            />
            <label className="form-check-label">Flush Timeline</label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Lead Status</label>
          <select
            className="form-select"
            name="leadStatus"
            value={formData.leadStatus}
            onChange={handleChange}
            style={{
              height: "28px",
              fontSize: "14px",
              padding: "0px 32px 0px 8px", // Space for the arrow
              lineHeight: "28px",
              appearance: "none", // Hide default arrow
              background: `white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%236c757d' d='M0 0l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 8px center`,
              backgroundSize: "10px 6px", // Adjust arrow size
              border: "1px solid #ced4da", // Optional: match the theme
              borderRadius: "4px", // Optional: rounded corners
            }}
          >
            <option value="None">None</option>
            {/* Add more options here if needed */}
          </select>
        </div>

        {["Mobile", "Name", "Email", "City", "State", "Investment"].map(
          (field, index) => (
            <div className="mb-3" key={index}>
              <label className="form-label">{field} Column Number</label>
              <input
                type="number"
                className="form-control"
                name={`${field.toLowerCase()}Column`}
                value={formData[`${field.toLowerCase()}Column`]}
                onChange={handleChange}
                style={{
                  height: "28px",
                  fontSize: "14px",
                  padding: "0px 32px 0px 8px", // Space for the arrow
                  lineHeight: "28px",
                  appearance: "none", // Hide default arrow
                  background: `white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%236c757d' d='M0 0l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 8px center`,
                  backgroundSize: "10px 6px", // Adjust arrow size
                  border: "1px solid #ced4da", // Optional: match the theme
                  borderRadius: "4px", // Optional: rounded corners
                }}
              />
            </div>
          )
        )}  

        <div className="d-flex justify-content-center"><button type="submit" className="btn btn-primary mb-2 border  border-0 bg-secondary">
          Submit
        </button></div>
      </form>
    </div>
    </div>
    </div>
  </>
  );
};

export default UploadLeads;
