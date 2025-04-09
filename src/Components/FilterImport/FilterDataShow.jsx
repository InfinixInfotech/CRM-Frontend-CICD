import React from "react";
import { FaEye } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import FilterImport from "./FilterImport";

export default function FilterDataShow() {
  const location = useLocation();
  const { filterData } = location.state || {};

  return (
    <div className="mt-3">
      <section className="container-fluid  p-3 mb-3 shadow-sm mt-5"
        style={{
          background: "#2c3e50",
          borderBottom: "1px solid #E1E6EF",
        }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-12 text-center">
            <h2 className="text-white d-flex align-items-center justify-content-center fs-3">
              <FaEye className="me-2" /> Search Data
            </h2>
          </div>
        </div>
      </section>
      <FilterImport />
      {filterData?.length > 0 ? (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client Name</th>
              <th>Lead ID</th>
              <th>Lead Source</th>
              <th>Assigned To</th>
              <th>Mobile</th>
              <th>Lead Status</th>
              <th>Free Trial Start</th>
              <th>Free Trial End</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((item, index) => (
              <tr key={index}>
                <td>{item.lead?.leadId || "N/A"}</td>
                <td>{item.lead?.clientName || "N/A"}</td>
                <td>{item.lead?.leadId || "N/A"}</td>
                <td>{item.lead?.leadSource || "N/A"}</td>
                <td>{item.lead?.assignedTo || "N/A"}</td>
                <td>{item.lead?.mobile || "N/A"}</td>
                <td>{item.lead?.followupDetail?.leadStatus || "N/A"}</td>
                <td>{item.lead?.followupDetail?.freeTrialStartDate || "N/A"}</td>
                <td>{item.lead?.followupDetail?.freeTrialEndDate || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
