import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { emp, staticToken } from "../../../Redux/Services/apiServer/ApiServer";
import { postAddLeadThunk } from "../../../Redux/Services/thunks/AddLeadThunk";
import { useLocation } from "react-router-dom";
import { UpdateBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import { FaEdit } from "react-icons/fa";
import { getAllEmpCodeNameThunk } from "../../../Redux/Services/thunks/AdditionalApiThunk";
import { getAllLeadSourceThunk } from "../../../Redux/Services/thunks/LeadSourceThunk";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import AlertBox from "../../../Components/AlertBox/AlertBox";
import { HashLoader } from "react-spinners";

const EditLeads = () => {
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const recievedLeadData = state?.leadObj?.lead || {};
  const recievedLeadTableData = state?.SearchData || {};
  const [leadSource, setLeadSource] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {  setSelectedDate(date); };
  const { data, loading, error } = useSelector((state) => state.leadsource);
  const { emplist, loading: emplistLoad, error: emplistErr } = useSelector((state) => state.additional);
  const [options, setOptions] = useState([]);

  const leadSourceList = [
    { id: 1, leadSourceValue: "Fresh Pool" },
    { id: 2, leadSourceValue: "Diamond Pool" },
    { id: 3, leadSourceValue: "Platinum Pool" },
    { id: 4, leadSourceValue: "HNI Pool" },
    { id: 5, leadSourceValue: "Web Leads" },
    { id: 6, leadSourceValue: "Dispose Pool" }
  ];



  const [leads, setLeads] = useState({
    leadId: recievedLeadData?.leadId || recievedLeadTableData?.leadId || "",
    CampaignName:
      recievedLeadData?.campaignName ||
      recievedLeadTableData?.campaignName ||
      "",
    ClientName:
      recievedLeadData?.clientName || recievedLeadTableData?.clientName || "",
    AssignedTo:
      recievedLeadData?.assignedTo || recievedLeadTableData?.assignedTo || "",
    LeadSource:
      recievedLeadData?.leadSource || recievedLeadTableData?.leadSource || "",
    Mobile: recievedLeadData?.mobile || recievedLeadTableData?.mobile || "",
    AlternateMobile:
      recievedLeadData?.alternateMobile ||
      recievedLeadTableData?.alternateMobile ||
      "",
    OtherMobile1:
      recievedLeadData?.otherMobile1 ||
      recievedLeadTableData?.otherMobile1 ||
      "",
    OtherMobile2:
      recievedLeadData?.otherMobile2 ||
      recievedLeadTableData?.otherMobile2 ||
      "",
    Email: recievedLeadData?.email || recievedLeadTableData?.email || "",
    City: recievedLeadData?.city || recievedLeadTableData?.city || "",
    State: recievedLeadData?.state || recievedLeadTableData?.state || "",
    Dob: recievedLeadData?.dob || recievedLeadTableData?.dob || "",
    Investment:
      recievedLeadData?.investment || recievedLeadTableData?.investment || "",
    Profile: recievedLeadData?.profile || recievedLeadTableData?.profile || "",
    Trading: recievedLeadData?.trading || recievedLeadTableData?.trading || "",
    TradingExp:
      recievedLeadData?.tradingExp || recievedLeadTableData?.tradingExp || "",
    Lot: recievedLeadData?.lot || recievedLeadTableData?.lot || 0,
    AnnualIncome:
      recievedLeadData?.annualIncome ||
      recievedLeadTableData?.annualIncome ||
      "",
    InvestmentGoal:
      recievedLeadData?.investmentGoal ||
      recievedLeadTableData?.investmentGoal ||
      "",
    MarketValue:
      recievedLeadData?.marketValue || recievedLeadTableData?.marketValue || "",
    MinInvestment:
      recievedLeadData?.minInvestment ||
      recievedLeadTableData?.minInvestment ||
      "",
    SourceOfIncome:
      recievedLeadData?.sourceOfIncome ||
      recievedLeadTableData?.sourceOfIncome ||
      "",
    PanNo: recievedLeadData?.panNo || recievedLeadTableData?.panNo || "",
    UidAadhaar:
      recievedLeadData?.uidAadhaar || recievedLeadTableData?.uidAadhaar || "",
    Language:
      recievedLeadData?.language || recievedLeadTableData?.language || "",
    LeadStatus:
      recievedLeadData?.leadStatus || recievedLeadTableData?.leadStatus || "",
    Segment: recievedLeadData?.segment || recievedLeadTableData?.segment || "",
    FreeTrialStartDate:
      recievedLeadData?.freeTrialStartDate ||
      recievedLeadTableData?.freeTrialStartDate ||
      "",
    FreeTrialEndDate:
      recievedLeadData?.freeTrialEndDate ||
      recievedLeadTableData?.freeTrialEndDate ||
      "",
    FollowUp:
      recievedLeadData?.followUp || recievedLeadTableData?.followUp || "",
    Comment: recievedLeadData?.comment || recievedLeadTableData?.comment || "",
    FollowUpDateTime: recievedLeadData?.followUpDateTime || recievedLeadTableData?.followUpDateTime || "",
  });

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    setLeads({
      leadId: recievedLeadData?.leadId || recievedLeadTableData?.leadId || "",
      CampaignName:
        recievedLeadData?.campaignName ||
        recievedLeadTableData?.campaignName ||
        "",
      ClientName:
        recievedLeadData?.clientName || recievedLeadTableData?.clientName || "",
      AssignedTo:
        recievedLeadData?.assignedTo || recievedLeadTableData?.assignedTo || "",
      LeadSource:
        recievedLeadData?.leadSource || recievedLeadTableData?.leadSource || "",
      Mobile: recievedLeadData?.mobile || recievedLeadTableData?.mobile || "",
      AlternateMobile:
        recievedLeadData?.alternateMobile ||
        recievedLeadTableData?.alternateMobile ||
        "",
      OtherMobile1:
        recievedLeadData?.otherMobile1 ||
        recievedLeadTableData?.otherMobile1 ||
        "",
      OtherMobile2:
        recievedLeadData?.otherMobile2 ||
        recievedLeadTableData?.otherMobile2 ||
        "",
      Email: recievedLeadData?.email || recievedLeadTableData?.email || "",
      City: recievedLeadData?.city || recievedLeadTableData?.city || "",
      State: recievedLeadData?.state || recievedLeadTableData?.state || "",
      Dob: recievedLeadData?.dob || recievedLeadTableData?.dob || "",
      Investment:
        recievedLeadData?.investment || recievedLeadTableData?.investment || "",
      Profile:
        recievedLeadData?.profile || recievedLeadTableData?.profile || "",
      Trading:
        recievedLeadData?.trading || recievedLeadTableData?.trading || "",
      TradingExp:
        recievedLeadData?.tradingExp || recievedLeadTableData?.tradingExp || "",
      Lot: recievedLeadData?.lot || recievedLeadTableData?.lot || 0,
      AnnualIncome:
        recievedLeadData?.annualIncome ||
        recievedLeadTableData?.annualIncome ||
        "",
      InvestmentGoal:
        recievedLeadData?.investmentGoal ||
        recievedLeadTableData?.investmentGoal ||
        "",
      MarketValue:
        recievedLeadData?.marketValue ||
        recievedLeadTableData?.marketValue ||
        "",
      MinInvestment:
        recievedLeadData?.minInvestment ||
        recievedLeadTableData?.minInvestment ||
        "",
      SourceOfIncome:
        recievedLeadData?.sourceOfIncome ||
        recievedLeadTableData?.sourceOfIncome ||
        "",
      PanNo: recievedLeadData?.panNo || recievedLeadTableData?.panNo || "",
      UidAadhaar:
        recievedLeadData?.uidAadhaar || recievedLeadTableData?.uidAadhaar || "",
      Language:
        recievedLeadData?.language || recievedLeadTableData?.language || "",
      LeadStatus:
        recievedLeadData?.leadStatus || recievedLeadTableData?.leadStatus || "",
      Segment:
        recievedLeadData?.followupDetail?.segment || recievedLeadTableData?.segment || "",
      FreeTrialStartDate:
        recievedLeadData?.freeTrialStartDate ||
        recievedLeadTableData?.freeTrialStartDate ||
        "",
      FreeTrialEndDate:
        recievedLeadData?.freeTrialEndDate ||
        recievedLeadTableData?.freeTrialEndDate ||
        "",
      FollowUp:
        recievedLeadData?.followUp || recievedLeadTableData?.followUp || "",
      Comment:
        recievedLeadData?.comment || recievedLeadTableData?.comment || "",
      FollowUpDateTime:
        recievedLeadData?.followUpDateTime || recievedLeadTableData?.followUpDateTime || "",
    });
  }, []);



  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllEmpCodeNameThunk());
      // console.log("API called after delay");
    }, 1000); // Delay of 2 seconds
  }, [dispatch,]);


  // useEffect(() => {
  //   dispatch(getUserByIdThunk(userId));
  //   // console.log("data-----------------", data);
  // }, [dispatch]);

  useEffect(() => {
    if (emplist && Array.isArray(emplist.data)) {
      // console.log("Data received:", emplist);
      const transformedOptions = emplist.data.map((item) => ({
        id: item.employeeCode,
        employeeCode: item.employeeCode,
        employeeName: item.employeeName,
        label: `${item.employeeCode} - ${item.employeeName}`,
      }));

      setOptions(transformedOptions);
    } else {
      // console.log("Invalid data format or no data available.");
    }
  }, [emplist]);

  useEffect(() => {
    dispatch(getAllLeadSourceThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const sortedData = [...data.data].sort((a, b) => b.id - a.id);
      setLeadSource(sortedData);
    }
  }, [data]);

  const [states, setStates] = useState([]);

  useEffect(() => {
    // List of Indian States
    const indianStates = [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
      "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
      "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
      "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
      "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi",
      "Puducherry", "Ladakh", "Jammu and Kashmir"
    ];

    setStates(indianStates);
  }, []);


  const investmentOptions = [
    "Less than ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹5,00,000",
    "₹5,00,000 - ₹10,00,000",
    "₹10,00,000 - ₹25,00,000",
    "₹25,00,000 - ₹50,00,000",
    "Above ₹50,00,000"
  ];

  const profileOptions = [
    "Student",
    "Business",
    "Investor",
    "Trader",
    "Freelancer",
    "Self-Employed",
    "Government Employee",
    "Private Employee",
    "Retired",
  ];

  const annualIncomeOptions = [
    "Below 1 Lakh",
    "1-5 Lakh",
    "5-10 Lakh",
    "10-25 Lakh",
    "25-50 Lakh",
    "50 Lakh - 1 Crore",
    "Above 1 Crore"
  ];

  const minInvestmentOptions = [
    "< 50,000",
    "50,000 - 1 Lakh",
    "1 - 5 Lakh",
    "5 - 10 Lakh",
    "10 - 25 Lakh",
    "25 - 50 Lakh",
    "50 Lakh - 1 Crore",
    "Above 1 Crore"
  ];

  const leadStatusOptions = [
    "BUSY",
    "FUTURE FOLLOWUP",
    "INTERESTED",
    "NOT INTERESTED",
    "NOT REACHABLE",
    "NPC",
    "PAID CLIENT",
    "SWITCH OFF"
  ];


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
    const formattedDateTime = selectedDate
      ? moment(selectedDate).format("DD/MM/YYYY hh:mm a")
      : null;

    const addNewLead = {
      leadId: leads.leadId,
      campaignName: leads.CampaignName,
      clientName: leads.ClientName,
      assignedTo: leads.AssignedTo,
      employeeCode: leads.AssignedTo,
      leadSource: leads.LeadSource,
      mobile: leads.Mobile,
      alternateMobile: leads.AlternateMobile,
      otherMobile1: leads.OtherMobile1,
      otherMobile2: leads.OtherMobile2,
      email: leads.Email,
      city: leads.City,
      state: leads.State,
      dob: leads.Dob ? new Date(leads.Dob).toISOString().split("T")[0] : null,
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
        freeTrialStartDate: leads.FreeTrialStartDate ? new Date(leads.FreeTrialStartDate).toISOString().split("T")[0] : null,
        freeTrialEndDate: leads.FreeTrialEndDate ? new Date(leads.FreeTrialEndDate).toISOString().split("T")[0] : null,
        followUpDate: leads.FollowUp ? new Date(leads.FollowUp).toISOString().split("T")[0] : null,
        followUpDateTime: formattedDateTime,
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
    setLoading(true)

    dispatch(UpdateBulkLeadThunk(addNewLead))
      .then((response) => {
        if (response.payload?.success) {
          alert(response.payload.message || "Edit Leads Successfully");
        } else {
          console.error("Error:", response.payload?.message || "Something went wrong");
          alert(response.payload?.message || "Something went wrong");
        }
        setShowAlert(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => {
        console.error("Error updating lead:", error);
        alert("An error occurred while updating the lead.");
      })
      .finally(() => {
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
          marginBottom: "5px",
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
            style={{ marginRight: "8px", color: "#2c3e50" }}
          />
          Edit Leads
        </h2>

      </section>
      {/* <BackButton to="/viewleads" /> */}

      <div>
        {/* {showAlert && (
          <Alert variant="info" className="mt-2 text-center">
            Lead Added Successfully
          </Alert>
        )} */}
      </div>
      <form >
        <div className="mt-1 ">
          <div>
            {Loading && !showAlert && (
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
          {/*//!<------------------------------------------------------------------------------Personal Details Section------------------------------------------------------------------> */}
          <div className=" field-container border  border-1 border-gray rounded mt-2 me-0 ms-0 mb-2">
            <h5
              className="text-dark border border-1  p-3"
              style={{
                // padding: "18px 16px",
                fontSize: "1.7 rem",
                backgroundColor: "#E8F1F3",
              }}
            >
              Personal Details
            </h5>
            <div className="p-3">
              <div>
                <div className="row g-3">
                  <div className="col-md-4 ">
                    <label className="form-label">Campaign Name</label>
                    <input
                      type="text"
                      className="form-control input-box"
                      placeholder="Enter Client Name"
                      name="CampaignName"
                      value={leads.CampaignName}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="col-md-4 ">
                    <label className="form-label">Client Name</label>
                    <input
                      type="text"
                      className="form-control input-box"
                      placeholder="Enter Client Name"
                      name="ClientName"
                      value={leads.ClientName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Assigned To:</label>
                    <select
                      name="AssignedTo"
                      onChange={handleChange}
                      className="form-control input-box"
                      value={leads.AssignedTo || ""}
                    >
                      <option value="" disabled>
                        --Select Assigned Person--
                      </option>
                      {options.map((option) => (
                        <option key={option} value={option.employeeCode}>
                          {option.employeeName}
                        </option>
                      ))}
                    </select>
                  </div>


                  {/* <div className="col-md-4">
                    <label className="form-label">Lead Source</label>
                    <select
                      className="form-control input-box"
                      name="LeadSource"
                      value={leads.LeadSource}
                      onChange={handleChange}
                    >
                      <option value="">Select Lead Source</option>
                      {leadSource.map((item) => (
                        <option key={item.id} value={item.leadSourceValue}>
                          {item.leadSourceValue}
                        </option>
                      ))}
                    </select>
                  </div> */}

                  <div className="col-md-4">
                    <label className="form-label">Lead Source</label>
                    <input
                      type="text"
                      className="form-control input-box"
                      name="LeadSource"
                      value={leads.LeadSource || ""}
                      readOnly
                    />
                  </div>





                  <div className="col-md-4">
                    <label className="form-label">Mobile</label>
                    <input
                      type="text"
                      className="form-control input-box"
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
                      className="form-control input-box"
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
                      className="form-control input-box"
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
                      className="form-control input-box"
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
                      className="form-control input-box"
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
                      className="form-control input-box"
                      placeholder="Enter City"
                      name="City"
                      value={leads.City}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">State</label>
                    <select
                      className="form-select input-box"
                      name="State"
                      value={leads.State}
                      onChange={handleChange}
                    >
                      <option value="">--Select Here--</option>
                      {states.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">DOB</label>
                    <input
                      type="date"
                      className="form-control input-box"
                      name="Dob"
                      value={leads.Dob}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*//!<------------------------------------------------------------------------------Investment Details Section--------------------------------------------------------------------> */}
          <div className=" field-container border  border-1 border-gray rounded mt-2 me-0 ms-0 mb-2">
            <h5
              className="text-dark border border-1  p-3"
              style={{
                // padding: "18px 16px",
                fontSize: "1.7 rem",
                backgroundColor: "#E8F1F3",
              }}
            >
              Investment Detail
            </h5>
            <div className="p-3">
              <div className="card-body">
                <div className="row g-3">



                  <div className="col-md-4">
                    <label className="form-label">Investment</label>
                    <select
                      className="form-select input-box"
                      name="Investment"
                      value={leads.Investment}
                      onChange={handleChange}
                    >
                      <option value="">--Select Investment--</option>
                      {investmentOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>



                  <div className="col-md-4">
                    <label className="form-label">Profile</label>
                    <select
                      className="form-select input-box"
                      name="Profile"
                      value={leads.Profile}
                      onChange={handleChange}
                    >
                      <option value="">--Select Profile--</option>
                      {profileOptions.map((profile, index) => (
                        <option key={index} value={profile}>
                          {profile}
                        </option>
                      ))}
                    </select>
                  </div>


                  <div className="col-md-4">
                    <label className="form-label">Trading</label>
                    <select
                      className="form-select input-box"
                      name="Trading"
                      value={leads.Trading}
                      onChange={handleChange}
                    >
                      <option value="">--Select Here--</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                    </select>
                  </div>


                  <div className="col-md-4">
                    <label className="form-label">Trading Exp</label>
                    <input
                      type="text"
                      className="form-control input-box"
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
                      className="form-control input-box"
                      placeholder="Enter Lot Size"
                      name="Lot"
                      value={leads.Lot}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="col-md-4">
                    <label className="form-label">Annual Income</label>
                    <select
                      className="form-select input-box"
                      name="AnnualIncome"
                      value={leads.AnnualIncome}
                      onChange={handleChange}
                    >
                      <option value="">--Select Annual Income--</option>
                      {annualIncomeOptions.map((income, index) => (
                        <option key={index} value={income}>
                          {income}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Investment Goal</label>
                    <select
                      className="form-select input-box"
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
                      className="form-select input-box"
                      name="MarketValue"
                      value={leads.MarketValue}
                      onChange={handleChange}
                    >
                      <option value="">--Select Market Value--</option>
                      <option value="< 1 Lakh">Less than 1 Lakh</option>
                      <option value="1-5 Lakh">1 - 5 Lakh</option>
                      <option value="5-10 Lakh">5 - 10 Lakh</option>
                      <option value="10-25 Lakh">10 - 25 Lakh</option>
                      <option value="25-50 Lakh">25 - 50 Lakh</option>
                      <option value="50 Lakh - 1 Crore">50 Lakh - 1 Crore</option>
                      <option value="Above 1 Crore">Above 1 Crore</option>
                    </select>
                  </div>


                  <div className="col-md-4">
                    <label className="form-label">Min. Investment</label>
                    <select
                      className="form-select input-box"
                      name="MinInvestment"
                      value={leads.MinInvestment}
                      onChange={handleChange}
                    >
                      <option value="">--Select Investment--</option>
                      {minInvestmentOptions.map((investment, index) => (
                        <option key={index} value={investment}>
                          {investment}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Source of Income</label>
                    <select
                      className="form-select input-box"
                      name="SourceOfIncome"
                      value={leads.SourceOfIncome}
                      onChange={handleChange}
                    >
                      <option value="">--Select Source of Income--</option>
                      <option value="Salary">Salary</option>
                      <option value="Business">Business</option>
                      <option value="Investments">Investments</option>
                      <option value="Freelancing">Freelancing</option>
                      <option value="Pension">Pension</option>
                      <option value="Rental Income">Rental Income</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Pan No.</label>
                    <input
                      type="text"
                      className="form-control input-box"
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
                      className="form-control input-box"
                      placeholder="Enter Aadhaar Number"
                      name="UidAadhaar"
                      value={leads.UidAadhaar}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="col-md-4">
                    <label className="form-label">Language</label>
                    <select
                      className="form-select input-box"
                      name="Language"
                      value={leads.Language}
                      onChange={handleChange}
                    >
                      <option value="">--Select Here--</option>
                      <option value="Hindi">Hindi</option>
                      <option value="English">English</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>



                </div>
              </div>
            </div>
          </div>
          {/*//!<------------------------------------------------------------------------------Followup Details Section--------------------------------------------------------------------> */}
          <div className=" field-container border  border-1 border-gray rounded mt-2 me-0 ms-0 mb-2">
            <h5
              className="text-dark border border-1  p-3"
              style={{
                // padding: "18px 16px",
                fontSize: "1.7 rem",
                backgroundColor: "#E8F1F3",
              }}
            >
              Followup Detail
            </h5>
            <div className="p-3">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Lead Status</label>
                    <select
                      className="form-select input-box"
                      name="LeadStatus"
                      value={leads.LeadStatus}
                      onChange={handleChange}
                    >
                      <option value="">None</option>
                      {leadStatusOptions.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className="col-md-4">
                    <label className="form-label">Segment</label>
                    <input
                      type="text"
                      className="form-control input-box"
                      placeholder="Select Some Options"
                      name="Segment"
                      value={leads.Segment}
                      onChange={handleChange}
                    />
                  </div> */}



                  <div className="col-md-4">
                    <label className="form-label">Segment</label>
                    <select
                      className="form-select input-box"
                      name="Segment"
                      value={leads.Segment}
                      onChange={handleChange}
                    >
                      <option value="" disabled>--Select Segment Name</option>
                      <option value="Index Option">Index Option</option>
                      <option value="Index Future">Index Future</option>
                      <option value="Stock Option">Stock Option</option>
                      <option value="Stock Future">Stock Future</option>
                      <option value="Stock Cash">Stock Cash</option>
                    </select>
                  </div>



                  <div className="col-md-4">
                    <label className="form-label">Free Trial Start Date</label>
                    <input
                      type="date"
                      className="form-control input-box"
                      name="FreeTrialStartDate"
                      value={leads.FreeTrialStartDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Free Trial End Date</label>
                    <input
                      type="date"
                      className="form-control input-box"
                      name="FreeTrialEndDate"
                      value={leads.FreeTrialEndDate}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="col-md-4">
                    <label className="form-label">Follow Up</label>
                    <input
                      type="date"
                      className="form-control input-box"
                      name="FollowUp"
                      value={leads.FollowUp}
                      onChange={handleChange}
                    />
                  </div> */}

                  <div className="col-md-8">
                    <label className="block text-lg font-semibold mb-2">Select Date & Time</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      showTimeSelect
                      dateFormat="dd/MM/yyyy h:mm aa"
                      timeFormat="h:mm aa"
                      timeIntervals={1}
                      className="p-2 border rounded"
                    />
                  </div>

                  <div className="col-md-8">
                    <label className="form-label">Comment</label>
                    <textarea
                      className="form-control input-box"
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
          </div>
          {/* <div className="d-flex justify-content-center">
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-sm text-white px-4 fs-6"
              style={{ backgroundColor: "#2c3e50" }}>
              Submit
            </button>
          </div> */}

          <div className="container mt-3 text-center">

            <button
              type="submit"
              className="btn btn-primary mt-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditLeads;
