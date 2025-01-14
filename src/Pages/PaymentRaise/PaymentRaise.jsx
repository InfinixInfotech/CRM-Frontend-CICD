import React, { useEffect, useState } from "react";
import "./PaymentRaise.css";
import { useDispatch } from "react-redux";
import { postLeadPaymentRaiseThunk } from "../../Redux/Services/thunks/LeadPaymentRaiseThunk";
import { useLocation, useParams } from "react-router-dom";
import { emp } from "../../Redux/Services/apiServer/ApiServer";
import { Alert } from "react-bootstrap";
import BackButton from "../../Components/Button/BackButton/BackButton";
const PaymentRaise = () => {
  const { state } = useLocation();  
 const paymentData = state?.leadObj;
  const lead = paymentData?.lead;
  const userName = localStorage.getItem("username");
  // console.log(userName);
  

  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [AddPaymentRaise, setAddPaymentRaise] = useState({
    employeeCode: emp,
    employeeName: userName ,
    leadId : lead.leadId ,
    clientName: lead.clientName || "",
    fathersName: lead.fatherName || "",
    mothersName: lead.motherName || "",
    mobile: lead.mobile || "",
    email: lead.email || "",
    dob: lead.dob || "",
    remark: lead.remark || "",
    segment: lead.segment || "",
    netAmount: lead.netAmount || "",
    paidAmount: lead.paidAmount || "",
    paymentDate: lead.paymentDate || "",
    paymentMode: lead.modeOfPayment || "",
    bankName: lead.bankName || "",
    transactionId: lead.transactionInfo || "",
    panNo: lead.panNo || "",
    state: lead.state || "",
    city: lead.city || "",
    file: null,
  });
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false); 
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [showAlert]);
  //!<----------------------------------------------------------------------------------- HANDLE FIELDS CHANGE ---------------------------------------------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddPaymentRaise((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setAddPaymentRaise((prevState) => ({
      ...prevState,
      file: uploadedFile,
    }));
  };
  //!<----------------------------------------------------------------------------------- HANDLE SUBMIT---------------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    const addnewPR = {
      employeeCode: AddPaymentRaise.employeeCode,
      employeeName: AddPaymentRaise.employeeName,
      prId: "",
      leadId: AddPaymentRaise.leadId,
      clientDetails: {
        name: AddPaymentRaise.clientName,
        fatherName: AddPaymentRaise.fathersName,
        motherName: AddPaymentRaise.mothersName,
        mobile: AddPaymentRaise.mobile,
        email: AddPaymentRaise.email,
        dob: AddPaymentRaise.dob,
        remark: AddPaymentRaise.remark,
      },
      productDetails: {
        segment: AddPaymentRaise.segment,
        netAmount: AddPaymentRaise.netAmount
          ? parseFloat(AddPaymentRaise.netAmount)
          : 0,
        paidAmount: AddPaymentRaise.paidAmount
          ? parseFloat(AddPaymentRaise.paidAmount)
          : 0,
      },
      paymentDetails: {
        paymentDate: AddPaymentRaise.paymentDate,
        modeOfPayment: AddPaymentRaise.paymentMode,
        bankName: AddPaymentRaise.bankName,
        transactionInfo: AddPaymentRaise.transactionId,
        panNo: AddPaymentRaise.panNo,
        state: AddPaymentRaise.state,
        city: AddPaymentRaise.city,
      },
      transactionReceipt: "string",
      paymentStatus: 0,
    };
    console.log("Payload being sent:", addnewPR);
    dispatch(postLeadPaymentRaiseThunk(addnewPR))
      .then((response) => {
        if (response.payload === null) {
          console.error("No data received from the server");
        }
        // alert("Payment Raise Submitted!");
        console.log("Added successfully:", response);
      })
      .catch((error) => {
        console.error("Error adding:", error);
      });
  };
  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-0">
        Payment Raise
      </h2>
      <BackButton to="/viewleads"/>
      <div className="container-fluid border border-2 border-gray mt-2">
        <div>
          {showAlert && (
            <Alert variant="info" className="mt-2 text-center">
              PR Added Successfully
            </Alert>
          )}
        </div>
        {/* //!<-----------------------------------------------------------------------------------Personal Details Section --------------------------------------------------------------------------------- */}
        <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded mb-4">
          <div className="card-header bg-secondary px-2 py-2 rounded text-black mb-1 text-white tw-bold fs-5">
            Personal Details
          </div>
          <div>
            <div className="row g-3">
              <div className="col-md-4 ">
                <label className="form-label">Client Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="clientName"
                  value={AddPaymentRaise.clientName}
                  onChange={handleInputChange}
                  placeholder="Enter Client Name"
                />
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Father's Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fathersName"
                  value={AddPaymentRaise.fathersName}
                  onChange={handleInputChange}
                  placeholder="Enter Father's Name"
                />
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Mother's Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="mothersName"
                  value={AddPaymentRaise.mothersName}
                  onChange={handleInputChange}
                  placeholder="Enter Mother's Name"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={AddPaymentRaise.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter Mobile Number"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={AddPaymentRaise.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email ID"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">DOB</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={AddPaymentRaise.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Remark</label>
                <input
                  type="text"
                  className="form-control"
                  name="remark"
                  value={AddPaymentRaise.remark}
                  onChange={handleInputChange}
                  placeholder="Remark"
                />
              </div>
            </div>
          </div>
        </div>
        {/* //!<-----------------------------------------------------------------------------------Product Details Section--------------------------------------------------------------------------------- */}
        <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded mb-4">
          <div className="card-header bg-secondary px-2 py-2 rounded text-black mb-2 text-white tw-bold fs-5">
            Product Details
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Segment</label>
                <select
                  className="form-select"
                  name="segment"
                  value={AddPaymentRaise.segment}
                  onChange={handleInputChange}
                >
                  <option>Select Some Options..</option>
                  <option>stock 1</option>
                </select>
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Net Amount</label>
                <input
                  type="text"
                  className="form-control"
                  name="netAmount"
                  value={AddPaymentRaise.netAmount}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Paid Amount</label>
                <input
                  type="text"
                  className="form-control"
                  name="paidAmount"
                  value={AddPaymentRaise.paidAmount}
                  onChange={handleInputChange}
                  placeholder="Paid Amount"
                />
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Upload CSV File</label>
                <input
                  className="form-control"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                />
                {AddPaymentRaise.file && (
                  <p>Selected file: {AddPaymentRaise.file.name}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* //!<----------------------------------------------------------------------------------- Payment Details Section --------------------------------------------------------------------------------- */}
        <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded mb-0">
          <div className="card-header bg-secondary px-2 py-2 rounded text-black mb-2 text-white tw-bold fs-5">
            Payment Detail
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4 ">
                <label className="form-label">Payment Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="paymentDate"
                  value={AddPaymentRaise.paymentDate}
                  onChange={handleInputChange}
                  placeholder="Payment Date"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Mode Of Payment</label>
                <select
                  className="form-select"
                  name="paymentMode"
                  value={AddPaymentRaise.paymentMode}
                  onChange={handleInputChange}
                >
                  <option>Select Mode Of Payment...</option>
                  <option>online</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Bank Name</label>
                <select
                  className="form-select"
                  name="bankName"
                  value={AddPaymentRaise.bankName}
                  onChange={handleInputChange}
                >
                  <option>Select Bank Name...</option>
                  <option>Kotak Mahendra</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Transaction Id / Ref. No. / Branch Name / City
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="transactionId"
                  value={AddPaymentRaise.transactionId}
                  onChange={handleInputChange}
                  placeholder="Transaction Id / Ref. No. / Branch Name / City"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Pan No.</label>
                <input
                  type="text"
                  className="form-control text-uppercase"
                  name="panNo"
                  value={AddPaymentRaise.panNo}
                  onChange={handleInputChange}
                  placeholder="Enter PAN No"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <select
                  className="form-select"
                  name="state"
                  value={AddPaymentRaise.state}
                  onChange={handleInputChange}
                >
                  <option>Select State Here..</option>
                  <option>Madhya Pradesh</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={AddPaymentRaise.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary mb-2 mt-2 "
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
export default PaymentRaise;