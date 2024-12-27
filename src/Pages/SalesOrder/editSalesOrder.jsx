import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { postSalesOrderThunk } from "../../Redux/Services/thunks/SalesOrderThunk";
import { useDispatch } from "react-redux";
import { staticToken } from "../../Redux/Services/apiServer/ApiServer";
import { apiPostCallWithAuth } from "../../Utils/apiUtils";

const addSalesOrder = () => {
  // ________________________________________________________
  const url = "/api/SO/InsertSO";
  const apiUrl = import.meta.env.VITE_API_URL;
  const mainUrl = `${apiUrl}${url}`;
  // ________________________________________________________

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    id: 1,
    employeeCode: "E123",
    employeeName: "John Doe",
    soId: "SO12345",
    so: "wge",
    leadId: "L67890",
    personalDetails: {
      createdDate: "2024-12-17T07:19:15.663Z",
      clientName: "",
      fatherName: "Father's Name",
      motherName: "Mother's Name",
      mobile: "1234567890",
      email: "email@example.com",
      dob: "2000-01-01",
      address: {
        city: "CityName",
        state: "StateName",
        pinCode: "123456",
      },
      aadhar: "123456789012",
      panNo: "ABCDE1234F",
      gstin: "GSTIN12345678",
      sac: "SAC123",
    },
    paymentDetails: {
      paymentDate: "2024-12-17T07:19:15.663Z",
      modeOfPayment: "Online Payment",
      bankName: "BankName",
      paymentGateway: "Gateway",
      serviceMode: "SMS",
      terms: "Daily",
      paymentIdOrRefNo: "PAY123456",
      serviceStatus: "Activate",
    },
    businessDetails: {
      businessType: "New Business",
      comment: "Some comment here",
    },
    productDetails: [
      {
        product: "Product A",
        startDate: "2024-12-17T07:19:15.663Z",
        endDate: "2024-12-31T07:19:15.663Z",
        grandTotal: 1000,
        remaining: 500,
        discount: 10,
        adjustment: 5,
      },
    ],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check for array and nested fields
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
    } else {
      const [section, field] = name.split(".");
      if (section && field) {
        setFormData((prevState) => ({
          ...prevState,
          [section]: {
            ...prevState[section],
            [field]: value,
          },
        }));
      } else {
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log("Params:-------------------   " + JSON.stringify(formData));
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
        setError(errorData); // Store the error response
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false); // Set loading to false once component is mounted
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      <h2 className="text-center bg-dark text-white py-2 mt-5">
        Add Sales Order
      </h2>
      <div  className="container-fluid border border-secondary w-75 py-3 rounded" style={{backgroundColor:"#E3E3E3"}}>
        <form onSubmit={handleSubmit}>
          <div className="row">

            {/* Personal Details Section */}
            <div className="col-md-6">
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
                { label: "City", name: "address.city", type: "text" },
                { label: "Pin Code", name: "address.pinCode", type: "number" },
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
            </div>

            {/* Product Details Section */}
            <div className="col-md-12">
              <h5 className="fw-bold text-dark mt-4 border-bottom">
                Product Details
              </h5>
              {[
                { label: "Start Date", name: "startDate", type: "date" },
                { label: "End Date", name: "endDate", type: "date" },
                { label: "Grand Total", name: "grandTotal", type: "number" },
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

            {/* Submit Button */}
            <div className="col-md-12 text-center mt-3">
              <button type="submit" className="btn btn-primary">
                Submit Sales Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default addSalesOrder;
