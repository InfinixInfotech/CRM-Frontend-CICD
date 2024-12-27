import React, { useEffect, useState } from "react";
import "./ViewLeads.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteButton from "../../../Components/Button/DeleteButton/DeleteButton";
import { StatusButton } from "../../../Components/Button/StatusButton/StatusButton";
import { SendButton } from "../../../Components/Button/SendButton/SendButton";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import { DisposeButton } from "../../../Components/Button/DisposeButton/DisposeButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import ConditionalPrSoButton from "../../../Components/Button/ConditionalPrSoButton/ConditionalPrSoButton";
import { useDispatch, useSelector } from "react-redux";

import { HashLoader } from "react-spinners";
import { fetchAllUploadBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";
import { getByIdUploadBulkLeadThunk } from "../../../Redux/Services/thunks/UploadBulkLeadThunk";

const ViewLeads = () => {
  const isPrGenerated = 0;
  const [editAddLead, setEditAddLead] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const requestData = {
    EmployeeCode: "INFSASHANT1007",
    CampaignName: "sashantSir",
  };
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.uploadbulklead);

  const handleFetchLeadButton = () => {
    console.log("Fetching leads with requestData:", requestData);
    dispatch(fetchAllUploadBulkLeadThunk(requestData));
    // setIsLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    dispatch(getByIdUploadBulkLeadThunk(requestData));
  }, [dispatch]);

  useEffect(() => {
    console.log("data--------------------------------"+data);
    if (data) {
      const timer = setTimeout(() => {
        setLeads(data);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        View Leads
      </h2>

      <div className="container-fluid border border-2 border-gray mt-1  ">
        <div className="outerBgBox p-2  mb-2">
          <div className="container-fluid mt-3 ms-0 me-0">

            <div className="dropDownContainer p-3  mb-2">
              {/* Filters */}
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
                <PrintButton tableId="leads-table" />
                <PdfButton tableId="leads-table" />
                <CsvButton tableId="leads-table" />
                <CopyButton tableId="leads-table" />
              </div>
              <div>
                <button
                  onClick={handleFetchLeadButton}
                  className="btn btn-secondary px-2 py-0 rounded-0 text-white "
                  disabled={isLoading} // Disable button while loading
                >
                  Fetch Lead
                </button>
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
                {loading ? (
                  <div
                    style={{
                      position: "fixed", // Fixed to ensure it stays over everything
                      top: 0,
                      left: 0,
                      width: "100vw", // Full width
                      height: "100vh", // Full height
                      backgroundColor: "rgba(104, 102, 102, 0.5)", // Semi-transparent background
                      zIndex: 9998, // Make sure it's above most elements
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "50%", // Center vertically
                        left: "50%", // Center horizontally
                        transform: "translate(-50%, -50%)", // Correct alignment
                        zIndex: 9999, // Ensure the loader is above the overlay
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
                ) : leads.length > 0 ? (
                  leads.map((leadObj) => (
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
                        {editAddLead === leadObj.id ? (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleSaveLead(leadObj.id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="viewLeadButton btn btn-sm px-2 py-0"
                            onClick={() => alert("Add Segment Clicked")}
                          >
                            Add Segment
                          </button>
                        )}
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
                          <ConditionalPrSoButton
                            isPrGenerated={isPrGenerated}
                          />
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

            {/* Pagination and Summary */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                Showing <strong>1 </strong> to <strong>10 </strong> of{" "}
                <strong>3,445</strong> entries
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item">
                    <button className="page-link">Previous</button>
                  </li>
                  <li className="page-item active">
                    <button className="page-link">1</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link">2</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link">Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewLeads;
