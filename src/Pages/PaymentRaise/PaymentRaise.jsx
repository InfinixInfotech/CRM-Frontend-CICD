import React, { useEffect, useState } from "react";
// import "./PaymentRaise.css";
import { useDispatch } from "react-redux";
import { postLeadPaymentRaiseThunk } from "../../Redux/Services/thunks/LeadPaymentRaiseThunk";
import { useLocation, useParams } from "react-router-dom";
import { emp, storedUsername } from "../../Redux/Services/apiServer/ApiServer";
// import { Alert } from "react-bootstrap";
// import BackButton from "../../Components/Button/BackButton/BackButton";
import { FaBuilding } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import AlertBox from "../../Components/AlertBox/AlertBox";
import { Alert } from "react-bootstrap";
const PaymentRaise = () => {
  const { state } = useLocation();
  const paymentData = state?.leadObj;
  const lead = paymentData?.lead;
  const recievedLeadTableData = state?.SearchData || {};
  const dispatch = useDispatch();
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep", "Delhi", "Puducherry"
  ];
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [AddPaymentRaise, setAddPaymentRaise] = useState({
    employeeCode: emp || recievedLeadTableData?.emp || "",
    employeeName: storedUsername || recievedLeadTableData?.storedUsername || "",
    leadId: lead?.leadId || recievedLeadTableData?.leadId || "",
    clientName: lead?.clientName || recievedLeadTableData?.clientName || "",
    fathersName: lead?.fatherName || recievedLeadTableData?.fatherName || "",
    mothersName: lead?.motherName || recievedLeadTableData?.motherName || "",
    mobile: lead?.mobile || recievedLeadTableData?.mobile || "",
    email: lead?.email || recievedLeadTableData?.email || "",
    dob: lead?.dob || recievedLeadTableData?.dob || "",
    remark: lead?.remark || recievedLeadTableData?.remark || "",
    segment: lead?.segment || recievedLeadTableData?.segment || "",
    netAmount: lead?.netAmount || recievedLeadTableData?.netAmount || "",
    paidAmount: lead?.paidAmount || recievedLeadTableData?.paidAmount || "",
    paymentDate: lead?.paymentDate || recievedLeadTableData?.paymentDate || "",
    paymentMode: lead?.modeOfPayment || recievedLeadTableData?.modeOfPayment || "",
    bankName: lead?.bankName || recievedLeadTableData?.bankName || "",
    transactionId: lead?.transactionInfo || recievedLeadTableData?.transactionInfo || "",
    panNo: lead?.panNo || recievedLeadTableData?.panNo || "",
    state: lead?.state || recievedLeadTableData?.state || "",
    city: lead?.city || recievedLeadTableData?.city || "",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true);
    setLoading(true)
    setShowAlert(false);
    const addnewPR = {
      employeeCode: AddPaymentRaise.employeeCode,
      employeeName: AddPaymentRaise.employeeName,
      prId: " ",
      leadId: AddPaymentRaise.leadId,
      clientDetails: {
        name: AddPaymentRaise.clientName,
        fatherName: AddPaymentRaise.fathersName,
        motherName: AddPaymentRaise.mothersName,
        mobile: AddPaymentRaise.mobile,
        email: AddPaymentRaise.email,
        dob: null,
        remark: AddPaymentRaise.remark,
      },
      productDetails: {
        segment: AddPaymentRaise.segment,
        netAmount: AddPaymentRaise.netAmount,
        paidAmount: AddPaymentRaise.paidAmount,
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
      transactionReceipt: "",
      paymentStatus: 0,
    };

    // console.log("Payload being sent:", addnewPR);

    try {
      const response = await dispatch(postLeadPaymentRaiseThunk(addnewPR));

      if (response.payload?.success) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setAlertMessage(response.payload.message || "Payment Raise Submitted Successfully!");
        setAlertType("success");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        console.error("Error from API:", response.payload?.error || "Unknown error");
        setAlertMessage(response.payload?.message || "Failed to submit payment raise.");
        setAlertType("danger");
      }
    } catch (error) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.error("Error adding:", error);
      setAlertMessage("An error occurred while submitting payment raise. Please try again.");
      setAlertType("danger");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <section
        style={{
          position: "relative",

          background: "#2c3e50",
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
            color: "white",
          }}
        >
          <FaBuilding
            className="fs-1"
            style={{ marginRight: "8px", color: "white" }}
          />
          Payment Raise
        </h2>
      </section>

      {/* <BackButton to="/viewleads" /> */}
      <div>
        <div>
          {alertMessage && (
            <Alert variant={alertType} className="mt-2 text-center">
              {alertMessage}
            </Alert>
          )}
        </div>

        <div>
          {loading && !showAlert && ( 
            <div
              style={{
                position: "absolute",
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
        {/* //!<-----------------------------------------------------------------------------------Personal Details Section --------------------------------------------------------------------------------- */}
        <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray rounded mb-4">
          <div className="card-header  px-2 py-2 text-black mb-1 text-dark tw-bold fs-5"
            style={{ backgroundColor: "#E8F1F3", }}>
            Personal Details
          </div>
          <div className="p-3">
            <div className="row g-3">
              <div className="col-md-4 ">
                <label className="form-label">Client Name</label>
                <input
                  type="text"
                  className="form-control input-box"
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
                  className="form-control input-box"
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
                  className="form-control input-box"
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
                  className="form-control input-box"
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
                  className="form-control input-box"
                  name="email"
                  value={AddPaymentRaise.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email ID"
                />
              </div>
              {/* <div className="col-md-4">
                <label className="form-label">DOB</label>
                <input
                  type="date"
                  className="form-control input-box"
                  name="dob"
                  value={AddPaymentRaise.dob}
                  onChange={handleInputChange}
                />
              </div> */}
              <div className="col-md-4 ">
                <label className="form-label">Remark</label>
                <input
                  type="text"
                  className="form-control input-box"
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
        <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray  rounded mb-4">
          <div className="card-header px-2 py-2  text-dark mb-2 tw-bold fs-5"
            style={{ backgroundColor: "#E8F1F3", }}>

            Product Details
          </div>
          <div className="card-body p-3">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Segment</label>
                <select
                  className="form-select input-box"
                  name="segment"
                  value={AddPaymentRaise.segment}
                  onChange={handleInputChange}
                >
                  <option>Select Some Options..</option>
                  <option value="Index Option">Index Option</option>
                  <option value="Index Future">Index Future</option>
                  <option value="Stock Option">Stock Option</option>
                  <option value="Stock Future">Stock Future</option>
                  <option value="Stock Cash">Stock Cash</option>
                </select>
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Net Amount</label>
                <input
                  type="text"
                  className="form-control input-box"
                  name="netAmount"
                  value={AddPaymentRaise.netAmount}
                  onChange={handleInputChange}
                  placeholder="Net Amount"
                  required
                />
              </div>
              <div className="col-md-4 ">
                <label className="form-label">Paid Amount</label>
                <input
                  type="text"
                  className="form-control input-box"
                  name="paidAmount"
                  value={AddPaymentRaise.paidAmount}
                  onChange={handleInputChange}
                  placeholder="Paid Amount"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Upload File</label>
                <input
                  className="form-control input-box"
                  type="file"
                  accept="*/*"
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
        <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray  rounded mb-0">
          <div className="card-header  px-2 py-2  text-black mb-2 text-dark tw-bold fs-5"
            style={{ backgroundColor: "#E8F1F3", }}>

            Payment Detail
          </div >
          <div className="card-body p-3">
            <div className="row g-3">
              <div className="col-md-4 ">
                <label className="form-label">Payment Date</label>
                <input
                  type="date"
                  className="form-control input-box"
                  name="paymentDate"
                  value={AddPaymentRaise.paymentDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Mode Of Payment</label>
                <select
                  className="form-select input-box"
                  name="paymentMode"
                  value={AddPaymentRaise.paymentMode}
                  onChange={handleInputChange}
                >
                  <option value="">--Select Mode Of Payment--</option>
                  <option value="online">Online</option>
                  <option value="creditCard">Credit Card</option>
                  <option value="debitCard">Debit Card</option>
                  <option value="bankTransfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="check">Check</option>
                  <option value="paymentGateway">Payment Gateway</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  className="form-control input-box"
                  name="bankName"
                  value={AddPaymentRaise.bankName}
                  onChange={handleInputChange}
                  placeholder="Enter Bank Name..."
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Transaction Id / Ref. No. / Branch Name / City
                </label>
                <input
                  type="text"
                  className="form-control input-box"
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
                // required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <select
                  className="form-select input-box"
                  name="state"
                  value={AddPaymentRaise.state}
                  onChange={handleInputChange}
                >
                  <option value="">--Select Here--</option>
                  {indianStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control input-box"
                  name="city"
                  value={AddPaymentRaise.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-3 text-center">
          {showAlert && (
            <AlertBox
              variant="warning"
              message="Are you sure you want to submit PaymentRaise?"
              onConfirm={handleSubmit}
              onCancel={() => setShowAlert(false)}
            />)}
          <button
            type="submit"
            className="btn btn-primary mt-2"
            onClick={() => setShowAlert(true)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default PaymentRaise;
