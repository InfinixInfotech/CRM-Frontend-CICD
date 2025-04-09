import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteButton from "../../../Components/Button/DeleteButton/DeleteButton";
import { StatusButton } from "../../../Components/Button/StatusButton/StatusButton";
import { SendButton } from "../../../Components/Button/SendButton/SendButton";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import { PRButton } from "../../../Components/Button/PRButton/PRButton";
import { DisposeButton } from "../../../Components/Button/DisposeButton/DisposeButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { FaEye, FaUserTie } from "react-icons/fa";

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
          <FaEye
            className="fs-1"
            style={{ marginRight: "8px", color: "#2c3e50" }}
          />
          View Marketing Leads
        </h2>
      </section>
      <div className="container-fluid mt-3">
        {/* Filters */}
        <div className="row d-flex gap-2 mb-4">
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
              <select className="form-control input-box">
                <option value="all">{filter}</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>
          ))}
        </div>

        <PrintButton tableId="leads-table" />
        <PdfButton tableId="leads-table" />
        <CsvButton tableId="leads-table" />
        <CopyButton tableId="leads-table" />

        <table
          className="table table-bordered table-hover mt-2"
          id="leads-table"
        >
          <thead className="thead-dark">
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
                  <br />
                  <button
                    className="btn btn-sm btn-link p-0"
                    onClick={() => alert("Convert To Contact Clicked")}
                  >
                    Convert To Contact
                  </button>
                </td>
                <td>{lead.assignedTo}</td>
                <td>{lead.leadSource}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => alert("Add Segment Clicked")}
                  >
                    Add Segment
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => alert("Add Free Trial Clicked")}
                  >
                    Add FT
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => alert("Add Follow Up Clicked")}
                  >
                    Add New
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-link"
                    onClick={() => alert(`Description: ${lead.description}`)}
                  >
                    View
                  </button>
                </td>
                <td>
                  <div className="btn-group d-grid gap-1 d-sm-flex">
                    <StatusButton className="btn btn-warning btn-sm px-0 py-0" />
                    <EditButton className="btn btn-primary btn-sm px-0 py-0" />
                    <DeleteButton className="btn btn-danger btn-sm px-0 py-0" />
                    <DisposeButton className="btn btn-secondary btn-sm px-0 py-0" />
                    <PRButton className="btn btn-info btn-sm px-0 py-0" />
                    <SendButton className="btn btn-success btn-sm px-0 py-0" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination and Summary */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            Showing <strong>1 to 10</strong> of <strong>3,445</strong> entries
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
    </>
  );
};

export default ViewLeads;
