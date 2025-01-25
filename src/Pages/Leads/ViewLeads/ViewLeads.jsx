import React, { useEffect, useState } from "react";
import "./ViewLeads.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteButton from "../../../Components/Button/DeleteButton/DeleteButton";
import { StatusButton } from "../../../Components/Button/StatusButton/StatusButton";
import { SendButton } from "../../../Components/Button/SendButton/SendButton";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import { DisposeButton } from "../../../Components/Button/DisposeButton/DisposeButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeadPaymentRaiseThunk } from "../../../Redux/Services/thunks/LeadPaymentRaiseThunk";

import { HashLoader } from "react-spinners";
import { fetchAllUploadBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import { getByIdUploadBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import { useNavigate } from "react-router-dom";
import { emp } from "../../../Redux/Services/apiServer/ApiServer";
import { UpdateBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import ExportData from "../../../Components/Button/DataButton/ExportButton";
import { FaEye } from "react-icons/fa";
import FilterImport from "../../../Components/FilterImport/FilterImport";
import { PRButton } from "../../../Components/Button/PRButton/PRButton";

const ViewLeads = () => {
//   const handlePrSoFunctionality = ( leadId ,paymentStatus)=>{
// console.log("leadId here is --------------",leadId);
// console.log("paymentStatus here is --------------",paymentStatus);

//   }
  const [isPrGenerated, setIsPrGenerated] = useState(0)
  const [editAddLead, setEditAddLead] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [addSegment, setaddSegment] = useState("");
  const [addComment, setaddComment] = useState("");
  const [addstatus, setaddStatus] = useState("");

  const [addfreeTrialStartDate, setAddFreeTrialStartDate] = useState("");
  const [addfreeTrialEndDate, setAddFreeTrialEndDate] = useState("");
  const [addFollowUpDate, setAddFollowUpDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [showFreeTrialPopup, setShowFreeTrialPopup] = useState(false);
  const [showFollowUpPopup, setShowFollowUpPopup] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleOpenPopup = (fromWhere) => {
    if (fromWhere == "segment") {
      setShowCommentPopup(false);
      setShowFreeTrialPopup(false);
      setShowFollowUpPopup(false);
      setShowStatusPopup(false);
      setShowPopup(true);
    }
    if (fromWhere == "comment") {
      setShowPopup(false);
      setShowFreeTrialPopup(false);
      setShowFollowUpPopup(false);
      setShowStatusPopup(false);
      setShowCommentPopup(true);
    }
    if (fromWhere == "freeTrial") {
      setShowPopup(false);
      setShowCommentPopup(false);
      setShowFollowUpPopup(false);
      setShowStatusPopup(false);
      setShowFreeTrialPopup(true);
    }
    if (fromWhere == "followUp") {
      setShowPopup(false);
      setShowCommentPopup(false);
      setShowFreeTrialPopup(false);
      setShowStatusPopup(false);
      setShowFollowUpPopup(true);
    }
    if (fromWhere == "status") {
      setShowPopup(false);
      setShowCommentPopup(false);
      setShowFreeTrialPopup(false);
      setShowFollowUpPopup(false);
      setShowStatusPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowCommentPopup(false);
    setShowFreeTrialPopup(false);
    setShowFollowUpPopup(false);
    setShowStatusPopup(false);
  };

  const handleChangedropdown = (event, field) => {
    const value = event.target.value;

    if (field === "status") {
      // Find the key (number) associated with the selected status
      const statusKey = Object.keys(updateStatus).find(
        (key) => updateStatus[key] === value
      );

      setaddStatus(statusKey || value);
    } else if (field === "segment") {
      setaddSegment(value);
    }
  };

  const handleChangeInput = (event) => {
    setaddComment(event.target.value);
  };

  const handleChangeDate = (event, field) => {
    const value = event.target.value;
    if (field === "start") {
      setAddFreeTrialStartDate(value);
    } else if (field === "end") {
      setAddFreeTrialEndDate(value);
    } else if (field === "followUp") {
      setAddFollowUpDate(value);
    }
  };

  const handleupdate = async () => {
    if (!selectedLeadId) {
      console.error("Please select a lead first.");
      return;
    }

    const lead = currentLeads.find(
      (leadObj) => leadObj.lead.leadId === selectedLeadId
    )?.lead;

    console.log("Selected Lead:", lead);

    if (!lead) {
      console.error("Lead not found");
      return;
    }

    const addNewLead = {
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
      dob: lead.dob,
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
        segment:
          addSegment !== "" ? addSegment : lead.followupDetail?.segment || "",
        followUpDate:
          addFollowUpDate !== ""
            ? addFollowUpDate
            : lead.followupDetail?.followUpDate || "",
        comment:
          addComment !== "" ? addComment : lead.followupDetail?.comment || "",
        freeTrialStartDate:
          addfreeTrialStartDate !== ""
            ? addfreeTrialStartDate
            : lead.followupDetail?.freeTrialStartDate || "",
        freeTrialEndDate:
          addfreeTrialEndDate !== ""
            ? addfreeTrialEndDate
            : lead.followupDetail?.freeTrialEndDate || "",
      },
    };

    dispatch(UpdateBulkLeadThunk(addNewLead))
      .then((response) => {
        if (response.payload === null) {
          console.error("No data received from the server");
        }
        setTimeout(() => {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        console.error("Error adding:", error);
      });
    // } else {
    //   setSelectedLeadId("");
    //   handleClosePopup();
    // }

    setSelectedLeadId("");
    handleClosePopup();
  };

  // console.log("addSegment--------------", addSegment);

  const requestData = {
    EmployeeCode: emp,
    CampaignName: "CampaignName",
  };

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.uploadbulklead);

  //!<---------------------------------------------------------------------------------REACH EDIT PAGE BY NAVIGATION ---------------------------------------------------------------------->

  const Navigate = useNavigate();
  
  // const handleNavigateToSo = (id, leadObj) => {
  //   // console.log("handleNavigateToSo-----------" , leadObj);
  //   Navigate(`/addsalesorder/${id}`, { state: { leadObj } });
  // };
  const handleNavigateToPR = (id, leadObj) => {
    // console.log("leadObj.lead.leadId ----------", leadObj.lead.leadId);

    Navigate(`/paymnetRaise/${id}`, { state: { leadObj } });
  };

  const handleNavigateToEditLead = (id, leadObj) => {
    // console.log("handleNavigateToEditLead leadID ----------", leadObj.lead.leadId);

    Navigate(`/editleads/${id}`, {
      state: {
        leadObj,
        LeadId: leads.LeadId,
      },
    });
  };
  //!<---------------------------------------------------------------------------------SEND QUERY IN GET METHOD---------------------------------------------------------------------->

  const handleFetchLeadButton = () => {
    console.log("Fetching leads with requestData:", requestData);

    dispatch(fetchAllUploadBulkLeadThunk(requestData))
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  };

  useEffect(() => {
    dispatch(getByIdUploadBulkLeadThunk(requestData));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        setLeads(data);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [data]);

  //!<---------------------------------------------------------------------------------LOGIC FOR PAGINATION---------------------------------------------------------------------->

  const totalPages = Math.ceil(leads.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = Array.isArray(leads)
    ? leads.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));


  // useEffect(() => {
  //   dispatch(getAllLeadPaymentRaiseThunk())
  //     .then((response) => {
  //       if (response) {
  //         setPaymentData(response.payload.data || []);
  //       } else {
  //         setErrorMessage("No payment data found in the response.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data: ", error);
  //       alert("An error occurred while fetching data. Please try again later.");
  //     });
  // }, [dispatch]);

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
          <FaEye
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          View Leads
        </h2>
      </section>
      {/* <div>
      <h1>Filtered Payments</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {paymentData
        .filter((payment) => payment.paymentStatus === 1)
        .map((filteredPayment) => (
          <div key={filteredPayment.leadId}>
            Lead ID: {filteredPayment.leadId}, Payment Status: {filteredPayment.paymentStatus}
            {handlePrSoFunctionality(filteredPayment.leadId , filteredPayment.paymentStatus )}
          </div>
        ))}
    </div> */}
      {/* //!-------------------------------------------------------------------------------------Filter Import------------------------------------------------------------------------------------------ */}
      <FilterImport />

      <div className=" mt-1 ">
        <div className="viewLead-outerBgBox  mb-2">
          <div className="mt-3 ms-0 me-0">
            <div className="">
              {/* 
              <div className="row d-flex gap-2 mb-0 justify-content-between">
                {[
                  "Action",
                  "Marked As",
                  "Status",
                  "Vendor",
                  "State",
                  "By Date",
                  "Manager",
                  "Assigned",
                  "Lead Source",
                  "Segment",
                ].map((filter, index) => (
                  <div className="col-md-2" key={index}>
                    <div>
                      <label className="ViewLeadFormLable form-label ">
                        {filter}
                      </label>
                      <select className="formControl form-control px-2">
                        <option value="all">{filter}</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>

            <div className="border border-2 p-2 bg-white">
              <div className="d-flex gap-1">
                <div>
                  <ExportData tableId="leads-table" />
                </div>
                <div>
                  <button
                    onClick={handleFetchLeadButton}
                    className="btn btn-sm text-white "
                    style={{ backgroundColor: "#009688" }}
                    disabled={isLoading}
                  >
                    <i class="bi bi-box-arrow-down"></i> Fetch Lead
                  </button>
                </div>
              </div>

              <table
                className="viewLead-ViewLeadsTableFont table table-bordered table-hover mt-2"
                id="leads-table"
              >
                <thead className="viewLead-tableHeader thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Client Name</th>
                    <th>Mobile</th>
                    <th>Assigned To</th>
                    <th>Lead Source</th>
                    <th>Segment</th>
                    <th>Free Trial</th>
                    <th>Follow Up</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {/* //!<--------------------------------------------------------------------------------- LODER CODE ----------------------------------------------------------------------> */}

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
                  ) : currentLeads.length > 0 ? (
                    currentLeads.map((leadObj) => (
                      <tr key={leadObj.lead.leadId}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>
                          {editAddLead === leadObj.id ? (
                            <input
                              type="text"
                              value={editValue.clientName || ""}
                              onChange={(e) =>
                                setEditValue({
                                  ...editValue,
                                  clientName: e.target.value,
                                })
                              }
                            />
                          ) : (
                            leadObj.lead.clientName || "N/A"
                          )}
                        </td>
                        <td>
                          {editAddLead === leadObj.id ? (
                            <input
                              type="text"
                              value={editValue.mobile || ""}
                              onChange={(e) =>
                                setEditValue({
                                  ...editValue,
                                  mobile: e.target.value,
                                })
                              }
                            />
                          ) : (
                            leadObj.lead.mobile || "N/A"
                          )}
                        </td>
                        <td>
                          {editAddLead === leadObj.id ? (
                            <input
                              type="text"
                              value={editValue.assignedTo || ""}
                              onChange={(e) =>
                                setEditValue({
                                  ...editValue,
                                  assignedTo: e.target.value,
                                })
                              }
                            />
                          ) : (
                            leadObj.lead.assignedTo || "N/A"
                          )}
                        </td>
                        <td>
                          {editAddLead === leadObj.id ? (
                            <input
                              type="text"
                              value={editValue.leadSource || ""}
                              onChange={(e) =>
                                setEditValue({
                                  ...editValue,
                                  leadSource: e.target.value,
                                })
                              }
                            />
                          ) : (
                            leadObj.lead.leadSource || "N/A"
                          )}
                        </td>
                        <td>
                          {editAddLead === leadObj.id ? (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleSaveLead(leadObj.id)}
                            >
                              Save
                            </button>
                          ) : (
                            <>
                              {/* //!------------------------------------------------------------------ADD SEGMENT POPUP & LOGIC---------------------------------------------------------------------------- */}
                              <button
                                className="viewLead-viewLeadButton btn-sm px-2 py-0"
                                onClick={() => {
                                  setSelectedLeadId(leadObj.lead.leadId);
                                  handleOpenPopup("segment");
                                }}
                              >
                                Add Segment
                              </button>
                              {showPopup && (
                                <div className="popup-overlay d-flex justify-content-center align-items-center">
                                  <div
                                    className="popup-content bg-light p-4 rounded"
                                    style={{ width: "20vw" }}
                                  >
                                    <h3 className="text-center mb-4">
                                      Add Segment
                                    </h3>
                                    <div className="form-group mb-3">
                                      <label
                                        htmlFor="segmentSelect"
                                        className="form-label fw-bold"
                                      >
                                        Select Segment:
                                      </label>
                                      <select
                                        className="form-select"
                                        name="AddSegment"
                                        value={addSegment}
                                        onChange={(event) => {
                                          handleChangedropdown(
                                            event,
                                            "segment"
                                          );
                                        }}
                                      >
                                        <option value="" disabled>
                                          -----Select An Option-----
                                        </option>
                                        <option value="Gold">Gold</option>
                                        <option value="StockOption">
                                          Stock Option
                                        </option>
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
                                          // Add Save logic here
                                          handleupdate(leadObj);
                                        }}
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </td>
                        <td>
                          <>
                            {editAddLead === leadObj.id ? (
                              <button className="btn btn-success btn-sm">
                                Save
                              </button>
                            ) : (
                              <>
                                <button
                                  className="viewLead-viewLeadButton btn-sm px-2 py-0 "
                                  onClick={() => {
                                    setSelectedLeadId(leadObj.lead.leadId);
                                    handleOpenPopup("freeTrial");
                                  }}
                                >
                                  Add FT
                                </button>
                                {showFreeTrialPopup && (
                                  <div className="popup-overlay d-flex justify-content-center align-items-center">
                                    <div
                                      className="popup-content bg-light p-4 rounded shadow"
                                      style={{ width: "20vw" }}
                                    >
                                      <h3 className="text-center mb-4">
                                        Add Free Trial
                                      </h3>
                                      <div className="form-group mb-3">
                                        <label
                                          htmlFor="segmentInput"
                                          className="form-label fw-bold"
                                        >
                                          Enter Start Date
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          name="addfreeTrialStartDate"
                                          value={addfreeTrialStartDate}
                                          onChange={(event) =>
                                            handleChangeDate(event, "start")
                                          }
                                        />
                                      </div>

                                      <div className="form-group mb-3">
                                        <label
                                          htmlFor="segmentInput"
                                          className="form-label fw-bold"
                                        >
                                          Enter End Date
                                        </label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          name="addfreeTrialEndDate"
                                          value={addfreeTrialEndDate}
                                          onChange={(event) =>
                                            handleChangeDate(event, "end")
                                          }
                                        />
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
                                            handleupdate(leadObj);
                                          }}
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        </td>

                        <td>
                          {editAddLead === leadObj.id ? (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleSaveLead(lead.id)}
                            >
                              Save
                            </button>
                          ) : (
                            <>
                              <button
                                className="viewLead-viewLeadButton btn-sm px-2 py-0"
                                onClick={() => {
                                  setSelectedLeadId(leadObj.lead.leadId);
                                  handleOpenPopup("followUp");
                                }}
                              >
                                Add New
                              </button>
                              {showFollowUpPopup && (
                                <div className="popup-overlay d-flex justify-content-center align-items-center">
                                  <div
                                    className="popup-content bg-light p-4 rounded shadow"
                                    style={{ width: "20vw" }}
                                  >
                                    <h3 className="text-center mb-4">
                                      Add Follow Up
                                    </h3>
                                    <div className="form-group mb-3">
                                      <label
                                        htmlFor="segmentInput"
                                        className="form-label fw-bold"
                                      >
                                        Enter FollowUp Date
                                      </label>
                                      <input
                                        type="date"
                                        className="form-control"
                                        name="addFollowUpDate"
                                        value={addFollowUpDate}
                                        onChange={(event) =>
                                          handleChangeDate(event, "followUp")
                                        }
                                      />
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
                                          handleupdate(leadObj);
                                        }}
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-link"
                            onClick={() => {
                              setSelectedLeadId(leadObj.lead.leadId);
                              handleOpenPopup("comment");
                            }}
                          >
                            View
                          </button>
                          {showCommentPopup && (
                            <div className="popup-overlay d-flex justify-content-center align-items-center">
                              <div
                                className="popup-content bg-light p-4 rounded shadow"
                                style={{ width: "20vw" }}
                              >
                                <h3 className="text-center mb-4">
                                  Add Comment
                                </h3>
                                <div className="form-group mb-3">
                                  <label
                                    htmlFor="segmentInput"
                                    className="form-label fw-bold"
                                  >
                                    Enter Comment:
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="AddComment"
                                    value={addComment}
                                    onChange={handleChangeInput}
                                    placeholder="Enter Comment here"
                                  />
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
                                      handleupdate(leadObj);
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="btn-group d-grid gap-1 d-sm-flex">
                            <div>
                              <StatusButton
                                onClick={() => {
                                  handleOpenPopup("status");
                                  setSelectedLeadId(leadObj.lead.leadId);
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
                                        className="form-select"
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
                                          handleupdate(leadObj);
                                          console.log(leadObj);
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
                                  leadObj.lead.id,
                                  leadObj
                                );
                              }}
                            />
                            <DeleteButton
                              onClick={() => handleDeleteAddLead(leadObj.id)}
                            />
                            <DisposeButton />
                            <PRButton
                              // leadId={leadObj.lead.leadId} 
                              isPrGenerated={isPrGenerated}
                              onClick={() => {
                                handleNavigateToPR(leadObj.lead.id, leadObj);
                              }}
                            />
                            
                            {/* <button
                              onClick={() => {
                                handleNavigateToSo(leadObj.id, leadObj);
                              }}
                              style={{
                                padding: 2,
                                margin: 0,
                                fontSize: "12px",
                                color: "white",
                                border: "1px solid grey",
                                fontWeight: "600",
                                borderRadius: "0",
                                backgroundColor: "#758694",
                              }}
                            >
                              Add SO
                            </button> */}
                            <SendButton />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10">No data available in table</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* //!<--------------------------------------------------------------------------- PAGINATION LOGIC -------------------------------------------------------------------------- */}

              <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  <i className="bi bi-arrow-left-circle"></i>
                </button>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  <i className="bi bi-arrow-right-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewLeads;
