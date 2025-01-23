import React, { useEffect, useState } from "react";
// import "./ViewLeads.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteButton from "../../Components/Button/DeleteButton/DeleteButton";
import { StatusButton } from "../../Components/Button/StatusButton/StatusButton";
import { SendButton } from "../../Components/Button/SendButton/SendButton";
import { EditButton } from "../../Components/Button/EditButton/EditButton";
import { DisposeButton } from "../../Components/Button/DisposeButton/DisposeButton";
import { PrintButton } from "../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { fetchAllUploadBulkLeadThunk } from "../../Redux/Services/thunks/UploadBulkLeadThunk";
import { getByIdUploadBulkLeadThunk } from "../../Redux/Services/thunks/UploadBulkLeadThunk";
import { useNavigate } from "react-router-dom";
import { emp } from "../../Redux/Services/apiServer/ApiServer";
import { FaClipboardList } from "react-icons/fa";
import ExportData from "../../Components/Button/DataButton/ExportButton";
import { PRButton } from "../../Components/Button/PRButton/PRButton";
const ViewLeads = () => {
  const isPrGenerated = 0;
  const [editAddLead, setEditAddLead] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const requestData = {
    EmployeeCode: emp,
    CampaignName: "INF01JAN2025",
  };
  // console.log("requestData.EmployeeCode--------------------------------------",requestData.EmployeeCode);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.uploadbulklead);
  //!<---------------------------------------------------------------------------------REACH EDIT PAGE BY NAVIGATION ---------------------------------------------------------------------->
  const Navigate = useNavigate();

  const handleNavigateToSo = (id, leadObj) => {
    console.log("Navigating to /insertso with id:", id);
    console.log("Navigating to /insertso with leadObj:", leadObj);

    Navigate(`/addsalesorder/${id}`, { state: { leadObj } });
  };

  const handleNavigateToPR = (id, leadObj) => {
    // console.log("Navigating with leadObj:", leadObj);
    Navigate(`/paymnetRaise/${id}`, { state: { leadObj } });
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

  console.log(
    "currentLeads.lead.followupDetail.segment--------------------",
    currentLeads
  );
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
            // backgroundColor: "#E3E3E3",
          }}
        >
          <FaClipboardList
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Follow Up Details
        </h2>
      </section>

      <div className="container-fluid border border-2 border-gray mt-1  ">
        <div className="outerBgBox p-2  mb-2">
          <div className="container-fluid mt-3 ms-0 me-0">
            <div className="dropDownContainer p-3  mb-2">
              {/* //!<--------------------------------------------------------------------------------- FILTERS ----------------------------------------------------------------------> */}
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
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                {/* <PrintButton tableId="leads-table" />
                <PdfButton tableId="leads-table" />
                <CsvButton tableId="leads-table" />
                <CopyButton tableId="leads-table" /> */}

                <ExportData tableId="leads-table" />
              </div>
              <div>
                {/* <button
                  onClick={handleFetchLeadButton}
                  className="btn btn-secondary px-2 py-0 rounded-0 text-white "
                  disabled={isLoading}
                >
                  Fetch Lead
                </button> */}
              </div>
            </div>
            <table
              className="ViewLeadsTableFont table table-bordered table-hover mt-2"
              id="leads-table"
            >
              <thead className="tableHeader thead-dark">
                {" "}
                {/* Adjust font weight */}
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
                    <tr key={leadObj}>
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
                        {/* //!--------------------------------------------------------- */}
                        {/* {leadObj.lead.followupDetail.segment}  */}
                        {leadObj.followupDetail?.segment || "N/A"}
                      </td>
                      <td>
                        {editAddLead === leadObj.id ? (
                          <button className="btn btn-success btn-sm">
                            Save
                          </button>
                        ) : (
                          <button
                            className="viewLeadButton btn btn-sm px-2 py-0"
                            onClick={() => alert("Add Free Trial Clicked")}
                          >
                            Add FT
                          </button>
                        )}
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
                          <button
                            className="viewLeadButton btn btn-sm px-2 py-0"
                            onClick={() => alert("Add Follow Up Clicked")}
                          >
                            Add New
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-link"
                          onClick={() =>
                            alert(`Description: ${leadObj.lead.mobile}`)
                          }
                        >
                          View
                        </button>
                      </td>
                      <td>
                        <div className="btn-group d-grid gap-1 d-sm-flex">
                          <StatusButton />
                          <EditButton
                          // onClick={() => fetchAddLeadById(leadObj.EmployeeCode , leadObj.CampaignName)}
                          />
                          <DeleteButton
                            onClick={() => handleDeleteAddLead(leadObj.id)}
                          />
                          <DisposeButton />
                          <PRButton
                            isPrGenerated={isPrGenerated}
                            onClick={() => {
                              handleNavigateToPR(leadObj.lead.id, leadObj);
                            }}
                          />
                          <button
                            onClick={() => {
                              handleNavigateToSo(leadObj.lead.id, leadObj);
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
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                  >
                    {number}
                  </button>
                )
              )}
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                <i className="bi bi-arrow-right-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewLeads;
