import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postUploadBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import "./UploadLeads.css";

const UploadLeads = () => {
  const [formData, setFormData] = useState({
    campaignName: "harsh ",
    file: null,
    segmentName: "gold",
    leadSource: "freshpool",
  });

  const dispatch = useDispatch();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "file") {
      const file = files[0];
      if (file) {
        // Validate file type to allow only CSV files
        const validFileTypes = ["text/csv"];
        if (!validFileTypes.includes(file.type)) {
          alert("Invalid file type! Please upload a CSV file.");
          return;
        }
        setFormData((prevData) => ({ ...prevData, [name]: file }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.campaignName || !formData.file || !formData.segmentName || !formData.leadSource) {
      alert("Please fill in all fields.");
      return;
    }
  
    const Data = new FormData();
    Data.append('CampaignName', formData.campaignName);
    Data.append('LeadSourceName', formData.leadSource);
    Data.append('SegmentName', formData.segmentName);
    Data.append('CsvLeadFile', formData.file);
  
    // Assuming you are using a POST method that accepts FormData
    dispatch(postUploadBulkLeadThunk(Data))
      .then((response) => {
        console.log("File uploaded successfully:", response);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };
  
  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-0">
        Upload Leads
      </h2>
      <div className="container-fluid border border-2 border-gray mt-3 w-50">
        <div className="innerBox container-fluid rounded mt-2 mb-2">
          <div
            className="container-fluid mt-3 me-0 ms-0"
            style={{ fontSize: "14px" }}
          >
            <form onSubmit={handleSubmit}>
              {/* Campaign Name */}
              <div className="mb-3">
                <label className="form-label">Campaign Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="campaignName"
                  value={formData.campaignName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* File Input */}
              <div className="mb-3">
                <label className="form-label">Select File</label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Segment Name */}
              <div className="mb-3">
                <label className="form-label">Segment Name</label>
                <select
                  className="form-select"
                  name="segmentName"
                  value={formData.segmentName}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    --Select Segment--
                  </option>
                  <option value="Fresh Pool">Gold</option>
                  <option value="Fresh Pool 2">Silver</option>
                  <option value="Fresh Pool 3">Diamond</option>
                </select>
              </div>

              {/* Lead Source */}
              <div className="mb-3">
                <label className="form-label">Lead Source</label>
                <select
                  className="form-select"
                  name="leadSource"
                  value={formData.leadSource}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    --Select Lead Source--
                  </option>
                  <option value="Source 1">Source 1</option>
                  <option value="Source 2">Source 2</option>
                  <option value="Source 3">Source 3</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 border border-0 bg-secondary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadLeads;
