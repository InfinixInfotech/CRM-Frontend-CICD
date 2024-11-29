import React from "react";
import { EditButton } from "../../Components/Button/EditButton/EditButton";
import { DeleteButton } from "../../Components/Button/DeleteButton/DeleteButton";
import { PrintButton } from "../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../Components/Button/DataButton/DataCopyButton/DataCopyButton";

const SalesOrder = () => {
  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Sales Orders
      </h2>

      <div className="container fw-normal">
        {/* Filters */}
        <div className="row mb-4">
          {[
            "Status",
            "Service Status",
            "Assigned",
            "By Date",
            "Lead Source",
            "Segment",
          ].map((filter, index) => (
            <div className="col-md-2" key={index}>
              <select className="form-control">
                <option value="all">{filter}</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mb-2 d-flex gap-2">
          <PrintButton tableId="table-data" />
          <PdfButton tableId="table-data" />
          <CsvButton tableId="table-data" />
          <CopyButton tableId="table-data" />
        </div>

        {/* Table */}
        <div>
          <table className="table table-bordered table-striped table-hover text-center" id="table-data">
            <thead>
              <tr className="table-primary font-weight-bold fs-6">
                <th>Client ID</th>
                <th>Load ID</th>
                <th>Payment Date</th>
                <th>Client Name</th>
                <th>Mobile</th>
                <th>Assigned To</th>
                <th>Manager Name</th>
                <th>Segment</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Net Total</th>
                <th>Tax</th>
                <th>Grand Total</th>
                <th>DOB</th>
                <th>PAN No</th>
                <th>Email</th>
                <th>City</th>
                <th>State</th>
                <th>Options</th>
                <th>Status</th>
                <th>Lead Source</th>
                <th>Approved By</th>
                <th>Approved Time</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index}>
                  <td>{1000 + index}</td>
                  <td>Load-{index}</td>
                  <td>2024-11-27</td>
                  <td>Client {index + 1}</td>
                  <td>9876543210</td>
                  <td>Assigned {index + 1}</td>
                  <td>Manager {index + 1}</td>
                  <td>Segment {index + 1}</td>
                  <td>{index % 2 === 0 ? "New" : "Upgrade"}</td>
                  <td>2024-11-01</td>
                  <td>2024-11-30</td>
                  <td>5000</td>
                  <td>100</td>
                  <td>5100</td>
                  <td>1990-01-01</td>
                  <td>ABCDE1234F</td>
                  <td>client{index}@mail.com</td>
                  <td>City {index + 1}</td>
                  <td>State {index + 1}</td>
                  <td>Option {index}</td>
                  <td>Created</td>
                  <td>Pool {index + 1}</td>
                  <td>Approver {index + 1}</td>
                  <td>2024-11-27</td>
                  <td>Notes...</td>
                  <td>
                    <div className="d-flex flex-column gap-2">
                      <button className="btn btn-success btn-sm mr-1 py-0 px-2">Status</button>
                      <button className="btn btn-info btn-sm mr-1  py-0 px-2 ">Invoice</button>
                      <DeleteButton className="btn btn-danger btn-sm mr-1  py-0 px-2 "/>
                      <EditButton className="btn btn-primary btn-sm mr-1 py-0 px-2"/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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

        {/* Summary */}
        <div className="mt-4">
          <table className="table table-bordered" id="table-data1">
            <thead className="table-secondary">
              <tr>
                <th>Date Range</th>
                <th>Client Count</th>
                <th>Net Total</th>
                <th>Grand Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-11-01 to 2024-11-27</td>
                <td>10</td>
                <td>50,000</td>
                <td>51,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SalesOrder;
