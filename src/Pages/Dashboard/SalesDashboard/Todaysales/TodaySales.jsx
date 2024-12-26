import React, { useState, useEffect, useRef } from "react";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";

const TodaySalesOrderReport = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [showPopup, setShowPopup] = useState(false);

  // Create a ref to target the content for printing (table)
  const printContentRef = useRef(null);

  // Sample data (replace with API response if needed)
  const mockData = [
    {
      leadId: 1491853,
      clientName: "NIKHIL MAKWANA",
      mobile: "9879581161",
      segment: "Stock Option",
      option: "S",
      startDate: "19 Nov 2024",
      endDate: "19 Nov 2024",
      total: 11564,
      assigned: "Ayushi.Tanwar",
      createdBy: "Ayushi.Tanwar",
    },
    {
      leadId: 1876665,
      clientName: "Shrikant Dhopade",
      mobile: "8806970733",
      segment: "Stock Option",
      option: "S",
      startDate: "19 Nov 2024",
      endDate: "19 Dec 2024",
      total: 11800,
      assigned: "Rahul.Lokahnde",
      createdBy: "Rahul.Lokahnde",
    },
    {
      leadId: 1912516,
      clientName: "Binoy Balakrishnan",
      mobile: "9590688751",
      segment: "Stock Option",
      option: "S",
      startDate: "19 Nov 2024",
      endDate: "19 Dec 2024",
      total: 17700,
      assigned: "Abhishek Meena",
      createdBy: "Abhishek Meena",
    },
    // Add more mock data here
  ];

  // Pagination logic
  useEffect(() => {
    setData(mockData);
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open popup
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

 
  return (
    <div>
      {/* Print-Specific CSS */}
      <style>
        {`
          @media print {
            .no-print {
              display: none;
            }
          }
        `}
      </style>

      {/* Total Sales Container */}
      <div
        className="card bg-light text-center mb-4"
        style={{ width: "18rem", cursor: "pointer", margin: "0 auto" }}
        onClick={handleOpenPopup}
      >
        <div className="card-body">
          <h5 className="card-title">Today Sales</h5>
          <h3 className="card-text">$45,064</h3>
        </div>
      </div>
      {/* Popup */}
      {showPopup && (
        <>
          {/* Overlay */}
          <div
            className="popup-overlay"
            onClick={handleClosePopup}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
          ></div>

          {/* Popup Content */}
          <div
            className="popup-content"
            ref={printContentRef} // Assign ref to the popup content (table)
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "1000px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
              padding: "20px",
            }}
          >
            <button
              className="popup-close no-print"
              onClick={handleClosePopup}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>

            <h4 className="mb-3 text-center">Sales Order Report</h4>
            <div className="table-responsive w-100">
              <table   id="table-data" className="table table-bordered table-striped">
                <thead className="table-danger">
                  <tr>
                    <th className="text-center">Lead ID</th>
                    <th className="text-center">Client Name</th>
                    <th className="text-center">Mobile Number</th>
                    <th className="text-center">Segment</th>
                    <th className="text-center">Option</th>
                    <th className="text-center">Start Date</th>
                    <th className="text-center">End Date</th>
                    <th className="text-center">Total</th>
                    <th className="text-center">Assigned</th>
                    <th className="text-center">Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">{item.leadId}</td>
                      <td className="text-center">{item.clientName}</td>
                      <td className="text-center">{item.mobile}</td>
                      <td className="text-center">{item.segment}</td>
                      <td className="text-center">{item.option}</td>
                      <td className="text-center">{item.startDate}</td>
                      <td className="text-center">{item.endDate}</td>
                      <td className="text-center">{item.total}</td>
                      <td className="text-center">{item.assigned}</td>
                      <td className="text-center">{item.createdBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav>
              <ul className="pagination justify-content-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link no-print"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Print Button */}
            {/* <button
              onClick={handlePrint}
              className="btn btn-primary mt-3 no-print"
              style={{
                width: "120px",
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Print Table
            </button> */}
            <PrintButton/>
            <PdfButton/>
            <CsvButton/>
            <CopyButton/>
          </div>
        </>
      )}
    </div>
  );
};

export default TodaySalesOrderReport;
