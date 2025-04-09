import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postUploadBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import "./UploadLeads.css";
import { Alert } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { HashLoader } from "react-spinners";

const UploadLeads = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("info"); // "success" or "danger"

  const [formData, setFormData] = useState({
    campaignName: "",
    file: null,
    segmentName: "",
    LeadSourceName: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.campaignName ||
      !formData.file ||
      !formData.segmentName ||
      !formData.LeadSourceName
    ) {
      setAlertMessage("Please fill in all fields.");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    const Data = new FormData();
    Data.append("CampaignName", formData.campaignName);
    Data.append("LeadSourceName", formData.LeadSourceName);
    Data.append("SegmentName", formData.segmentName);
    Data.append("CsvLeadFile", formData.file);

    try {
      setLoading(true)
      const response = await dispatch(postUploadBulkLeadThunk(Data)).unwrap();
      if (response.success) {
        setAlertMessage("Leads Added Successfully");
        setAlertVariant("success");
      } else {
        setAlertMessage(response.message || "Something went wrong!");
        setAlertVariant("danger");
      }
    } catch (error) {
      setAlertMessage( "Campaign Name Already Exist. Please try again!");
      setAlertVariant("danger");
    }
    setShowAlert(true);
    setLoading(false);
  };

  return (
    <>
      <section
        style={{
          position: "relative",
          background: "#2c3e50",
          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          marginBottom: "5px",
        }}
        className="mt-2"
      >
        <h2
          className="mb-0 mt-5 mb-2"
          style={{
            padding: "8px 10px",
            fontSize: "28px",
            color: "white",
          }}
        >
          <FaUpload className="fs-2" style={{ marginRight: "8px", color: "white" }} />
          Leads
        </h2>
      </section>

      <div className="container mt-3 w-50">
        <div className="innerBox rounded mt-2 mb-2 border border-2">
          <h5
            className="text-dark border border-1 p-3"
            style={{ fontSize: "1.7 rem", backgroundColor: "#E8F1F3" }}
          >
            Upload Leads
          </h5>
          <div className="container-fluid mt-3 me-0 ms-0" style={{ fontSize: "14px" }}>
          <div>
            {loading &&  (
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 9999,
                  backgroundColor: "transparent",
                }}
              >
                <HashLoader color="#0060f1" size={50} />
              </div>
         )}  
          </div>
            {showAlert && (
              <Alert variant={alertVariant} className="mt-2 text-center">
                {alertMessage}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Campaign Name</label>
                <input
                  type="text"
                  className="form-control input-box"
                  name="campaignName"
                  value={formData.campaignName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Select File</label>
                <input
                  type="file"
                  className="form-control input-box"
                  name="file"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Segment Name</label>
                <select
                  className="form-select input-box"
                  name="segmentName"
                  value={formData.segmentName}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    --Select Segment--
                  </option>
                  <option value="Index Option">Index Option</option>
                    <option value="Index Future">Index Future</option>
                    <option value="Stock Option">Stock Option</option>
                    <option value="Stock Future">Stock Future</option>
                    <option value="Stock Cash">Stock Cash</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Lead Source</label>
                <select
                  className="form-select input-box"
                  name="LeadSourceName"
                  value={formData.LeadSourceName}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    --Select Lead Source--
                  </option>
                  <option value="Additional Pool">Additional Pool</option>
                  <option value="Fresh Pool">Fresh Pool</option>
                  <option value="Additional Pool">Additional Pool</option>
                  <option value="Diamond Pool">Diamond Pool</option>
                  <option value="Platinum Pool">Platinum Pool</option>
                  <option value="HNI Pool">HNI Pool</option>
                  <option value="Webleads Pool">Webleads</option>
                  <option value="Dispose Pool">Dispose Pool</option>
                </select>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-sm mb-2 text-white px-4 fs-6 border border-0"
                  style={{ backgroundColor: "#2c3e50" }}
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
