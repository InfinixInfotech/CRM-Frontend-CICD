import React, { useEffect, useState } from "react";
import "./EditPaymentRaise.css";
import { useLocation } from "react-router-dom";
import { emp, staticToken } from "../../Redux/Services/apiServer/ApiServer";
import { Alert } from "react-bootstrap";
import BackButton from "../../Components/Button/BackButton/BackButton";
import { putLeadPaymentRaiseThunk } from "../../Redux/Services/thunks/LeadPaymentRaiseThunk";
import { useDispatch } from "react-redux";
const EditPaymentRaise = () => {
  const [AddPaymentRaise, setAddPaymentRaise] = useState({});
  const { state } = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const paymentData = state?.paymentObj;
  const dispatch = useDispatch();
  //!<--------------------------------------------------------------------------- HANDLE FIELDS CHANGE --------------------------------------------------------------------------
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
console.log("paymentData.clientDetails?.remark --------------", paymentData.clientDetails?.remark );
  useEffect(() => {
    if (paymentData) {
      setAddPaymentRaise({
        id: paymentData.id,
        prId: paymentData.prId,
        clientName: paymentData.clientDetails?.name || "",
        fathersName: paymentData.clientDetails?.fatherName || "",
        mothersName: paymentData.clientDetails?.motherName || "",
        mobile: paymentData.clientDetails?.mobile || "",
        email: paymentData.clientDetails?.email || "",
        dob: paymentData.clientDetails?.dob || "",
        remark: paymentData.clientDetails?.remark ,
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
      transactionReceipt: AddPaymentRaise.transactionReceipt,
      paymentStatus: AddPaymentRaise.paymentStatus,
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
        dispatch(putLeadPaymentRaiseThunk(updatedPR))
              .then((response) => {
                if (response.payload === null) {
                  console.error("No data received from the server");
                }
                alert("Payment Raise Updated!");
                console.log("Added successfully:", response);
              })
              .catch((error) => {
                console.error("Error adding:", error);
              });
  };
  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-0">
        Edit Payment Raise
      </h2>
      <BackButton to="/payment"/>
      <div className="container-fluid border border-2 border-gray mt-1">
        {/* //!<--------------------------------------------------------------------------- PERSONAL DETAILS SECTIONS -------------------------------------------------------------------------- */}
        <div>
          {showAlert && (
            <Alert variant="info" className="mt-2 text-center">
              PR Updated Successfully
            </Alert>
          )}
        </div>
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
        {/* //!<--------------------------------------------------------------------------- PRODUCT DETAILS SECTION -------------------------------------------------------------------------- */}
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
        {/* //!<--------------------------------------------------------------------------- PAYMENT DETAILS SECTION -------------------------------------------------------------------------- */}
        <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded mb-0">
          <div className="card-header bg-secondary px-2 py-2 rounded text-black mb-2 text-white tw-bold fs-5">
            Payment Detail
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4 ">
                <label className="form-label">Payment Date</label>
                <input
                  type="text"
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
export default EditPaymentRaise;