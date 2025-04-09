import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { CopyButton } from "../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { CsvButton } from "../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { PrintButton } from "../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import DeleteButton from "../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../Components/Button/BackButton/BackButton";
import { FiMail } from "react-icons/fi";
import { FaInbox } from "react-icons/fa";

const MailBox = () => {
  const emails = [
    {
      from: "Vikash Kumar",
      to: "admin",
      subject: "early going",
      date: "09 Dec 2024 05:17 pm",
    },
    {
      from: "Hirdesh Singh Rana",
      to: "admin",
      subject: "Lead Change",
      date: "09 Dec 2024 04:44 pm",
    },
    {
      from: "Laxmi Gupta",
      to: "admin",
      subject: "split amount",
      date: "09 Dec 2024 03:22 pm",
    },
    {
      from: "Vikash Kumar",
      to: "admin",
      subject: "early going",
      date: "09 Dec 2024 05:17 pm",
    },
    {
      from: "Hirdesh Singh Rana",
      to: "admin",
      subject: "Lead Change",
      date: "09 Dec 2024 04:44 pm",
    },
    {
      from: "Laxmi Gupta",
      to: "admin",
      subject: "split amount",
      date: "09 Dec 2024 03:22 pm",
    },
    {
      from: "Vikash Kumar",
      to: "admin",
      subject: "early going",
      date: "09 Dec 2024 05:17 pm",
    },
    {
      from: "Hirdesh Singh Rana",
      to: "admin",
      subject: "Lead Change",
      date: "09 Dec 2024 04:44 pm",
    },
    {
      from: "Laxmi Gupta",
      to: "admin",
      subject: "split amount",
      date: "09 Dec 2024 03:22 pm",
    },
  ];

  const handleDelete = (index) => {
    alert(`Deleting email at index: ${index}`);
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
          <FaInbox
            className="fs-1"
            style={{ marginRight: "8px", color: "#2c3e50" }}
          />
          Inbox
        </h2>
      </section>
      <div className="d-flex gap-2 mt-3">
        <Link to="/compose" className="btn btn-secondary mb-2 px-2 py-0 ">
          Compose
        </Link>
        <Link to="/drafts" className="btn btn-secondary mb-2 px-2 py-0">
          Drafts
        </Link>
        <Link to="/sentmail" className="btn btn-secondary mb-2 px-2 py-0">
          Sent Mail
        </Link>
        <Link to="/starred" className="btn btn-secondary mb-2 px-2 py-0">
          Starred <i class="bi bi-star-fill"></i>
        </Link>
      </div>
      <div
        className="container-fluid border border-2 border-gray mt-2 py-3"
        style={{ padding: "18px 16px" }}
      >
        <div
          className="lead-status-container mt-0 p-3"
          style={{ background: "rgb(227,227,227)", border: "2px solid grey" }}
        >
          <div className="mb-2">
            <CopyButton />
            <CsvButton />
            <PdfButton />
            <PrintButton />
          </div>
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email, index) => (
                <tr key={index}>
                  <td>{email.from}</td>
                  <td>{email.to}</td>
                  <td>{email.subject}</td>
                  <td>{email.date}</td>
                  <td>
                    <DeleteButton
                      className="btn btn-danger btn-sm mr-1  py-0 px-2"
                      onClick={() => handleDelete(index)}
                    />
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
                  <button className="page-link px-2 py-0">Previous</button>
                </li>
                <li className="page-item active">
                  <button className="page-link px-2 py-0">1</button>
                </li>
                <li className="page-item active">
                  <button className="page-link px-2 py-0">2</button>
                </li>
                <li className="page-item active">
                  <button className="page-link px-2 py-0">3</button>
                </li>
                <li className="page-item">
                  <button className="page-link px-2 py-0">Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default MailBox;
