import React, { useEffect, useState } from "react";

import "./AddLeads.css";
import { useDispatch, useSelector } from "react-redux";
import { postAddLeadThunk } from "../../../Redux/Services/thunks/AddLeadThunk";
import { Alert } from "react-bootstrap";
import { emp, getSearchLeadMobileNoUrl, staticToken, storedUsername } from "../../../Redux/Services/apiServer/ApiServer";
import { AiOutlineUserAdd } from 'react-icons/ai';
import { getAllLeadSourceThunk } from "../../../Redux/Services/thunks/LeadSourceThunk";
import { getAllEmpCodeNameThunk } from "../../../Redux/Services/thunks/AdditionalApiThunk";
const AddLeads = () => {
  // window.scrollTo(0, 0);
  const [showAlert, setShowAlert] = useState(false);
  const [leadSource, setLeadSource] = useState([]);
  const [options, setOptions] = useState([]);
  const { data, loading, error } = useSelector((state) => state.leadsource);
  const { emplist, loading: emplistLoad, error: emplistErr } = useSelector((state) => state.additional);
  const dispatch = useDispatch();
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedLeadSource, setSelectedLeadSource] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [mobileExist, setMobileExist] = useState(false);
  const [leads, setLeads] = useState({
    CampaignName: "",
    ClientName: "",
    AssignedTo: "",
    LeadSource: "",
    Mobile: "",
    AlternateMobile: "",
    OtherMobile1: "",
    OtherMobile2: "",
    Email: "",
    City: "",
    State: "",
    Dob: 0,
    Investment: "",
    Profile: "",
    Trading: "",
    TradingExp: "",
    Lot: 0,
    annualIncome: "",
    InvestmentGoal: "",
    MarketValue: "",
    MinInvestment: "",
    SourceOfIncome: "",
    PanNo: "",
    UidAadhaar: "",
    Language: "",
    LeadStatus: "",
    Segment: "",
    FreeTrialStartDate: 0,
    FreeTrialEndDate: 0,
    FollowUp: 0,
    Comment: "",
  });



  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllEmpCodeNameThunk());
      // console.log("API called after delay");
    }, 1000);
  }, [dispatch,]);

  useEffect(() => {
    if (emplist && Array.isArray(emplist.data)) {
      console.log("Data received:", emplist);

      let transformedOptions = [];

      if (["admin", "Admin", "ADMIN"].includes(storedUsername)) {
        // Admin can see all employees
        transformedOptions = emplist.data.map((item) => ({
          id: item.employeeCode,
          employeeCode: item.employeeCode,
          employeeName: item.employeeName,
          label: `${item.employeeCode} - ${item.employeeName}`,
        }));
      } else {
        // Non-admin user: Show only their employee data
        const userEmployee = emplist.data.find((item) => item.employeeCode === emp);
        if (userEmployee) {
          transformedOptions = [
            {
              id: userEmployee.employeeCode,
              employeeCode: userEmployee.employeeCode,
              employeeName: userEmployee.employeeName,
              label: `${userEmployee.employeeCode} - ${userEmployee.employeeName}`,
            },
          ];
        }
      }

      setOptions(transformedOptions);
    } else {
      console.log("Invalid data format or no data available.");
    }
  }, [emplist, storedUsername, emp]);




  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeads((prevLeads) => ({
      ...prevLeads,
      [name]: value,
    }));
  };



  useEffect(() => {
    dispatch(getAllLeadSourceThunk());
  }, [dispatch]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(
          "https://crmapi.infinixinfotech.in/api/BulkLead/GetAllCompaignName",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${staticToken}`,
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          setCampaigns(data.data);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);





  useEffect(() => {
    if (leads.Mobile.length === 10) {
      const fetchLead = async () => {
        try {
          const response = await fetch(
            `${getSearchLeadMobileNoUrl}?Mobile=${leads.Mobile}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${staticToken}`,
              },
            }
          );

          const data = await response.json();

          if (response.ok && data.success) {
            setMobileError("Mobile number already exists!");
            setMobileExist(true);
          } else {
            setMobileError("");
            setMobileExist(false);
          }
        } catch (error) {
          setMobileError("Error fetching data");
        }
      };

      fetchLead();
    } else if (leads.Mobile.length > 0) {
      setMobileError("Mobile number must be 10 digits");
    } else {
      setMobileError("");
    }
  }, [leads.Mobile]);


  useEffect(() => {
    if (campaigns.length > 0) {
      const freshCampaign = campaigns.find((camp) =>
        camp.campaignName.includes("ADD")
      );

      if (freshCampaign) {
        setSelectedCampaign(freshCampaign.campaignName);
        setSelectedLeadSource(freshCampaign.leadSourceName);
      }
    }
  }, [campaigns]);


  const handleCampChange = (e) => {
    const selectedCamp = e.target.value;
    setSelectedCampaign(selectedCamp);
    const selectedData = campaigns.find((camp) => camp.campaignName === selectedCamp);
    setSelectedLeadSource(selectedData ? selectedData.leadSourceName : "");
  };


  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep", "Delhi", "Puducherry"
  ];

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



  const handleSubmit = (e) => {

    if (mobileExist) {
      alert("Mobile number already exists! Please enter a different number.");
      return;
    }

    e.preventDefault();
    setShowAlert(true);

    const addNewLead = {
      campaignName: selectedCampaign,
      leadId: "",
      clientName: leads.ClientName,
      assignedTo: leads.AssignedTo,
      employeeCode: leads.AssignedTo,
      leadSource: selectedLeadSource,
      mobile: leads.Mobile,
      alternateMobile: leads.AlternateMobile,
      otherMobile1: leads.OtherMobile1,
      otherMobile2: leads.OtherMobile2,
      email: leads.Email,
      city: leads.City,
      state: leads.State,
      dob: leads.Dob ? new Date(leads.Dob).toISOString().split('T')[0] : null,
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
      followupDetail: null
    };

    console.log("Lead Data Submitted:", leads);
    // Add your submission logic here
    dispatch(postAddLeadThunk(addNewLead))
      .then((response) => {
        if (response.payload === null) {
          console.error("No data received from the server");
        }
        // alert("Add Lead Successfully Submitted!");
        // console.log("Added successfully:", response);
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
          background: "linear-gradient(135deg, #2c3e50, #2c3e50)",

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
            padding: "8px 10px",
            fontSize: "28px",
            color: "white",
          }}
        >
          <AiOutlineUserAdd
            className="fs-2"
            style={{ marginRight: "8px", color: "white" }}
          />
          Add Leads
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
        <div className="container-fluid border border-2 border-dark mt-1 ">
          {/* Personal Details Section */}
          <div className="addleadSectionss field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 ">
            <div className="card-header  text-black mb-2 text-dark tw-bold fs-5"
              style={{ backgroundColor: "white" }}>
              Personal Details
            </div>
            <div>
              <div className="row g-3">

                {/* <div className="col-md-4">
                    <label className="form-label">Campaign Name</label>
                    <input
                      type="text"
                      className="form-control input-box"
                      placeholder="Enter Campaign Name"
                      name="CampaignName"
                      value={selectedCampaign}
                      readOnly
                    />
                  </div> */}

                <div className="col-md-4">
                  <label className="form-label">
                    Select Campaign<span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control input-box"
                    onChange={handleCampChange}
                    value={selectedCampaign}
                    title="This field is mandatory"
                    required
                    disabled={!["admin", "Admin", "ADMIN"].includes(storedUsername)} // Disable for non-admins
                  >
                    {["admin", "Admin", "ADMIN"].includes(storedUsername) && (
                      <option value="">Select a Campaign</option>
                    )}
                    {campaigns.map((campaign, index) => (
                      <option key={index} value={campaign.campaignName}>
                        {campaign.campaignName}
                      </option>
                    ))}
                  </select>
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
                  // required
                  />
                </div>


                <div className="col-md-4">
                  <label className="form-label">
                    Assigned To: <span className="text-danger">*</span>
                  </label>
                  <select
                    name="AssignedTo"
                    onChange={handleChange}
                    className="form-control input-box"
                    value={leads.AssignedTo || ""}
                    title="This field is mandatory"
                    required
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


                <div className="col-md-4">
                  <label className="form-label">Lead Source</label>
                  <input
                    type="text"
                    className="form-control input-box"
                    name="selectedLeadSource"
                    value={selectedLeadSource}
                    readOnly
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Mobile<span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-box"
                    placeholder="Enter Mobile Number"
                    name="Mobile"
                    value={leads.Mobile}
                    onChange={handleChange}
                    maxLength="10"
                    title="This field is mandatory"
                    required
                  />
                  {mobileError && <span className="text-danger">{mobileError}</span>}
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
                    <option value="">Select Here...</option>
                    {indianStates.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
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

          {/* Investment Details Section */}
          <div className="addleadSectionss field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded   mb-4">
            <div className="card-header  text-black mb-2 text-dark tw-bold fs-5"
              style={{ backgroundColor: "white" }}>
              Investment Detail
            </div>
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
                    <option value="">Select Investment...</option>
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
                    <option value="">Select Profile...</option>
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
                    <option value="">Select Here...</option>
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
                  <label className="form-label ">Lot</label>
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
                    name="annualIncome"
                    value={leads.annualIncome}
                    onChange={handleChange}
                  >
                    <option value="">Select Annual Income...</option>
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
                    <option value="">Select Market Value...</option>
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
                    <option value="">Select Investment...</option>
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

          {/* Followup Details Section */}
          <div className=" addleadSectionss field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded">
            <div className="card-header  text-black mb-2 text-dark tw-bold fs-5"
              style={{ backgroundColor: "white" }}>
              Followup Detail
            </div>

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


                <div className="col-md-4">
                  <label className="form-label">Segment</label>
                  <select
                    className="form-select input-box"
                    name="Segment"
                    value={leads.Segment}
                    onChange={handleChange}
                  >
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
                <div className="col-md-4">
                  <label className="form-label">Follow Up</label>
                  <input
                    type="date"
                    className="form-control input-box"
                    name="FollowUp"
                    value={leads.FollowUp}
                    onChange={handleChange}
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
          <div className="d-flex justify-content-center mb-3 mt-3">
            <button
              type="submit"
              className="btn text-white"
              style={{ backgroundColor: "#2c3e50" }}
              disabled={mobileExist} // Disable button if mobileExist is true
            >
              Submit
            </button>
          </div>

        </div>
      </form>
    </>
  );
};

export default AddLeads;
