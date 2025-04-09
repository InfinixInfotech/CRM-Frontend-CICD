import React, { useEffect, useState } from "react";
// import "./EditPaymentRaise.css";
import { useLocation } from "react-router-dom";
import { emp, staticToken } from "../../Redux/Services/apiServer/ApiServer";
import { Alert } from "react-bootstrap";
import BackButton from "../../Components/Button/BackButton/BackButton";
import { putLeadPaymentRaiseThunk } from "../../Redux/Services/thunks/LeadPaymentRaiseThunk";
import { useDispatch } from "react-redux";
// import { FaBuilding } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { HashLoader } from "react-spinners";
const EditPaymentRaise = () => {
  const [AddPaymentRaise, setAddPaymentRaise] = useState({});
  const { state } = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const paymentData = state?.paymentObj;
  const [apiMessage, setApiMessage] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //!<---------------------------------------------------------------------------HANDLE FIELDS CHANGE--------------------------------------------------------------------------
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
  // console.log(
  //   "paymentData.clientDetails?.remark --------------",
  //   paymentData.clientDetails?.remark
  // );
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep", "Delhi", "Puducherry"
  ];

  useEffect(() => {
    if (paymentData) {
      setAddPaymentRaise({
        id: paymentData.id,
        prId: paymentData.prId,
        employeeName: paymentData.employeeName,
        leadId: paymentData.leadId,
        clientName: paymentData.clientDetails?.name || "",
        fathersName: paymentData.clientDetails?.fatherName || "",
        mothersName: paymentData.clientDetails?.motherName || "",
        mobile: paymentData.clientDetails?.mobile || "",
        email: paymentData.clientDetails?.email || "",
        dob: paymentData.clientDetails?.dob || "",
        remark: paymentData.clientDetails?.remark,
        segment: paymentData.productDetails?.segment || "",
        netAmount: paymentData.productDetails?.netAmount || "",
        paidAmount: paymentData.productDetails?.paidAmount || "",
        paymentDate: paymentData.paymentDetails?.paymentDate || "",
        paymentMode: paymentData.paymentDetails?.modeOfPayment || "",
        bankName: paymentData.paymentDetails?.bankName || "",
        transactionId: paymentData.paymentDetails?.transactionInfo || "",
        panNo: paymentData.paymentDetails?.panNo || "",
        state: paymentData.paymentDetails?.state || "",
        city: paymentData.paymentDetails?.city || "",
        file: null,
      });
    }
  }, [paymentData]);
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false); // Hide the alert after 3000ms
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [showAlert]);
  //!<--------------------------------------------------------------------------- HANDLE SUBMIT --------------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true);

    // console.log(AddPaymentRaise.employeeName);
    // console.log(AddPaymentRaise.leadId);


    const updatedPR = {
      id: AddPaymentRaise.id,
      prId: AddPaymentRaise.prId,
      employeeCode: emp,
      employeeName: AddPaymentRaise.employeeName,
      leadId: AddPaymentRaise.leadId,
      clientDetails: {
        name: AddPaymentRaise.clientName,
        fatherName: AddPaymentRaise.fathersName,
        motherName: AddPaymentRaise.mothersName,
        mobile: AddPaymentRaise.mobile,
        email: AddPaymentRaise.email,
        dob: AddPaymentRaise.dob ? new Date(AddPaymentRaise.dob).toISOString().split("T")[0] : null,
        remark: AddPaymentRaise.remark
      },
      productDetails: {
        segment: AddPaymentRaise.segment,
        netAmount: AddPaymentRaise.netAmount ? parseFloat(AddPaymentRaise.netAmount) : 0,
        paidAmount: AddPaymentRaise.paidAmount ? parseFloat(AddPaymentRaise.paidAmount) : 0
      },
      paymentDetails: {
        paymentDate: AddPaymentRaise.paymentDate,
        modeOfPayment: AddPaymentRaise.paymentMode,
        bankName: AddPaymentRaise.bankName,
        transactionInfo: AddPaymentRaise.transactionId,
        panNo: AddPaymentRaise.panNo,
        state: AddPaymentRaise.state,
        city: AddPaymentRaise.city
      },
      transactionReceipt: AddPaymentRaise.transactionReceipt,
      paymentStatus: AddPaymentRaise.paymentStatus
    };

    // try {
    //   const token = staticToken;
    //   const response = await fetch(
    //     `/api/LeadPaymentRaise/UpdateLeadPRById?id=${AddPaymentRaise.id}&PRId=${AddPaymentRaise.prId}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify(updatedPR),
    //     }
    //   );
    //   if (!response.ok) throw new Error("Failed to update user.");
    //   const result = await response.json();
    //   console.log("User updated successfully:", result);
    //   // alert("User updated successfully!");
    // } catch (error) {
    //   console.error("Error updating user:", error);
    //   alert("Failed to update user.");
    // }
    setLoading(true)
    dispatch(putLeadPaymentRaiseThunk(updatedPR))
      .then((response) => {
        if (response.payload === null) {
          setApiError("No data received from the server");
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setApiMessage(response.payload.message || "Payment Raise Updated!");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .catch((error) => {
        setApiError(error.message || "An error occurred while updating payment raise");
      }).finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <section
        style={{
          position: "relative",
          // padding: "12px 30px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          marginBottom: "0px",
          marginBottom: "0px",
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
          <FiEdit
            className="fs-1"
            style={{ marginRight: "8px", color: "#2c3e50" }}
          />
          Edit Payment Raise
        </h2>
      </section>
      <div className="mt-2">
        {/* //!<--------------------------------------------------------------------------- PERSONAL DETAILS SECTIONS -------------------------------------------------------------------------- */}
        <div>

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


          {apiMessage && (
            <Alert variant="success" className="mt-2 text-center">
              {apiMessage}
            </Alert>
          )}
          {apiError && (
            <Alert variant="danger" className="mt-2 text-center">
              {apiError}
            </Alert>
          )}
        </div>
        <div className="addleadSections field-container mt-2 border me-0 ms-0 border-2 border-gray rounded mb-4">
          <h5
            className="text-dark border border-1 pb-2"
            style={{
              // padding: "18px 16px",
              fontSize: "1.7 rem",
              backgroundColor: "#E8F1F3",
            }}
          >
            <BackButton to="/payment" />
            Personal Details
          </h5>
          <div className="p-3">
            <div>
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
                <div className="col-md-4">
                  <label className="form-label">DOB</label>
                  <input
                    type="date"
                    className="form-control input-box"
                    name="dob"
                    value={AddPaymentRaise.dob}
                    onChange={handleInputChange}
                  />
                </div>
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
        </div>
        {/* //!<--------------------------------------------------------------------------- PRODUCT DETAILS SECTION -------------------------------------------------------------------------- */}
        <div className="addleadSections field-container mt-2 border me-0 ms-0 border-2 border-gray rounded mb-4">
          <h5
            className="text-dark border border-1  p-3"
            style={{
              // padding: "18px 16px",
              fontSize: "1.7 rem",
              backgroundColor: "#E8F1F3",
            }}
          >
            Product Details
          </h5>
          <div className="p-3">
            <div className="card-body">
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
                    <option>stock 1</option>
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
                    placeholder="0"
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
                  />
                </div>
                <div className="col-md-4 ">
                  <label className="form-label">Upload CSV File</label>
                  <input
                    className="form-control input-box"
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
        </div>
        {/* //!<--------------------------------------------------------------------------- PAYMENT DETAILS SECTION -------------------------------------------------------------------------- */}
        <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray rounded mb-0">
          <h5
            className="text-dark border border-1  p-3"
            style={{
              // padding: "18px 16px",
              fontSize: "1.7 rem",
              backgroundColor: "#E8F1F3",
            }}
          >
            Payment Detail
          </h5>
          <div className="p-3">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4 ">
                  <label className="form-label">Payment Date</label>
                  <input
                    type="date"
                    className="form-control input-box"
                    name="paymentDate"
                    value={AddPaymentRaise.paymentDate}
                    onChange={handleInputChange}
                    placeholder="Payment Date"
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
                    <option>Select Mode Of Payment...</option>
                    <option>online</option>
                    <option>Payment Gatway</option>
                    <option>Cash</option>
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
                    placeholder="Enter Bank Name"
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
                  />
                </div>
                {/* <div className="col-md-4">
                  <label className="form-label">State</label>
                  <select
                    className="form-select input-box"
                    name="state"
                    value={AddPaymentRaise.state}
                    onChange={handleInputChange}
                  >
                    <option>Select State Here..</option>
                    <option>Madhya Pradesh</option>
                  </select>
                </div> */}


                <div className="col-md-4">
                  <label>State</label>
                  <select
                    name="personalDetails.address.state"
                    value={AddPaymentRaise.state || ""}
                    onChange={handleInputChange}
                    className="form-control input-box"
                  >
                    <option value="" disabled>-- Select State --</option>
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
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-sm px-4 text-white mb-2 mt-2 fs-6"
            onClick={handleSubmit}
            style={{ backgroundColor: "#2c3e50" }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
export default EditPaymentRaise;
