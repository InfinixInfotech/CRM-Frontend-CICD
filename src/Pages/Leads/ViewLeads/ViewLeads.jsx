import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DeleteButton } from "../../../Components/Button/DeleteButton/DeleteButton";
import { StatusButton } from "../../../Components/Button/StatusButton/StatusButton";
import { SendButton } from "../../../Components/Button/SendButton/SendButton";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import { PRButton } from "../../../Components/Button/PRButton/PRButton";
import { DisposeButton } from "../../../Components/Button/DisposeButton/DisposeButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";

const ViewLeads = () => {
  const [leads, setLeads] = useState([
    {
      id: 218474,
      clientName: "Client 1",
      mobile: "8800296182",
      assignedTo: "Admin",
      leadSource: "Fresh Pool",
      segment: null,
      freeTrial: null,
      followUp: null,
      description: "Sample description",
      status: "Unread",
    },
    {
      id: 414666,
      clientName: "Azad",
      mobile: "9711879103",
      assignedTo: "Admin",
      leadSource: "Fresh Pool",
      segment: null,
      freeTrial: null,
      followUp: null,
      description: "Sample description",
      status: "Unread",
    },
    {
      id: 414666,
      clientName: "Azad",
      mobile: "9711879103",
      assignedTo: "Admin",
      leadSource: "Fresh Pool",
      segment: null,
      freeTrial: null,
      followUp: null,
      description: "Sample description",
      status: "Unread",
    },
    {
      id: 414666,
      clientName: "Azad",
      mobile: "9711879103",
      assignedTo: "Admin",
      leadSource: "Fresh Pool",
      segment: null,
      freeTrial: null,
      followUp: null,
      description: "Sample description",
      status: "Unread",
    },
    {
      id: 414666,
      clientName: "Azad",
      mobile: "9711879103",
      assignedTo: "Admin",
      leadSource: "Fresh Pool",
      segment: null,
      freeTrial: null,
      followUp: null,
      description: "Sample description",
      status: "Unread",
    },
    {
      id: 414666,
      clientName: "Azad",
      mobile: "9711879103",
      assignedTo: "Admin",
      leadSource: "Fresh Pool",
      segment: null,
      freeTrial: null,
      followUp: null,
      description: "Sample description",
      status: "Unread",
    },
    {
      id: 414666,
      clientName: "Azad",
      mobile: "9711879103",
      assignedTo: "Admin",
      leadSource: "Fresh Pool",
      segment: null,
      freeTrial: null,
      followUp: null,
      description: "Sample description",
      status: "Unread",
    },
    {
      id: 414666,
      clientName: "Azad",
      mobile: "9711879103",
      assignedTo: "Admin",
      leadSource: "Fresh Pool",
      segment: null,
      freeTrial: null,
      followUp: null,
      description: "Sample description",
      status: "Unread",
    },
    {
      id: 414666,
      clientName: "Azad",
      mobile: "9711879103",
      assignedTo: "Admin",
      leadSource: "Fresh Pool",
      segment: null,
      freeTrial: null,
      followUp: null,
      description: "Sample description",
      status: "Unread",
    },
    {
      id: 414666,
      clientName: "Azad",
      mobile: "9711879103",
      assignedTo: "Admin",
      leadSource: "Fresh Pool",
      segment: null,
      freeTrial: null,
      followUp: null,
      description: "Sample description",
      status: "Unread",
    },
    // Add more leads data as needed
  ]);

  const handleAction = (actionType, index) => {
    if (actionType === "delete") {
      const updatedLeads = leads.filter((_, i) => i !== index);
      setLeads(updatedLeads);
    } else {
      alert(`${actionType} action triggered for Lead ID: ${leads[index].id}`);
    }
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        View Leads
      </h2>

      <div className="container-fluid border border-2 border-gray mt-1  ">
        <div
          className="p-2  mb-2"
          style={{ marginTop: "11px", background: "rgb(227,227,227)" }}
        >
          <div className="container-fluid mt-3 ms-0 me-0">
            <div
              className="p-3  mb-2"
              style={{ marginTop: "11px", background: "rgb(245, 245, 245)" }}
            >
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
                    <div style={{ position: "relative" }}>
                    <label className="form-label " style={{fontSize:"14px"}}>{filter}</label>
                      <select
                        className="form-control px-2"
                        style={{
                          height: "28px",
                          fontSize: "14px",
                          padding: "0px 32px 0px 8px", // Space for the arrow
                          lineHeight: "28px",
                          appearance: "none", // Hide default arrow
                          background: `white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%236c757d' d='M0 0l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 8px center`,
                          backgroundSize: "10px 6px", // Adjust arrow size
                          border: "1px solid #ced4da", // Optional: match the theme
                          borderRadius: "4px", // Optional: rounded corners
                        }}
                      >
                        <option value="all">{filter}</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <PrintButton tableId="leads-table" />
            <PdfButton tableId="leads-table" />
            <CsvButton tableId="leads-table" />
            <CopyButton tableId="leads-table" />

            <table
              className="table table-bordered table-hover mt-2"
              id="leads-table"
              style={{ fontSize: "14px", textAlign: "center" }}
            >
              <thead className="thead-dark" style={{ fontWeight: "100" }}>
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
                {leads.map((lead, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{lead.clientName}</td>
                    <td>
                      {lead.mobile}
                      <br/>
                    </td>
                    <td>{lead.assignedTo}</td>
                    <td>{lead.leadSource}</td>
                    <td>
                      <button
                        className="btn btn-sm px-2 py-0"
                        onClick={() => alert("Add Segment Clicked")}
                        style={{
                          fontWeight: "600",
                          borderRadius: "0",
                          backgroundColor: "#758694",
                          color: "white",
                          fontSize : "12px",
                          border : "1px solid grey"
                        }}
                      >
                        Add Segment
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm px-2 py-0"
                        onClick={() => alert("Add Free Trial Clicked")}
                        style={{
                          fontWeight: "600",
                          borderRadius: "0",
                          backgroundColor: "#758694",
                          color: "white",
                          fontSize : "12px",
                          border : "1px solid grey"
                        }}
                      >
                        Add FT
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm px-2 py-0"
                        onClick={() => alert("Add Follow Up Clicked")}
                        style={{
                          fontWeight: "600",
                          borderRadius: "0",
                          backgroundColor: "#758694",
                          color: "white",
                          fontSize : "12px",
                          border : "1px solid grey"
                        }}
                      >
                        Add New
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-link"
                        onClick={() =>
                          alert(`Description: ${lead.description}`)
                        }
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <div className="btn-group d-grid gap-1 d-sm-flex">
                        <StatusButton />
                        <EditButton />
                        <DeleteButton />
                        <DisposeButton />
                        <PRButton />
                        <SendButton />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination and Summary */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                Showing <strong>1 </strong>  to <strong>10 </strong> of <strong>3,445</strong>{" "}
                entries
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
