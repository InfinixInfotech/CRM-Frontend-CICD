import React, { useEffect, useState } from "react";
import { getByIdUploadBulkLeadThunk } from "../../Redux/Services/thunks/UploadBulkLeadThunk";
import { useDispatch, useSelector } from "react-redux";
import {
  emp,
  GetcampaignNameByEmpCodeUrl,
  staticToken,
  storedUsername,
} from "../../Redux/Services/apiServer/ApiServer";
import { FaCheckCircle } from "react-icons/fa";
import ExportData from "../../Components/Button/DataButton/ExportButton";
import { HashLoader } from "react-spinners";
import { LucideChevronLeft, LucideChevronRight, PhoneCall } from "lucide-react";
import { EditButton } from "../../Components/Button/EditButton/EditButton";
import { PRButton } from "../../Components/Button/PRButton/PRButton";
import { StatusButton } from "../../Components/Button/StatusButton/StatusButton";
import DeleteButton from "../../Components/Button/DeleteButton/DeleteButton";
import { useNavigate } from "react-router-dom";
// import { getFollowUpDetailsThunk } from "../../Redux/Services/thunks/UploadBulkLeadThunk";
import { UpdateBulkLeadThunk } from "../../Redux/Services/thunks/UploadBulkLeadThunk";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { getAllEmpCodeNameThunk, getExtensionEmpThunk, postCallingEmpThunk } from "../../Redux/Services/thunks/AdditionalApiThunk";
import { getFollowUpDetailsFilterTillDateThunk } from "../../Redux/Services/thunks/FollowUpTillDateThunk";
import { getFollowUpDetailsFilterTillDateDataThunk } from "../../Redux/Services/thunks/FollowUpTillDateDataThunk";
const FollowUp = () => {
  // window.scrollTo(0, 0);
  const [followUpData, setfollowUpData] = useState([]);
  const [CampaignNames, setcampaignNames] = useState([]);
  const [firstCampaign, setFirstCampaign] = useState("");
  //!---------------------------------------Pagination State------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
 const [itemsPerPage, setItemperPage] = useState(10);
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  const { data, loading, error } = useSelector((state) => state.followuptilldatedata);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  // const [showPopup, setShowPopup] = useState(false);

  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [addstatus, setaddStatus] = useState("");
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDateTime = selectedDate
    ? moment(selectedDate).format("DD/MM/YYYY hh:mm a")
    : null;
  const { emplist, } = useSelector((state) => state.additional);
  const { data: additionalData, loading: additionalLoading, error: additionalError } = useSelector((state) => state.additional);
  const ExtensionEmp = emp;
  const [options, setOptions] = useState([]);
  const [extensionNumber, setExtensionNumber] = useState("");
  const pageOptions = [10, 20, 30, 50,70,100];
  const [updateStatus, setUpdateStatus] = useState({
    1: "BUSY",
    2: "FUTURE FOLLOWUP",
    3: "INSTERESTED",
    4: "NOT INSTERESTED",
    5: "NOT REACHABLE",
    6: "NPC",
    7: "PAID CLIENT",
    8: "SWITCH OFF",
  });

  const leadStatusMap = {
    1: "BUSY",
    2: "FUTURE FOLLOWUP",
    3: "INTERESTED",
    4: "NOT INTERESTED",
    5: "NOT REACHABLE",
    6: "NPC",
    7: "PAID CLIENT",
    8: "SWITCH OFF",
  };



  useEffect(() => {
    dispatch(getExtensionEmpThunk(ExtensionEmp));
  }, [dispatch]);


  useEffect(() => {
    if (additionalData?.data) {
      setExtensionNumber(additionalData?.data?.extensionNumber);
    }
  }, [additionalData]);



  const handleCalling = (mobileNumber, leadId, clientName) => {
    const params = {
      mobile: mobileNumber,
      extension: extensionNumber,
      leadid: leadId,
      ContactName: clientName,
    };
    dispatch(postCallingEmpThunk(params)).then(() => {
      // console.log("Call initiated with:", params);
    });
  };

  useEffect(() => {
    dispatch(getAllEmpCodeNameThunk());
  }, [dispatch]);

  useEffect(() => {
    if (emplist && Array.isArray(emplist.data)) {

      const transformedOptions = emplist.data.map((item) => ({
        id: item.employeeCode,
        employeeCode: item.employeeCode,
        employeeName: item.employeeName,
        label: `${item.employeeCode} - ${item.employeeName}`,
      }));

      setOptions(transformedOptions);
    } else {

    }
  }, [emplist]);


  const handleClosePopup = () => {
    setShowStatusPopup(false);
  };

  const CampaignNamesUrl = GetcampaignNameByEmpCodeUrl;
  const requestData = {
    EmployeeCode: emp,
    CampaignName: selectedCampaign,
    pageNumber: currentPage,
    limit: itemsPerPage,
    LeadStatus: "2",

  };

  const handleChangedropdown = (event, field) => {
    const value = event.target.value;

    if (field === "status") {
      const statusKey = Object.keys(updateStatus).find(
        (key) => updateStatus[key] === value
      );

      setaddStatus(statusKey || value);
    } else if (field === "segment") {
      setaddSegment(value);
    }
  };
  const handleupdate = async () => {
    if (!selectedLeadId) {
      console.error("Please select a lead first.");
      return;
    }
    const lead = followUpData.find(
      (followUpObj) => followUpObj.lead.leadId === selectedLeadId
    )?.lead;
    // console.log("Selected Lead:", lead);
    if (!lead) {
      // console.error("Lead not found");
      return;
    }
    const addNewLead = {
      id: lead.id,
      leadId: lead.leadId,
      campaignName: lead.campaignName,
      clientName: lead.clientName,
      assignedTo: lead.assignedTo,
      employeeCode: lead.employeeCode,
      leadSource: lead.leadSource,
      mobile: lead.mobile,
      alternateMobile: lead.alternateMobile,
      otherMobile1: lead.otherMobile1,
      otherMobile2: lead.otherMobile2,
      email: lead.email,
      city: lead.city,
      state: lead.state,
      dob: lead.dob ? new Date(lead.dob).toISOString().split('T')[0] : null,
      investmentDetail: {
        investment: lead.investmentDetail?.investment,
        profile: lead.investmentDetail?.profile,
        trading: lead.investmentDetail?.trading,
        lot: 0,
        tradingExp: lead.investmentDetail?.tradingExp,
        annualIncome: lead.investmentDetail?.annualIncome,
        investmentGoal: lead.investmentDetail?.investmentGoal,
        marketValue: lead.investmentDetail?.marketValue,
        minInvestment: lead.investmentDetail?.minInvestment,
        sourceOfIncome: lead.investmentDetail?.sourceOfIncome,
        panNo: lead.investmentDetail?.panNo,
        uidAadhaar: lead.investmentDetail?.uidAadhaar,
        amountCapping: lead.investmentDetail?.amountCapping,
      },
      language: lead.language,
      followupDetail: {
        leadStatus:
          addstatus !== "" ? addstatus : lead.followupDetail?.leadStatus || "",
        followUpDateTime: formattedDateTime || null,
      },
    };
    dispatch(UpdateBulkLeadThunk(addNewLead))
      .then((response) => {
        if (response.payload === null) {
          console.error("No data received from the server");
        }
        // setIsLoading(true);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      })
      .catch((error) => {
        console.error("Error adding:", error);
      });

    setSelectedLeadId("");
    handleClosePopup();
  };


  //!<---------------------------------------------------------------------------------REACH EDIT PAGE BY NAVIGATION ---------------------------------------------------------------------->
  const Navigate = useNavigate();
  const handleNavigateToPR = (id, leadObj) => {
    Navigate(`/paymnetRaise/${id}`, { state: { leadObj } });
  };
  const handleNavigateToEditLead = (id, leadObj) => {
    Navigate(`/editleads/${id}`, {
      state: {
        leadObj,
        LeadId: followUpData.LeadId,
      },
    });
  };
  const handleOpenPopup = (fromWhere) => {
    const popupStates = {

      status: setShowStatusPopup
    };


    if (popupStates[fromWhere]) {
      popupStates[fromWhere](true);
    }
  };


  //!------------------------------------------------- USEEFFECTS -----------------------------------------------------------------
  useEffect(() => {
    if (selectedCampaign && emp) {
      dispatch(getFollowUpDetailsFilterTillDateDataThunk(requestData));
      // console.log("getByIdUploadBulkLeadThunk----------------------")
    }
  }, [dispatch, selectedCampaign, emp, currentPage,itemsPerPage]);

  useEffect(() => {
    fetch(CampaignNamesUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${staticToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setcampaignNames(data.data);
          if (data.data.length > 0) {
            setFirstCampaign(data.data[0]);
            setSelectedCampaign(data.data[0]);
          }
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (data) {
      setfollowUpData(data?.data);
      setTotalCount(data?.totalCount || 0);
    }
  }, [data]);
  console.log(data);
  //!<---------------------------------------------------------------------------------LOGIC FOR PAGINATION---------------------------------------------------------------------->
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const handlePageChange = (newPage) => {
    console.log(totalPages)
    console.log(newPage)
    if (totalPages >= newPage) {
      setCurrentPage(newPage);
    }
  };


  const [filterData, setfilterData] = useState([]);
  const [selectedLeadSource, setSelectedLeadSource] = useState("All");
  const [ageBetween1, setAgeBetween1] = useState("");
  const [ageBetween2, setAgeBetween2] = useState("");
  const [State, setState] = useState("All");
  const [City, setCity] = useState("");
  const [employeeCode, setemployeeCode] = useState("");
  const [leadStatus, setLeadStatus] = useState("All");
  const [segment, setSegment] = useState("");
  const [filterHas, setFilterHas] = useState(false);

  const indianStates = [
    "All", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar", "Chandigarh",
    "Daman and Diu", "Lakshadweep", "Delhi",
    "Puducherry", "Ladakh", "Jammu and Kashmir"
  ];

  const fetchLeads = () => {
    const filters = {
      agebetween1: ageBetween1 || "",
      agebetween2: ageBetween2 || "",
      LeadSource: selectedLeadSource === "All" ? "" : selectedLeadSource,
      LeadStatus: "2",
      Segment: segment || "",
      state: State === "All" ? "" : State,
      city: City || "",
      pageNumber: currentPage,
      limit: itemsPerPage,
      employeeCode: employeeCode,
    };
    const hasFilters = Object.entries(filters).some(([key, value]) =>
      key !== "pageNumber" && key !== "limit" && value !== ""
    );
    //setFilterHas(hasFilters);
    if (hasFilters) {
      if ((["admin", "Admin", "ADMIN"].includes(storedUsername))) {
        dispatch(getFollowUpDetailsFilterTillDateThunk({ ...filters, employeeCode: employeeCode === "All" ? "" : employeeCode, pageNumber: currentPage, limit: itemsPerPage }));
      }
      else {
        dispatch(getFollowUpDetailsFilterTillDateThunk({ ...filters, employeeCode: emp === "All" ? "" : emp, pageNumber: currentPage, limit: itemsPerPage }));
      }
    }
    // if (hasFilters) {
    //   dispatch( getFollowUpDetailsThunk(filters));
    // } else {
    //   dispatch(getFollowUpDetailsThunk(filters));
    // }
  };
  // getFollowUpDetailsThunk
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "selectedLeadSource":
        setSelectedLeadSource(value);
        break;
      case "leadStatus":
        setLeadStatus(value);
        break;
      case "segment":
        setSegment(value);
        break;
      case "state":
        setState(value);
        break;
      case "city":
        setCity(value);
        break;
      case "employeeCode":
        setemployeeCode(value);
        // console.log("employeecode--------------", employeeCode)
        break;
      case "ageRange":
        if (value === "All") {
          setAgeBetween1("");
          setAgeBetween2("");
        } else {
          const [min, max] = value.split("-").map(Number);
          setAgeBetween1(min);
          setAgeBetween2(max);
        }
        break;
      default:
        break;
    }
  };


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLeads();

    }, 300);
    // console.log(" Curret page---------------", currentPage)
    return () => clearTimeout(delayDebounceFn);
  }, [selectedLeadSource, ageBetween1, ageBetween2, leadStatus, employeeCode, segment, State, City, currentPage, itemsPerPage, dispatch, selectedCampaign, emp,]);


  useEffect(() => {
    if (data) {
      setfilterData(data);
    }
  }, [data]);


  useEffect(() => {
    if (filterData) {
      setfollowUpData(filterData.data);
      setTotalCount(filterData?.totalCount || 0);
      // console.log("totalCount--------------------" + filterData.totalCount)
    } else {
      setLeads([]);
    }
    // console.log("filterData----------------------" + filterData);
  }, [filterData]);

  return (
    <div className="mt-5">
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
            padding: "8px 10px",
            fontSize: "28px",
            color: "white",
          }}
        >
          <FaCheckCircle
            className="fs-1"
            style={{ marginRight: "8px", color: "white" }}
          />
          Future FollowUp
        </h2>
      </section>

      <div className="bg-white border border-2 px-2 ">
        {/* Filters Row */}
        <div className="d-flex align-items-center gap-3 flex-wrap" style={{ height: "80px" }}>

          {/* Lead Source Filter */}
          <div >
            <label className="form-label">Lead Source</label>
            <select className="form-select input-box" name="selectedLeadSource" value={selectedLeadSource} onChange={handleChange}>
              <option value="All">All</option>
              <option value="Fresh Pool">Fresh Pool</option>
              <option value="Diamond Pool">Diamond Pool</option>
              <option value="Platinum Pool">Platinum Pool</option>
              <option value="HNI Pool">HNI Pool</option>
              <option value="Dispose Pool">Dispose Pool</option>
            </select>
          </div>

          {/* Age Range Filter */}
          <div>
            <label className="form-label">Search By Age</label>
            <select className="form-select input-box" name="ageRange" value={ageBetween1 && ageBetween2 ? `${ageBetween1}-${ageBetween2}` : "All"} onChange={handleChange}>
              <option value="All">All</option>
              <option value="18-25">18 - 25 years</option>
              <option value="26-35">26 - 35 years</option>
              <option value="36-45">36 - 45 years</option>
              <option value="46-55">46 - 55 years</option>
              <option value="56-65">56 - 65 years</option>
              <option value="66-75">66 - 75 years</option>
            </select>
          </div>

          {/* Lead Status Filter */}
          <div>
            <label className="form-label">Lead Status</label>
            <select className="form-select input-box" name="leadStatus" value={leadStatus} onChange={handleChange}>
              <option value="All">All</option>
              <option value="1">BUSY</option>
              <option value="2">FUTURE FOLLOWUP</option>
              <option value="3">INTERESTED</option>
              <option value="4">NOT INTERESTED</option>
              <option value="5">NOT REACHABLE</option>
              <option value="6">NPC</option>
              <option value="7">PAID CLIENT</option>
              <option value="8">SWITCH OFF</option>
            </select>
          </div>

          {/* Segment Filter */}
          <div>
            <label className="form-label w-50">Segment</label>
            <select name="segment" id="" value={segment} className="form-control input-box" onChange={handleChange} >
              <option value="All">All</option>
              <option value="Index Option">Index Option</option>
              <option value="Index Future">Index Future</option>
              <option value="Stock Option">Stock Option</option>
              <option value="Stock Future">Stock Future</option>
              <option value="Stock Cash">Stock Cash</option>
            </select>
            {/* <input type="text" className="form-control input-box" name="segment" placeholder="Enter Segment" value={segment} onChange={handleChange} /> */}
          </div>

          {/* State Filter */}
          <div>
            <label className="form-label w-50">Select State</label>
            <select className="form-select input-box" name="state" value={State} onChange={handleChange}>
              {indianStates.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>


          {storedUsername?.toLowerCase() === "admin" && (
            <div>
              <label className="form-label">Employee Name</label>
              <select
                className="form-select input-box"
                name="employeeCode"
                value={options.employeeCode}
                onChange={handleChange}
              >
                <option value="" disabled>
                  --Select Employee Name--
                </option>
                {options.map((option) => (
                  <option key={option.id} value={option.employeeCode}>
                    {option.employeeName}
                  </option>
                ))}
              </select>
            </div>
          )}



          {/* <div>
            <label className="form-label">Lead ID</label>
            <input type="text"  className="form-control input-box"
              placeholder="Enter Lead Id "
            // name=""
            // value="" 
            />
          </div> */}

        </div>
      </div>




      <div className="border border-2 border-gray mt-2">
        <h5
          className="text-dark border border-1 p-3"
          style={{
            fontSize: "1.7 rem",
            backgroundColor: "#E8F1F3",
          }}
        >
          Follow Up Details
        </h5>
        <div className="">
          <div className="lead-status-container ">
            <div className="bg-white p-2">

              {/* //!-----------------------------------------------------EXPORT DATA BUTTON----------------------------------------------------------- */}
              <div className="d-flex gap-2">
              <ExportData tableId="table-data" />
              <div>
                  <div>
                    {/* <label htmlFor="itemsPerPage">Items per page:</label> */}
                    <select
                      id="itemsPerPage"
                      value={itemsPerPage}
                      onChange={(e) => setItemperPage(Number(e.target.value))}
                      className="form-select input-box"
                    >
                      {pageOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <table
                id="table-data"
                className="table table-bordered text-center table-hover mt-2"
                style={{ fontSize: "12px" }}
              >
                <thead>
                  <tr>
                    <th>Lead Id</th>
                    <th>Client Name</th>
                    <th>mobile</th>
                    {/* <th>Mobile</th> */}
                    <th>Assigned To</th>
                    <th>Lead Source</th>
                    {/* <th>Segment</th>
                    <th>Free Trial</th>
                    <th>Follow Up</th> */}
                    <th>FollowUp Date/Time</th>
                    <th>Description</th>
                    <th>Lead status</th>
                    <th >Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(104, 102, 102, 0.5)",
                        zIndex: 9998,
                      }}
                    >
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
                    </div>
                  ) : error ? (
                    <tr>
                      <td colSpan="10" className="text-center text-danger">
                        Error: {error}
                      </td>
                    </tr>
                  ) : followUpData?.length > 0 ? (
                    followUpData.map((followUpObj) => (
                      <tr key={followUpObj.lead?.leadId}>
                        <td>{followUpObj.lead?.leadId}</td>
                        <td>{followUpObj.lead?.clientName}</td>
                        {/* <td>{followUpObj.lead?.mobile}</td> */}
                        <td> <button
                          onClick={() => handleCalling(followUpObj?.lead?.mobile, followUpObj?.lead?.leadId, followUpObj?.lead?.clientName)}
                          className="bg-transparent text-success no-padding border-0"
                        >
                          <PhoneCall size={18} className="text-blue-500" />
                        </button></td>
                        <td>{followUpObj.lead?.assignedTo}</td>
                        <td>{followUpObj.lead?.leadSource}</td>
                        {/* <td>
                          {leadStatusMap[followUpObj.lead.followupDetail?.leadStatus] || "N/A"}
                        </td> */}


                        {/* <td>{followUpObj.lead.followupDetail?.segment || "N/A"}</td>
                        <td>{followUpObj.lead.followupDetail?.freeTrialStartDate || "N/A"}</td>
                        <td>{followUpObj.lead.followupDetail?.followUpDate || "N/A"}</td> */}
                        <td style={{ fontWeight: "bold" }}>{followUpObj.lead.followupDetail?.followUpDateTime || "N/A"}</td>
                        <td>{followUpObj.lead.followupDetail?.comment || "No comments"}</td>
                        <td>
                          {followUpObj.lead.followupDetail?.leadStatus
                            ? leadStatusMap[followUpObj.lead.followupDetail.leadStatus] || "N/A"
                            : "N/A"}
                        </td>
                        <td className="text-center">
                          <div className="btn-group gap-2">
                            <div>
                              <StatusButton
                                onClick={() => {
                                  handleOpenPopup("status");
                                  setSelectedLeadId(followUpObj.lead.leadId);
                                }}
                              />
                              {showStatusPopup && (
                                <>
                                  <div
                                    className="popup-overlay d-flex justify-content-center align-items-center"
                                    onClick={handleClosePopup}
                                  ></div>
                                  <div className="salesOrder-popup-content">
                                    <h3 className="text-center mb-4">
                                      Lead Status
                                    </h3>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="segmentInput"
                                        className="form-label fw-bold"
                                      >
                                        Select Lead Status
                                      </label>
                                      <select
                                        style={{
                                          fontSize: "14px",
                                          fontWeight: "500",
                                        }}
                                        name="segmentCategory"
                                        value={updateStatus[addstatus] || ""}
                                        onChange={(event) => {
                                          handleChangedropdown(event, "status");
                                        }}
                                        className="form-select input-box"
                                      >
                                        <option value="">Select Status</option>
                                        {Object.entries(updateStatus).map(
                                          ([key, value]) => (
                                            <option key={key} value={value}>
                                              {value}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                    <div className="d-flex justify-content-between mt-4">
                                      <button
                                        className="btn btn-secondary me-2"
                                        onClick={handleClosePopup}
                                      >
                                        Close
                                      </button>
                                      <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                          handleupdate(followUpObj);
                                          console.log(followUpObj);
                                        }}
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>

                            <EditButton
                              onClick={() => {
                                handleNavigateToEditLead(
                                  followUpObj.lead.id,
                                  followUpObj
                                );
                              }}
                            />
                            <DeleteButton
                              onClick={() => handleDeleteAddLead(followUpObj.id)}
                            />
                            {followUpObj.lead?.followupDetail !== null && (
                              <PRButton
                                onClick={() => {
                                  handleNavigateToPR(followUpObj.lead.id, followUpObj);
                                }}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">No follow-up data available</td>
                    </tr>
                  )}
                </tbody>

              </table>

              {/* //!<--------------------------------------------------------------------------- PAGINATION LOGIC -------------------------------------------------------------------------- */}

              <div className="d-flex align-items-center justify-content-between">
                <div className="mb-3">
                  Showing {currentPage * itemsPerPage - itemsPerPage + 1} -{' '}
                  {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} entries
                </div>

                <div className="d-flex align-items-center justify-content-center">

                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-outline-primary p-0 btn-circle me-0"
                  >
                    <LucideChevronLeft />
                  </button>


                  <div className="mx-3 d-flex gap-2">
                    <button className="btn btn-outline-primary p-2 py-0  btn-circle">
                      {currentPage}
                    </button>
                    {/* <button className="btn btn-outline-primary p-2 py-0 btn-circle">
                      {currentPage+1} 
                    </button> */}
                  </div>

                  {/* {Array.from({ data: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`btn btn-outline-primary btn-circle me-2 ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      {index + 1}
                    </button>
                  ))} */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage == totalPages}
                    className="btn btn-outline-primary p-0 btn-circle ms-0"
                  >
                    <LucideChevronRight />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUp;