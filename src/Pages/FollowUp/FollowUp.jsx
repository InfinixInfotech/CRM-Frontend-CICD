import React, { useEffect, useState } from "react";
import { getByIdUploadBulkLeadThunk } from "../../Redux/Services/thunks/UploadBulkLeadThunk";
import { useDispatch, useSelector } from "react-redux";
import {
  emp,
  GetcampaignNameByEmpCodeUrl,
  staticToken,
} from "../../Redux/Services/apiServer/ApiServer";
import { FaCheckCircle } from "react-icons/fa";
import ExportData from "../../Components/Button/DataButton/ExportButton";
import { HashLoader } from "react-spinners";

const FollowUp = () => {
  const [followUpData, setfollowUpData] = useState([]);
  const [CampaignNames, setcampaignNames] = useState([]);
  const [firstCampaign, setFirstCampaign] = useState("");
  //!---------------------------------------Pagination State------------------------------------------
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  console.log(followUpData);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.uploadbulklead);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const handleCampaignNames = (event) => {
    setSelectedCampaign(event.target.value);
  };
  const CampaignNamesUrl = GetcampaignNameByEmpCodeUrl;

  const requestData = {
    EmployeeCode: emp,
    CampaignName: selectedCampaign,
  };
//!------------------------------------------------- USEEFFECTS -----------------------------------------------------------------
  useEffect(() => {
    if (selectedCampaign && emp) {
      dispatch(getByIdUploadBulkLeadThunk(requestData));
    }
  }, [dispatch, selectedCampaign, emp]);

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
      setfollowUpData(data);
      console.log("Updated followUpData:", data);
    }
  }, [data]);
  console.log(data);
  //!<---------------------------------------------------------------------------------LOGIC FOR PAGINATION---------------------------------------------------------------------->

  const totalPages = Math.ceil(followUpData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = Array.isArray(followUpData)
    ? followUpData.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="mt-5">
      <section
        style={{
          position: "relative",
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
          <FaCheckCircle
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Follow Up
        </h2>
      </section>
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
              <ExportData tableId="table-data" />
              <table
                id="table-data"
                className="table table-bordered table-striped mt-2"
                style={{ fontSize: "14px" }}
              >
                <thead>
                  <tr>
                    <th>Lead Id</th>
                    <th>Client Name</th>
                    <th>Mobile</th>
                    <th>Assigned To</th>
                    <th>Lead Source</th>
                    <th>Lead Status</th>
                    <th>Segment</th>
                    <th>Free Trial</th>
                    <th>Follow Up</th>
                    <th>Description</th>
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
                      <td colSpan="2" className="text-center text-danger">
                        Error: {error}
                      </td>
                    </tr>
                  ) : followUpData.length > 0 ? (
                    currentLeads.map((followUpObj) => {
                      const followupDetail = followUpObj.lead.followupDetail;
                      if (!followupDetail) {
                        return null;
                      }
                      return (
                        <tr key={followUpObj.lead.leadId}>
                          <td>{followUpObj.lead.leadId}</td>
                          <td>{followUpObj.lead.clientName}</td>
                          <td>{followUpObj.lead.mobile}</td>
                          <td>{followUpObj.lead.assignedTo}</td>
                          <td>{followUpObj.lead.leadSource}</td>
                          <td>
                            {followUpObj.lead.followupDetail.leadStatus ||
                              "N/A"}
                          </td>
                          <td>
                            {followUpObj.lead.followupDetail.segment || "N/A"}
                          </td>
                          <td>
                            {followUpObj.lead.followupDetail
                              ? followUpObj.lead.followupDetail
                                  .freeTrialStartDate
                              : "N/A"}
                          </td>
                          <td>
                            {followUpObj.lead.followupDetail
                              ? followUpObj.lead.followupDetail.followUpDate
                              : "N/A"}
                          </td>
                          <td>
                            {followUpObj.lead.followupDetail
                              ? followUpObj.lead.followupDetail.comment
                              : "No comments"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8">No follow-up data available</td>
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
    </div>
  );
};

export default FollowUp;