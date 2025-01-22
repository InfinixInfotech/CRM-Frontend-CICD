import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import { emp, staticToken } from "../../../Redux/Services/apiServer/ApiServer";
import { postAddLeadThunk } from "../../../Redux/Services/thunks/AddLeadThunk";
import { useLocation } from "react-router-dom";
import { UpdateBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import { FaEdit } from "react-icons/fa";
const EditLeads = () => {
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const recievedLeadData = state?.leadObj?.lead || {};
  const recievedLeadTableData = state?.SearchData || {};
console.log("recievedLeadTableData---------------",recievedLeadTableData);

  console.log(
    "recievedLeadData-----------------------",
    recievedLeadData.leadId
  );

  const [leads, setLeads] = useState({
    leadId: recievedLeadData?.leadId || recievedLeadTableData?.leadId || "",
    CampaignName: recievedLeadData?.campaignName || recievedLeadTableData?.campaignName || "",
    ClientName: recievedLeadData?.clientName || recievedLeadTableData?.clientName || "",
    AssignedTo: recievedLeadData?.assignedTo || recievedLeadTableData?.assignedTo || "",
    LeadSource: recievedLeadData?.leadSource || recievedLeadTableData?.leadSource || "",
    Mobile: recievedLeadData?.mobile || recievedLeadTableData?.mobile || "",
    AlternateMobile: recievedLeadData?.alternateMobile || recievedLeadTableData?.alternateMobile || "",
    OtherMobile1: recievedLeadData?.otherMobile1 || recievedLeadTableData?.otherMobile1 || "",
    OtherMobile2: recievedLeadData?.otherMobile2 || recievedLeadTableData?.otherMobile2 || "",
    Email: recievedLeadData?.email || recievedLeadTableData?.email || "",
    City: recievedLeadData?.city || recievedLeadTableData?.city || "",
    State: recievedLeadData?.state || recievedLeadTableData?.state || "",
    Dob: recievedLeadData?.dob || recievedLeadTableData?.dob || "",
    Investment: recievedLeadData?.investment || recievedLeadTableData?.investment || "",
    Profile: recievedLeadData?.profile || recievedLeadTableData?.profile || "",
    Trading: recievedLeadData?.trading || recievedLeadTableData?.trading || "",
    TradingExp: recievedLeadData?.tradingExp || recievedLeadTableData?.tradingExp || "",
    Lot: recievedLeadData?.lot || recievedLeadTableData?.lot || 0,
    AnnualIncome: recievedLeadData?.annualIncome || recievedLeadTableData?.annualIncome || "",
    InvestmentGoal: recievedLeadData?.investmentGoal || recievedLeadTableData?.investmentGoal || "",
    MarketValue: recievedLeadData?.marketValue || recievedLeadTableData?.marketValue || "",
    MinInvestment: recievedLeadData?.minInvestment || recievedLeadTableData?.minInvestment || "",
    SourceOfIncome: recievedLeadData?.sourceOfIncome || recievedLeadTableData?.sourceOfIncome || "",
    PanNo: recievedLeadData?.panNo || recievedLeadTableData?.panNo || "",
    UidAadhaar: recievedLeadData?.uidAadhaar || recievedLeadTableData?.uidAadhaar || "",
    Language: recievedLeadData?.language || recievedLeadTableData?.language || "",
    LeadStatus: recievedLeadData?.leadStatus || recievedLeadTableData?.leadStatus || "",
    Segment: recievedLeadData?.segment || recievedLeadTableData?.segment || "",
    FreeTrialStartDate: recievedLeadData?.freeTrialStartDate || recievedLeadTableData?.freeTrialStartDate || "",
    FreeTrialEndDate: recievedLeadData?.freeTrialEndDate || recievedLeadTableData?.freeTrialEndDate || "",
    FollowUp: recievedLeadData?.followUp || recievedLeadTableData?.followUp || "",
    Comment: recievedLeadData?.comment || recievedLeadTableData?.comment || "",
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
    setLeads({
      leadId: recievedLeadData?.leadId || recievedLeadTableData?.leadId || "",
      CampaignName: recievedLeadData?.campaignName || recievedLeadTableData?.campaignName || "",
      ClientName: recievedLeadData?.clientName || recievedLeadTableData?.clientName || "",
      AssignedTo: recievedLeadData?.assignedTo || recievedLeadTableData?.assignedTo || "",
      LeadSource: recievedLeadData?.leadSource || recievedLeadTableData?.leadSource || "",
      Mobile: recievedLeadData?.mobile || recievedLeadTableData?.mobile || "",
      AlternateMobile: recievedLeadData?.alternateMobile || recievedLeadTableData?.alternateMobile || "",
      OtherMobile1: recievedLeadData?.otherMobile1 || recievedLeadTableData?.otherMobile1 || "",
      OtherMobile2: recievedLeadData?.otherMobile2 || recievedLeadTableData?.otherMobile2 || "",
      Email: recievedLeadData?.email || recievedLeadTableData?.email || "",
      City: recievedLeadData?.city || recievedLeadTableData?.city || "",
      State: recievedLeadData?.state || recievedLeadTableData?.state || "",
      Dob: recievedLeadData?.dob || recievedLeadTableData?.dob || "",
      Investment: recievedLeadData?.investment || recievedLeadTableData?.investment || "",
      Profile: recievedLeadData?.profile || recievedLeadTableData?.profile || "",
      Trading: recievedLeadData?.trading || recievedLeadTableData?.trading || "",
      TradingExp: recievedLeadData?.tradingExp || recievedLeadTableData?.tradingExp || "",
      Lot: recievedLeadData?.lot || recievedLeadTableData?.lot || 0,
      AnnualIncome: recievedLeadData?.annualIncome || recievedLeadTableData?.annualIncome || "",
      InvestmentGoal: recievedLeadData?.investmentGoal || recievedLeadTableData?.investmentGoal || "",
      MarketValue: recievedLeadData?.marketValue || recievedLeadTableData?.marketValue || "",
      MinInvestment: recievedLeadData?.minInvestment || recievedLeadTableData?.minInvestment || "",
      SourceOfIncome: recievedLeadData?.sourceOfIncome || recievedLeadTableData?.sourceOfIncome || "",
      PanNo: recievedLeadData?.panNo || recievedLeadTableData?.panNo || "",
      UidAadhaar: recievedLeadData?.uidAadhaar || recievedLeadTableData?.uidAadhaar || "",
      Language: recievedLeadData?.language || recievedLeadTableData?.language || "",
      LeadStatus: recievedLeadData?.leadStatus || recievedLeadTableData?.leadStatus || "",
      Segment: recievedLeadData?.segment || recievedLeadTableData?.segment || "",
      FreeTrialStartDate: recievedLeadData?.freeTrialStartDate || recievedLeadTableData?.freeTrialStartDate || "",
      FreeTrialEndDate: recievedLeadData?.freeTrialEndDate || recievedLeadTableData?.freeTrialEndDate || "",
      FollowUp: recievedLeadData?.followUp || recievedLeadTableData?.followUp || "",
      Comment: recievedLeadData?.comment || recievedLeadTableData?.comment || "",
    });
  }, []);

  //!<---------------------------------------------------------------------------------HANDLE CHANGE Functionality---------------------------------------------------------------------->

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeads((prevLeads) => ({
      ...prevLeads,
      [name]: value,
    }));
  };

  //!<---------------------------------------------------------------------------------HANDLE SUBMIT Functionality---------------------------------------------------------------------->

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addNewLead = {
      leadId: leads.leadId,
      campaignName: leads.CampaignName,
      clientName: leads.ClientName,
      assignedTo: leads.AssignedTo,
      employeeCode: emp,
      leadSource: leads.LeadSource,
      mobile: leads.Mobile,
      alternateMobile: leads.AlternateMobile,
      otherMobile1: leads.OtherMobile1,
      otherMobile2: leads.OtherMobile2,
      email: leads.Email,
      city: leads.City,
      state: leads.State,
      dob: leads.Dob,
      investmentDetail: {
        investment: leads.Investment,
        profile: leads.Profile,
        trading: leads.Trading,

        lot: leads.Lot,
        tradingExp: "",
        annualIncome: "",
        investmentGoal: leads.InvestmentGoal,
        marketValue: leads.MarketValue,
        minInvestment: leads.MinInvestment,
        sourceOfIncome: leads.SourceOfIncome,
        panNo: leads.PanNo,
        uidAadhaar: leads.UidAadhaar,
        amountCapping: "",
      },
      language: leads.Language,
      followupDetail: {
        leadStatus: leads.LeadStatus,
        segment: leads.Segment,
        freeTrialStartDate: leads.FreeTrialStartDate,
        freeTrialEndDate: leads.FreeTrialEndDate,
        followUpDate: leads.FollowUp,
        comment: leads.Comment,
      },

      
    };
  
    // try {
    //   const token = staticToken;
    //   console.log("Payload being sent:", JSON.stringify(addNewLead));
    //   const response = await fetch(`/api/BulkLead/UpdateLeadById`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(addNewLead),
    //   });

    //   if (!response.ok)
    //     throw new Error(`Failed with status: ${response.status}`);
    //   const result = await response.json();
    //   console.log("Updated successfully:", result);
    // } catch (error) {
    //   console.error("Error updating:", error);
    // }

    dispatch(UpdateBulkLeadThunk(addNewLead))
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
              }}
            >
              <FaEdit
                className="fs-1"
                style={{ marginRight: "8px", color: "#009688" }}
              />
              Edit Leads
            </h2>
          </section>
      <div>
        {showAlert && (
          <Alert variant="info" className="mt-2 text-center">
            Lead Added Successfully
          </Alert>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-1 ">
          {/*//!<------------------------------------------------------------------------------Personal Details Section------------------------------------------------------------------> */}

          <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded   mb-4">
            <div className="card-header bg-secondary px-2 py-2 rounded text-black mb-1 text-white tw-bold fs-5">
              Personal Details
            </div>
            <div>
              <div className="row g-3">
                <div className="col-md-4 ">
                  <label className="form-label">Campaign Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Client Name"
                    name="CampaignName"
                    value={leads.CampaignName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 ">
                  <label className="form-label">Client Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Client Name"
                    name="ClientName"
                    value={leads.ClientName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Assigned To</label>
                  <select
                    className="form-select"
                    name="AssignedTo"
                    value={leads.AssignedTo}
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
                    name="LeadSource"
                    value={leads.LeadSource}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    name="Mobile"
                    value={leads.Mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Alternate Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Alternate Mobile Number"
                    name="AlternateMobile"
                    value={leads.AlternateMobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Other Mobile 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Client Other Mobile Number 1"
                    name="OtherMobile1"
                    value={leads.OtherMobile1}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Other Mobile 2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Client Other Mobile Number 2"
                    name="OtherMobile2"
                    value={leads.OtherMobile2}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email ID"
                    name="Email"
                    value={leads.Email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter City"
                    name="City"
                    value={leads.City}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <select
                    className="form-select"
                    name="State"
                    value={leads.State}
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
                    name="Dob"
                    value={leads.Dob}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*//!<------------------------------------------------------------------------------Investment Details Section--------------------------------------------------------------------> */}

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
                    name="Investment"
                    value={leads.Investment}
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
                    name="Profile"
                    value={leads.Profile}
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
                    name="Trading"
                    value={leads.Trading}
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
                    name="TradingExp"
                    value={leads.TradingExp}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Lot</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Lot Size"
                    name="Lot"
                    value={leads.Lot}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Annual Income</label>
                  <select
                    className="form-select"
                    name="AnnualIncome"
                    value={leads.AnnualIncome}
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
                    name="InvestmentGoal"
                    value={leads.InvestmentGoal}
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
                    name="MarketValue"
                    value={leads.MarketValue}
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
                    name="MinInvestment"
                    value={leads.MinInvestment}
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
                    name="SourceOfIncome"
                    value={leads.SourceOfIncome}
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
                    name="PanNo"
                    value={leads.PanNo}
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
                    name="UidAadhaar"
                    value={leads.UidAadhaar}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Language</label>
                  <select
                    className="form-select"
                    name="Language"
                    value={leads.Language}
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

          {/*//!<------------------------------------------------------------------------------Followup Details Section--------------------------------------------------------------------> */}

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
                    name="LeadStatus"
                    value={leads.LeadStatus}
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
                    name="Segment"
                    value={leads.Segment}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Free Trial Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="FreeTrialStartDate"
                    value={leads.FreeTrialStartDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Free Trial End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="FreeTrialEndDate"
                    value={leads.FreeTrialEndDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Follow Up</label>
                  <input
                    type="date"
                    className="form-control"
                    name="FollowUp"
                    value={leads.FollowUp}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-8">
                  <label className="form-label">Comment</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Enter Comments"
                    name="Comment"
                    value={leads.Comment}
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

export default EditLeads;
