import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { staticToken } from "../../Redux/Services/apiServer/ApiServer";
import { useLocation } from "react-router-dom";
import { Alert } from "react-bootstrap";
import BackButton from "../../Components/Button/BackButton/BackButton";
import { FaGraduationCap, FaShoppingCart } from "react-icons/fa";
import { HashLoader } from "react-spinners";
const EditSalesOrder = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { state } = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const recievedSoData = state?.salesOrderObj;
  const [formData, setFormData] = useState({
    id: recievedSoData?.id || "",
    soId: recievedSoData?.soId || "SO12345",
    employeeCode: recievedSoData?.employeeCode,
    employeeName: recievedSoData?.employeeName || "John Doe",
    so: recievedSoData?.so || "wge",
    leadId: recievedSoData?.leadId || "L67890",
    personalDetails: {
    
      clientName: recievedSoData?.personalDetails?.clientName || "",
      fatherName:
        recievedSoData?.personalDetails?.fatherName || "Father's Name",
      motherName:
        recievedSoData?.personalDetails?.motherName || "Mother's Name",
      mobile: recievedSoData?.personalDetails?.mobile || "1234567890",
      email: recievedSoData?.personalDetails?.email || "email@example.com",
      dob: recievedSoData?.personalDetails?.dob || "2000-01-01",
      address: {
        city: recievedSoData?.personalDetails?.address?.city || "CityName",
        state: recievedSoData?.personalDetails?.address?.state || "StateName",
        pinCode: recievedSoData?.personalDetails?.address?.pinCode || "123456",
      },
      aadhar: recievedSoData?.personalDetails?.aadhar || "123456789012",
      panNo: recievedSoData?.personalDetails?.panNo || "ABCDE1234F",
      gstin: recievedSoData?.personalDetails?.gstin || "GSTIN12345678",
      sac: recievedSoData?.personalDetails?.sac || "SAC123",
    },
    paymentDetails: {
      paymentDate:
        recievedSoData?.paymentDetails?.paymentDate ||
        "2024-12-17T07:19:15.663Z",
      modeOfPayment:
        recievedSoData?.paymentDetails?.modeOfPayment || "Online Payment",
      bankName: recievedSoData?.paymentDetails?.bankName || "BankName",
      paymentGateway:
        recievedSoData?.paymentDetails?.paymentGateway || "Gateway",
      serviceMode: recievedSoData?.paymentDetails?.serviceMode || "SMS",
      terms: recievedSoData?.paymentDetails?.terms || "Daily",
      paymentIdOrRefNo:
        recievedSoData?.paymentDetails?.paymentIdOrRefNo || "PAY123456",
      serviceStatus:
        recievedSoData?.paymentDetails?.serviceStatus || "Activate",
    },
    businessDetails: {
      businessType:
        recievedSoData?.businessDetails?.businessType || "New Business",
      comment: recievedSoData?.businessDetails?.comment || "Some comment here",
    },
    productDetails: recievedSoData?.productDetails || [
      {
        product: "",
        startDate: "",
        endDate: "",
        grandTotal: 1000,
        remaining: 500,
        discount: 10,
        adjustment: 5,
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
  useEffect(() => {
    if (recievedSoData) {
      setFormData({
        id: recievedSoData?.id || "",
        soId: recievedSoData?.soId || "SO12345",
        employeeCode: recievedSoData?.employeeCode || "",
        employeeName: recievedSoData?.employeeName || "John Doe",
        so: recievedSoData?.so || "wge",
        leadId: recievedSoData?.leadId || "L67890",
        personalDetails: {
          clientName: recievedSoData?.personalDetails?.clientName || "",
          fatherName:
            recievedSoData?.personalDetails?.fatherName || "Father's Name",
          motherName:
            recievedSoData?.personalDetails?.motherName || "Mother's Name",
          mobile: recievedSoData?.personalDetails?.mobile || "1234567890",
          email: recievedSoData?.personalDetails?.email || "email@example.com",
          dob: recievedSoData?.personalDetails?.dob || "2000-01-01",
          address: {
            city: recievedSoData?.personalDetails?.address?.city || "CityName",
            state:
              recievedSoData?.personalDetails?.address?.state || "StateName",
            pinCode:
              recievedSoData?.personalDetails?.address?.pinCode || "123456",
          },
          aadhar: recievedSoData?.personalDetails?.aadhar || "123456789012",
          panNo: recievedSoData?.personalDetails?.panNo || "ABCDE1234F",
          gstin: recievedSoData?.personalDetails?.gstin || "GSTIN12345678",
          sac: recievedSoData?.personalDetails?.sac || "SAC123",
        },
        paymentDetails: {
          paymentDate:
            recievedSoData?.paymentDetails?.paymentDate ||
            "2024-12-17T07:19:15.663Z",
          modeOfPayment:
            recievedSoData?.paymentDetails?.modeOfPayment || "Online Payment",
          bankName: recievedSoData?.paymentDetails?.bankName || "BankName",
          paymentGateway:
            recievedSoData?.paymentDetails?.paymentGateway || "Gateway",
          serviceMode: recievedSoData?.paymentDetails?.serviceMode || "SMS",
          terms: recievedSoData?.paymentDetails?.terms || "Daily",
          paymentIdOrRefNo:
            recievedSoData?.paymentDetails?.paymentIdOrRefNo || "PAY123456",
          serviceStatus:
            recievedSoData?.paymentDetails?.serviceStatus || "Activate",
        },
        businessDetails: {
          businessType:
            recievedSoData?.businessDetails?.businessType || "New Business",
          comment:
            recievedSoData?.businessDetails?.comment || "Some comment here",
        },
        productDetails: recievedSoData?.productDetails || [
          {
            product: " ",
            startDate: recievedSoData?.productDetails.startDate,
            endDate: " ",
            grandTotal: 0,
            remaining:0,
            discount: 0,
            adjustment: 0, 
          },
        ],
      });
    }
  }, [recievedSoData]);
  //!<----------------------------------------------------------------------------------- HANDLE CHANGE ---------------------------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
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
            // If last key, set the value
            current[key] = value;
          } else {
            // Traverse or create nested objects
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
  //!<--------------------------------------------------------------------------- URL FOR API CALL -------------------------------------------------------------------------
  // ________________________________________________________
  const url = `/api/SO/UpdateSO?id=${formData.id}&soId=${formData.soId}`;
  const apiUrl = import.meta.env.VITE_API_URL;
  const mainUrl = `${apiUrl}${url}`;
  // ________________________________________________________
  //!<--------------------------------------------------------------------------- HANDLE SUBMIT --------------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true);
    setLoading(true); // Ensure loading state is set before the request
  
    try {
      const response = await fetch(mainUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${staticToken}`,
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json(); // Parse response
  
      if (response.ok) {
        setData(data);
        alert(data.message || "Request successful!"); // Show success message
      } else {
        setError(data);
        alert(data.error || data.message || "Something went wrong!"); // Show error message from API
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError({ error: "Network error, please try again." });
      alert("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    setLoading(false);
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.error || error.message || JSON.stringify(error)}</div>;
  
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
            style={{ marginRight: "8px", color: "#2c3e50" }}
          />
          Sales Order
        </h2>
      </section>
      <div className=" border border-2 w-100 bg-white" >
        <h5
          className="text-dark border border-1 pb-2"
          style={{
            // padding: "18px 16px",
            fontSize: "1.7 rem",
            backgroundColor: "#E8F1F3",
          }}
        >
          <BackButton />
          Edit Sales Order
        </h5>
        <div className="p-4">
        {loading && (
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
          {/* <div>
            {showAlert && (
              <Alert variant="info" className="mt-2 text-center">
                SO Updated Successfully
              </Alert>
            )}
          </div> */}
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
                  // { label: "Created Date", name: "createdDate", type: "date" },
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
                      className="form-control input-box"
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
                    className="form-control input-box"
                  />
                </div>
                <div>
                  <label>Address</label>
                  <input
                    type="text"
                    name="personalDetails.address.city"
                    value={formData.personalDetails.address.city || ""}
                    onChange={handleChange}
                    className="form-control input-box"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>State</label>
                  <select
                    name="personalDetails.address.state"
                    value={formData.personalDetails.address.state}
                    onChange={handleChange}
                    className="form-control input-box"
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
                      className="form-control input-box"
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
                      className="form-control input-box"
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
                    value={formData.paymentDetails.comment}
                    onChange={handleChange}
                    className="form-control input-box"
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
                        className="form-control input-box"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Update Button */}
              <div className="col-md-12 text-center ">
                <button type="submit" className="btn text-white py-1 px-4" style={{backgroundColor:"#2c3e50"}}>
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditSalesOrder;
