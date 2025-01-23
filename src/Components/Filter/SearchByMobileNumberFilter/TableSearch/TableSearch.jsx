import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetLeadByMobileOrLeadIdThunk } from "../../../../Redux/Services/thunks/GetLeadByMobileOrLeadIdThunk";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../../Button/BackButton/BackButton";
import { FiSearch } from "react-icons/fi";
import ExportData from "../../../Button/DataButton/ExportButton";
import { SendButton } from "../../../Button/SendButton/SendButton";
import { StatusButton } from "../../../Button/StatusButton/StatusButton";
import { DisposeButton } from "../../../Button/DisposeButton/DisposeButton";
import { EditButton } from "../../../Button/EditButton/EditButton";
import DeleteButton from "../../../../Components/Button/DeleteButton/DeleteButton";
import { PRButton } from "../../../Button/PRButton/PRButton";
import { UpdateBulkLeadThunk } from "../../../../Redux/Services/thunks/UploadBulkLeadThunk";

const TableSearch = () => {
  const { state } = useLocation();
  const SearchData = state?.SearchData;
  const [editAddLead, setEditAddLead] = useState(null);
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

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.GetLeadByMobileOrLeadId
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(GetLeadByMobileOrLeadIdThunk());
    };
    fetchData();
  }, [dispatch]);

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

      setaddStatus(statusKey || value); // Set the status key (number) or fallback to value
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

  const handleSaveSegment = async () => {
    if (Array.isArray(SearchData)) {
      const lead = SearchData.find((item) => item.id === selectedLeadId);
      if (lead) {
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
              addstatus !== ""
                ? addstatus
                : lead.followupDetail?.leadStatus || "",
            segment:
              addSegment !== ""
                ? addSegment
                : lead.followupDetail?.segment || "",
            followUpDate:
              addFollowUpDate !== ""
                ? addFollowUpDate
                : lead.followupDetail?.followUpDate || "",
            comment:
              addComment !== ""
                ? addComment
                : lead.followupDetail?.comment || "",
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
            // setTimeout(() => {
            //   window.location.reload();
            // }, 400);
          })
          .catch((error) => {
            console.error("Error adding:", error);
          });
      }
    } else if (typeof SearchData === "object") {
      // If SearchData is an object, handle it here
      const lead = SearchData;
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
            addstatus !== ""
              ? addstatus
              : lead.followupDetail?.leadStatus || "",
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
          // setTimeout(() => {
          //   window.location.reload();
          // }, 400);
        })
        .catch((error) => {
          console.error("Error adding:", error);
        });
    } else {
      console.error("SearchData is neither an array nor an object");
    }
  };

  const Navigate = useNavigate();
  const handleNavigateToEditLead = (id, SearchData) => {
    console.log("id-------------", id);
    console.log("SearchData-------------", SearchData);

    Navigate(`/editleads/${id}`, {
      state: {
        SearchData,
        LeadId: SearchData.leadId,
      },
    });
  };

  console.log("SearchData---------------------------", SearchData.leadId);


  //!----------------------------------------------------------------------------------------------<---SET DATA FROM API ------------->------------------------------------------------------

  return (
    <div>
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
          <FiSearch
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Search
        </h2>
      </section>
      <div className="mt-5">
        <h5
          className="text-dark border border-1 pb-2"
          style={{
            // padding: "18px 16px",
            fontSize: "1.7 rem",
            backgroundColor: "#E8F1F3",
          }}
        >
          <BackButton />
          View Search Results
        </h5>

<div className="border border-2 p-2 bg-white">
<ExportData tableId="table-dataOne" />

<table
  id="table-dataOne"
  className="table table-bordered table-striped text-center mt-2"
>
  <thead>
    <tr>
      <th>Id</th>
      <th>Client Name</th>
      <th>Mobile</th>
      <th>Assigned To</th>
      <th>Lead Source</th>
      <th>Segment</th>
      <th>Free Trial</th>
      <th>Follow Up</th>
      <th>Description</th>

      {/* <th>Lead Status</th> */}
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {SearchData && Object.keys(SearchData).length > 0 ? (
      <tr>
        <td>{SearchData.id}</td>
        <td>{SearchData.clientName}</td>
        <td>{SearchData.mobile}</td>
        <td>{SearchData.assignedTo}</td>
        <td>{SearchData.leadSource}</td>
        <td>
          {editAddLead === SearchData.id ? (
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
                  setSelectedLeadId(SearchData.leadId);
                  handleOpenPopup("segment");
                }}
              >
                Add Segment
              </button>
              {showPopup && (
                <div
                  className="popup-overlay d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                  <div
                    className="popup-content bg-light p-4 rounded"
                    style={{ width: "20vw" }}
                  >
                    <h3 className="text-center mb-4">Add Segment</h3>
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
                          handleChangedropdown(event, "segment");
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
                          handleSaveSegment(SearchData);
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
        {/* //!--------------------------------------------------------------------ADD FREE TRIAL------------------------------------------------------------------------ */}
        <td>
          <button
            className="viewLead-viewLeadButton btn-sm px-2 py-0 "
            onClick={() => {
              setSelectedLeadId(SearchData.leadId);
              handleOpenPopup("freeTrial");
            }}
          >
            Add FT
          </button>
          {showFreeTrialPopup && (
            <div
              className="popup-overlay d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <div
                className="popup-content bg-light p-4 rounded shadow"
                style={{ width: "20vw" }}
              >
                <h3 className="text-center mb-4">Add Free Trial</h3>
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
                    onChange={(event) => handleChangeDate(event, "end")}
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
                      handleSaveSegment(SearchData);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </td>
        {/* //!--------------------------------------------------------------------FOLLOW UP------------------------------------------------------------------------ */}
        <td>
          <button
            className="viewLead-viewLeadButton btn-sm px-2 py-0"
            onClick={() => {
              setSelectedLeadId(SearchData.leadId);
              handleOpenPopup("followUp");
            }}
          >
            Add New
          </button>
          {showFollowUpPopup && (
            <div
              className="popup-overlay d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <div
                className="popup-content bg-light p-4 rounded shadow"
                style={{ width: "20vw" }}
              >
                <h3 className="text-center mb-4">Add Follow Up</h3>
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
                      handleSaveSegment(SearchData);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </td>
        {/* //!--------------------------------------------------------------------DISCRIPTION------------------------------------------------------------------------ */}
        <td>
          <button
            className="btn btn-sm btn-link"
            onClick={() => {
              setSelectedLeadId(SearchData.leadId);
              handleOpenPopup("comment");
            }}
          >
            View
          </button>
          {showCommentPopup && (
            <div
              className="popup-overlay d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <div
                className="popup-content bg-light p-4 rounded shadow"
                style={{ width: "20vw" }}
              >
                <h3 className="text-center mb-4">Add Comment</h3>
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
                      handleSaveSegment(SearchData);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </td>

        {/* //!----------------------------------------------------------------------STATUS BUTTON---------------------------------------------------------------- */}
        <td>
          <div className="btn-group d-grid gap-1 d-sm-flex">
            <div>
              <div>
                <StatusButton
                  onClick={() => {
                    handleOpenPopup("status");
                    setSelectedLeadId(SearchData.leadId);
                  }}
                />
                {showStatusPopup && (
                  <>
                    <div
                      className="popup-overlay d-flex justify-content-center align-items-center"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                      onClick={handleClosePopup}
                    ></div>
                    <div className="salesOrder-popup-content">
                      <h3 className="text-center mb-4">Lead Status</h3>
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
                            handleSaveSegment(SearchData);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <EditButton
              onClick={() => {
                handleNavigateToEditLead(SearchData.id, SearchData);
              }}
            />
            <DeleteButton
            // onClick={() => handleDeleteAddLead(leadObj.id)}
            />
            <DisposeButton />
            <PRButton />
            <button
              onClick={() => {
                // handleNavigateToSo(leadObj.id, leadObj);
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
            </button>
            <SendButton />
          </div>
        </td>
      </tr>
    ) : (
      <tr>
        <td colSpan="5" style={{ textAlign: "center" }}>
          No data available
        </td>
      </tr>
    )}
  </tbody>
</table>
</div>
      </div>
    </div>
  );
};

export default TableSearch;
