import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postUploadBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import "./UploadLeads.css";
import { Alert } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";

const UploadLeads = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    campaignName: "INF26DEC2024",
    file: null,
    segmentName: "gold",
    leadSource: "freshpool",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      const file = files[0];
      if (file) {
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
    setShowAlert(true);

    if (
      !formData.campaignName ||
      !formData.file ||
      !formData.segmentName ||
      !formData.leadSource
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const Data = new FormData();
    Data.append("CampaignName", formData.campaignName);
    Data.append("LeadSourceName", formData.leadSource);
    Data.append("SegmentName", formData.segmentName);
    Data.append("CsvLeadFile", formData.file);

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
      <section
        style={{
          position: "relative",
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
          <FaUpload
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Leads
        </h2>
      </section>

      <div className="container mt-3 w-50">
        
        <div className="innerBox rounded mt-2 mb-2 border border-2">
        <h5
          className="text-dark border border-1  p-3"
          style={{
            // padding: "18px 16px",
            fontSize: "1.7 rem",
            backgroundColor: "#E8F1F3",
          }}
        >
          {/* <BackButton to="/payment" /> */}
          Upload Leads
        </h5>
          <div
            className="container-fluid mt-3 me-0 ms-0"
            style={{ fontSize: "14px" }}
          >
            <div>
              {showAlert && (
                <Alert variant="info" className="mt-2 text-center">
                  Leads Added Successfully
                </Alert>
              )}
            </div>
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
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Diamond">Diamond</option>
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
                  className="btn btn-sm mb-2 text-white px-4 fs-6 border border-0 "
                  style={{ backgroundColor: "#009688" }}
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
