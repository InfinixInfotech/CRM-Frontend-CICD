import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { emp, staticToken } from "../../Redux/Services/apiServer/ApiServer";
import { Alert } from "react-bootstrap";
import BackButton from "../../Components/Button/BackButton/BackButton";
import { useLocation, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
const InsertSalesOrder = () => {
  const { state } = useLocation();
  const SoData = state?.paymentObj;
  const lead = SoData;
  const userName = localStorage.getItem("username");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  // console.log("lead.employeeName----------", lead);
  const [formData, setFormData] = useState({
    employeeCode: emp,
    employeeName: userName,
    soId: lead.soId,
    so: lead.so,
    leadId: lead.leadId,
    prId: lead?.prId || "string",
    personalDetails: {
      createdDate: lead.createdDate,
      clientName: lead.clientDetails.name,
      fatherName: lead.clientDetails.fatherName,
      motherName: lead.clientDetails.motherName,
      mobile: lead.clientDetails.mobile,
      email: lead.clientDetails.email,
      dob: lead.clientDetails.dob,
      address: {
        city: lead.paymentDetails.city,
        state: lead.paymentDetails.state,
        pinCode: lead.pinCode,
      },
      aadhar: lead.aadhar,
      panNo: lead.paymentDetails.panNo,
      gstin: lead.gstin,
      sac: lead.sac,
    },
    paymentDetails: {
      paymentDate: lead.paymentDetails.paymentDate,
      modeOfPayment: lead.paymentDetails.modeOfPayment,
      bankName: lead.paymentDetails.bankName,
      paymentGateway: lead.paymentGateway,
      serviceMode: lead.serviceMode,
      terms: lead.terms,
      paymentIdOrRefNo: lead.paymentIdOrRefNo,
      serviceStatus: lead.serviceStatus,
    },
    businessDetails: {
      businessType: lead.businessType,
      comment: lead.comment,
    },
    productDetails: [
      {
        product: lead.product,
        startDate: lead.startDate,
        endDate: lead.endDate,
        grandTotal: 0,
        remaining: 0,
        discount: 0,
        adjustment: 0,
      },
    ],
  });
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false); // Hide the alert after 3000ms
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [showAlert]);
  //!<---------------------------------------------------------------------------------HANDLE CHANGE---------------------------------------------------------------------->
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check for array pattern (e.g., items[0].field)
    const match = name.match(/(\w+)\[(\d+)\]\.(\w+)/);
    if (match) {
      const [, arrayName, index, field] = match;
      setFormData((prevState) => {
        const updatedArray = [...prevState[arrayName]];
        updatedArray[index] = {
          ...updatedArray[index],
          [field]: value,
        };
        return {
          ...prevState,
          [arrayName]: updatedArray,
        };
      });
    } else if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prevState) => {
        const newFormData = { ...prevState };
        let current = newFormData;
        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            current[key] = value;
          } else {
            if (!current[key]) current[key] = {};
            current = current[key];
          }
        });
        return newFormData;
      });
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  //!<---------------------------------------------------------------------------------MAIN URL FOR API CALL---------------------------------------------------------------------->
  // ________________________________________________________
  const url = "/api/SO/InsertSO";
  const apiUrl = import.meta.env.VITE_API_URL;
  const mainUrl = `${apiUrl}${url}`;
  // ________________________________________________________
  //!<----------------------------------------------------------------------------------- HANDLE SUBMIT---------------------------------------------------------------------->
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true);
    try {
      const response = await fetch(mainUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${staticToken}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setData(data); // Store the API response
      } else {
        const errorData = await response.json();
        setError(errorData);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  return (
    <div>
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
          <FaShoppingCart
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Sales Order
        </h2>
      </section>
      <div className="bg-white border border-2">
        <h5
          className="text-dark border border-1 pb-2"
          style={{
            // padding: "18px 16px",
            fontSize: "1.7 rem",
            backgroundColor: "#E8F1F3",
          }}
        >
          <BackButton to="/viewleads" />
          Add Sales Order
        </h5>
        <div className="p-4">
          <div>
            {showAlert && (
              <Alert variant="info" className="mt-2 text-center">
                SO Updated Successfully
              </Alert>
            )}
          </div>
          {/* //!<--------------------------------------------------------------------------------- FORM STARTING POINT ----------------------------------------------------------------------> */}
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/*  */}
              {/* //!<--------------------------------------------------------------------------------- FORM STARTING POINT ----------------------------------------------------------------------> */}
              <div className="col-md-6 ">
                <h5 className="fw-bold text-dark mb-3 border-bottom">
                  Personal Details
                </h5>
                {[
                  { label: "Created Date", name: "createdDate", type: "date" },
                  { label: "Client Name", name: "clientName", type: "text" },
                  { label: "Father's Name", name: "fatherName", type: "text" },
                  { label: "Mother's Name", name: "motherName", type: "text" },
                  { label: "Mobile Number", name: "mobile", type: "number" },
                  { label: "Personal Email", name: "email", type: "email" },
                  { label: "Date of Birth", name: "dob", type: "date" },
                  { label: "Aadhar", name: "aadhar", type: "text" },
                  { label: "Pan No.", name: "panNo", type: "text" },
                  { label: "GSTIN", name: "gstin", type: "text" },
                  { label: "SAC", name: "sac", type: "text" },
                ].map(({ label, name, type }, index) => (
                  <div key={index} className="form-group mb-3">
                    <label>{label}</label>
                    <input
                      type={type}
                      name={`personalDetails.${name}`}
                      value={
                        name.includes(".")
                          ? formData.personalDetails[name.split(".")[1]]
                          : formData.personalDetails[name]
                      }
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                ))}
                <div>
                  <label>Pin Code</label>
                  <input
                    type="text"
                    name="personalDetails.address.pinCode"
                    value={formData.personalDetails.address.pinCode || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div>
                  <label>Address</label>
                  <input
                    type="text"
                    name="personalDetails.address.city"
                    value={formData.personalDetails.address.city || ""}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>State</label>
                  <select
                    name="personalDetails.address.state"
                    value={formData.personalDetails.address.state}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Haryana">Haryana</option>
                  </select>
                </div>
              </div>
              {/* Payment Details Section */}
              <div className="col-md-6">
                <h5 className="fw-bold text-dark mb-3 border-bottom">
                  Payment Details
                </h5>
                {[
                  { label: "Payment Date", name: "paymentDate", type: "date" },
                  {
                    label: "Mode of Payment",
                    name: "modeOfPayment",
                    type: "text",
                  },
                  { label: "Bank Name", name: "bankName", type: "text" },
                ].map(({ label, name, type }, index) => (
                  <div key={index} className="form-group mb-3">
                    <label>{label}</label>
                    <input
                      type={type}
                      name={`paymentDetails.${name}`}
                      value={formData.paymentDetails[name]}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                ))}
                {[
                  {
                    label: "Service Mode",
                    name: "serviceMode",
                    options: ["SMS", "Others"],
                  },
                  {
                    label: "Terms",
                    name: "terms",
                    options: ["Daily", "Weekly"],
                  },
                  {
                    label: "Service Status",
                    name: "serviceStatus",
                    options: ["Activate", "Hold"],
                  },
                ].map(({ label, name, options }, index) => (
                  <div className="form-group mb-3" key={index}>
                    <label>{label}</label>
                    <select
                      name={`paymentDetails.${name}`}
                      value={formData.paymentDetails[name]}
                      onChange={handleChange}
                      className="form-control"
                    >
                      {options.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                <div className="form-group mb-3">
                  <label>Comment</label>
                  <textarea
                    name="comment"
                    value={formData.paymentDetails.comments}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter Comments"
                  ></textarea>
                </div>
                {/* //!----------------------------------------------------------------------------PRODUCT DETAILS SECTION-------------------------------------------------------------------- */}
                <div className="col-md-12" style={{ marginTop: "8vh" }}>
                  <h5 className="fw-bold text-dark  border-bottom">
                    Product Details
                  </h5>
                  {[
                    { label: "Start Date", name: "startDate", type: "date" },
                    { label: "End Date", name: "endDate", type: "date" },
                    {
                      label: "Grand Total",
                      name: "grandTotal",
                      type: "number",
                    },
                    { label: "Discount", name: "discount", type: "number" },
                    { label: "Adjustment", name: "adjustment", type: "number" },
                  ].map(({ label, name, type }, index) => (
                    <div key={index} className="form-group mb-3">
                      <label>{label}</label>
                      <input
                        type={type}
                        name={`productDetails[0].${name}`}
                        value={formData.productDetails[0][name] || ""}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Update Button */}
              <div className="col-md-12 text-center ">
                <button type="submit" className="btn text-white py-1 px-4" style={{backgroundColor:"#009688"}}>
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default InsertSalesOrder;
