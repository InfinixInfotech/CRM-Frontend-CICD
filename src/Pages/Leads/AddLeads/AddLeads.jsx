import React, { useEffect, useState } from "react";

import "./AddLeads.css";
import { useDispatch } from "react-redux";
import { postAddLeadThunk } from "../../../Redux/Services/thunks/AddLeadThunk";
import { Alert } from "react-bootstrap";

const AddLeads = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [leads, setLeads] = useState({
    clientName: "",
    assignedTo: "",
    leadSource: "",
    mobile: "",
    alternateMobile: "",
    otherMobile1: "",
    otherMobile2: "",
    email: "",
    city: "",
    state: "",
    dob: "",
    investment: "",
    profile: "",
    trading: "",
    tradingExp: "",
    lot: "",
    annualIncome: "",
    investmentGoal: "",
    marketValue: "",
    minInvestment: "",
    sourceOfIncome: "",
    panNo: "",
    uid: "",
    language: "",
    leadStatus: "",
    segment: "",
    freeTrialStartDate: "",
    freeTrialEndDate: "",
    followUp: "",
    comment: "",
  });

   useEffect(() => {
     if (showAlert) {
       const timer = setTimeout(() => {
         setShowAlert(false); // Hide the alert after 3000ms
       }, 3000);
 
       return () => clearTimeout(timer); // Cleanup the timer
     }
   }, [showAlert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeads((prevLeads) => ({
      ...prevLeads,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true); // Show the alert

    const addNewLead = {
      id: 1 || null,
      // apiType: "Leads",
      // accessType: "Create",
      leadId: "string",
      clientName: "string",
      assignedTo: "string",
      employeeCode: "string",
      leadSource: "string",
      mobile: "string",
      alternateMobile: "string",
      otherMobile1: "string",
      otherMobile2: "string",
      email: "string",
      city: "string",
      state: "string",
      dob: "2024-11-30T07:25:51.562Z",
      investmentDetail: {
        investment: "string",
        profile: "string",
        trading: "string",
        lot: 0,
        tradingExp: "string",
        annualIncome: "string",
        investmentGoal: "string",
        marketValue: "string",
        minInvestment: "string",
        sourceOfIncome: "string",
        panNo: "string",
        uidAadhaar: "string",
        amountCapping: "string",
      },
      language: "string",
      followupDetail: {
        leadStatus: "string",
        segment: "string",
        freeTrialStartDate: "2024-11-30T07:25:51.562Z",
        freeTrialEndDate: "2024-11-30T07:25:51.562Z",
        followUpDate: "2024-11-30T07:25:51.562Z",
        comment: "string",
      },
    };

    console.log("Lead Data Submitted:", leads);
    // Add your submission logic here
    dispatch(postAddLeadThunk(addNewLead))
      .then((response) => {
        if (response.payload === null) {
          console.error("No data received from the server");
        }
        alert("Payment Raise Submitted!");
        console.log("Added successfully:", response);
      })
      .catch((error) => {
        console.error("Error adding:", error);
      });
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-0">
        Add Leads
      </h2>
      <div>
        {showAlert && (
          <Alert variant="info" className="mt-2 text-center">
           Lead Added Successfully
          </Alert>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container-fluid border border-2 border-gray mt-1 ">
          {/* Personal Details Section */}
          <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded   mb-4">
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
                    placeholder="Enter Client Name"
                    name="clientName"
                    value={leads.clientName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Assigned To</label>
                  <select
                    className="form-select"
                    name="assignedTo"
                    value={leads.assignedTo}
                    onChange={handleChange}
                  >
                    <option>Select Here...</option>
                    <option value="User1">User1</option>
                    <option value="User2">User2</option>
                    <option value="User3">User3</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Lead Source</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Fresh Pool"
                    name="leadSource"
                    value={leads.leadSource}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    name="mobile"
                    value={leads.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Alternate Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Alternate Mobile Number"
                    name="alternateMobile"
                    value={leads.alternateMobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Other Mobile 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Client Other Mobile Number 1"
                    name="otherMobile1"
                    value={leads.otherMobile1}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Other Mobile 2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Client Other Mobile Number 2"
                    name="otherMobile2"
                    value={leads.otherMobile2}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email ID"
                    name="email"
                    value={leads.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter City"
                    name="city"
                    value={leads.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <select
                    className="form-select"
                    name="state"
                    value={leads.state}
                    onChange={handleChange}
                  >
                    <option>Select Here...</option>
                    <option>Madhya Pradesh</option>
                    <option>Punjab</option>
                    <option>Harayana</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">DOB</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={leads.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Investment Details Section */}
          <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded   mb-4">
            <div className="card-header bg-secondary px-2 py-2 rounded text-black mb-2 text-white tw-bold fs-5">
              Investment Detail
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Investment</label>
                  <select
                    className="form-select"
                    name="investment"
                    value={leads.investment}
                    onChange={handleChange}
                  >
                    <option>Select Investment...</option>
                    <option>Option A</option>
                    <option>Option B</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Profile</label>
                  <select
                    className="form-select"
                    name="profile"
                    value={leads.profile}
                    onChange={handleChange}
                  >
                    <option>Select Profile...</option>
                    <option>Option A</option>
                    <option>Option B</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Trading</label>
                  <select
                    className="form-select"
                    name="trading"
                    value={leads.trading}
                    onChange={handleChange}
                  >
                    <option>Select Here...</option>
                    <option>Option A</option>
                    <option>Option B</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Trading Exp</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Trading Exp"
                    name="tradingExp"
                    value={leads.tradingExp}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Lot</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Lot Size"
                    name="lot"
                    value={leads.lot}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Annual Income</label>
                  <select
                    className="form-select"
                    name="annualIncome"
                    value={leads.annualIncome}
                    onChange={handleChange}
                  >
                    <option>Below 1 lac</option>
                    <option>Option A</option>
                    <option>Option B</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Investment Goal</label>
                  <select
                    className="form-select"
                    name="investmentGoal"
                    value={leads.investmentGoal}
                    onChange={handleChange}
                  >
                    <option>Capital Appreciation</option>
                    <option>Option A</option>
                    <option>Option B</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Market Value</label>
                  <select
                    className="form-select"
                    name="marketValue"
                    value={leads.marketValue}
                    onChange={handleChange}
                  >
                    <option>&lt; 1 lac</option>
                    <option>Option A</option>
                    <option>Option B</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Min. Investment</label>
                  <select
                    className="form-select"
                    name="minInvestment"
                    value={leads.minInvestment}
                    onChange={handleChange}
                  >
                    <option>&lt; 50000</option>
                    <option>Option A</option>
                    <option>Option B</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Source of Income</label>
                  <select
                    className="form-select"
                    name="sourceOfIncome"
                    value={leads.sourceOfIncome}
                    onChange={handleChange}
                  >
                    <option>Salary</option>
                    <option>Option A</option>
                    <option>Option B</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Pan No.</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter PAN No"
                    name="panNo"
                    value={leads.panNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">
                    Unique Identity Number (UID)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Aadhaar Number"
                    name="uid"
                    value={leads.uid}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Language</label>
                  <select
                    className="form-select"
                    name="language"
                    value={leads.language}
                    onChange={handleChange}
                  >
                    <option>--Select Here--</option>
                    <option>Option A</option>
                    <option>Option B</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Followup Details Section */}
          <div className=" addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded">
            <div className="card-header bg-secondary px-2 py-2 rounded text-black mb-2 text-white tw-bold fs-5">
              Followup Detail
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Lead Status</label>
                  <select
                    className="form-select"
                    name="leadStatus"
                    value={leads.leadStatus}
                    onChange={handleChange}
                  >
                    <option>None</option>
                    <option>Option A</option>
                    <option>Option B</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Segment</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Select Some Options"
                    name="segment"
                    value={leads.segment}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Free Trial Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="freeTrialStartDate"
                    value={leads.freeTrialStartDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Free Trial End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="freeTrialEndDate"
                    value={leads.freeTrialEndDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Follow Up</label>
                  <input
                    type="date"
                    className="form-control"
                    name="followUp"
                    value={leads.followUp}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-8">
                  <label className="form-label">Comment</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Enter Comments"
                    name="comment"
                    value={leads.comment}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-3 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddLeads;
