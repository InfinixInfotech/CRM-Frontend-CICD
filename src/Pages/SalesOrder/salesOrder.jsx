import React, { useEffect, useState } from "react";
import { EditButton } from "../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../Components/Button/DeleteButton/DeleteButton";
import { PrintButton } from "../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { useNavigate } from "react-router-dom";
import "./SalesOrder.css";

import { getAllSalesOrderThunk } from "../../Redux/Services/thunks/SalesOrderThunk";
import { useDispatch } from "react-redux";

const SalesOrder = () => {
  const Navigate = useNavigate();
  const handleNavigate = () => {
    Navigate("/editso");
    alert("clicked");
  };

  const [salesOrder, setsalesOrder] = useState([
    {
      clientId: "CL12345",
      loadId: "LD56789",
      paymentDate: "2024-12-01",
      clientName: "John Doe",
      mobile: "+1234567890",
      assignedTo: "Jane Smith",
      managerName: "Michael Johnson",
      segment: "Retail",
      type: "Wholesale",
      startDate: "2024-11-15",
      endDate: "2024-11-30",
      netTotal: 15000.0,
      tax: 1350.0,
      grandTotal: 16350.0,
      dob: "1990-05-10",
      panNo: "ABCDE1234F",
      email: "john.doe@example.com",
      city: "New York",
      state: "New York",
      options: "Option A",
      status: "Pending",
      leadSource: "Online Campaign",
      approvedBy: "Emily Davis",
      approvedTime: "2024-12-01T10:30:00",
      description: "Order placed for retail goods.",
    },
    {
      clientId: "CL12345",
      loadId: "LD56789",
      paymentDate: "2024-12-01",
      clientName: "John Doe",
      mobile: "+1234567890",
      assignedTo: "Jane Smith",
      managerName: "Michael Johnson",
      segment: "Retail",
      type: "Wholesale",
      startDate: "2024-11-15",
      endDate: "2024-11-30",
      netTotal: 15000.0,
      tax: 1350.0,
      grandTotal: 16350.0,
      dob: "1990-05-10",
      panNo: "ABCDE1234F",
      email: "john.doe@example.com",
      city: "New York",
      state: "New York",
      options: "Option A",
      status: "Pending",
      leadSource: "Online Campaign",
      approvedBy: "Emily Davis",
      approvedTime: "2024-12-01T10:30:00",
      description: "Order placed for retail goods.",
    },
    {
      clientId: "CL12345",
      loadId: "LD56789",
      paymentDate: "2024-12-01",
      clientName: "John Doe",
      mobile: "+1234567890",
      assignedTo: "Jane Smith",
      managerName: "Michael Johnson",
      segment: "Retail",
      type: "Wholesale",
      startDate: "2024-11-15",
      endDate: "2024-11-30",
      netTotal: 15000.0,
      tax: 1350.0,
      grandTotal: 16350.0,
      dob: "1990-05-10",
      panNo: "ABCDE1234F",
      email: "john.doe@example.com",
      city: "New York",
      state: "New York",
      options: "Option A",
      status: "Pending",
      leadSource: "Online Campaign",
      approvedBy: "Emily Davis",
      approvedTime: "2024-12-01T10:30:00",
      description: "Order placed for retail goods.",
    },
    {
      clientId: "CL12345",
      loadId: "LD56789",
      paymentDate: "2024-12-01",
      clientName: "John Doe",
      mobile: "+1234567890",
      assignedTo: "Jane Smith",
      managerName: "Michael Johnson",
      segment: "Retail",
      type: "Wholesale",
      startDate: "2024-11-15",
      endDate: "2024-11-30",
      netTotal: 15000.0,
      tax: 1350.0,
      grandTotal: 16350.0,
      dob: "1990-05-10",
      panNo: "ABCDE1234F",
      email: "john.doe@example.com",
      city: "New York",
      state: "New York",
      options: "Option A",
      status: "Pending",
      leadSource: "Online Campaign",
      approvedBy: "Emily Davis",
      approvedTime: "2024-12-01T10:30:00",
      description: "Order placed for retail goods.",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const dispatch = useDispatch();

  // const GetAllSalesOrder = () => {
  //   dispatch(getAllSalesOrderThunk())
  //     .then((response) => {
  //       if (response?.error) {
  //         console.error('Error:', response.error);
  //       } else {
  //         const salesorder = response.payload?.data;
  //         console.log(salesorder);
  //         setsalesOrder(salesorder);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Request failed', error);
  //     });
  // };

  // useEffect(() => {
  //   GetAllSalesOrder();
  // }, [dispatch]);

    useEffect(() => {
      const fetchData = async () => {
        dispatch(getAllSalesOrderThunk());
      };  
      fetchData();
    }, [dispatch]);
  
    useEffect(() => {
      setsalesOrder(data.data);
    }, [data]);

  const handleEmailPopup = (email) => {
    setSelectedEmail(email);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedEmail(null);
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Sales Orders
      </h2>
      <div className="container-fluid border border-2 border-gray mt-1 ">
        <div
          className="outerBgBox table-responsive container-fluid py-4"
          // style={{ width: "80vw" }}
        >
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
          {/* Popup */}
          {showPopup && (
            <>
              <div className="popup-overlay" onClick={handleClosePopup}></div>
              <div className="popup-content">
                <button className="popup-close" onClick={handleClosePopup}>
                  ✖
                </button>
                <h4 className="mb-3 text-center fs-6">Client Email</h4>
                <p className="text-center">
                  {selectedEmail || "No email available"}
                </p>
              </div>
            </>
          )}
          {/* Table */}
          <div>
            <table
              id="table-data"
              className="small-table table table-bordered table-striped"
            >
              <thead>
                <tr>
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
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {salesOrder.map((salesOrderObj, index) => (
                  <tr key={index}>
                    <td>{salesOrderObj.clientId}</td>
                    <td>{salesOrderObj.loadId}</td>
                    <td>{salesOrderObj.paymentDate}</td>
                    <td>{salesOrderObj.clientName}</td>
                    <td>{salesOrderObj.mobile}</td>
                    <td>{salesOrderObj.assignedTo}</td>
                    <td>{salesOrderObj.managerName}</td>
                    <td>{salesOrderObj.segment}</td>
                    <td>{salesOrderObj.type}</td>
                    <td>{salesOrderObj.startDate}</td>
                    <td>{salesOrderObj.endDate}</td>
                    <td>{salesOrderObj.netTotal}</td>
                    <td>{salesOrderObj.tax}</td>
                    <td>{salesOrderObj.grandTotal}</td>
                    <td>{salesOrderObj.dob}</td>
                    <td>{salesOrderObj.panNo}</td>
                    {/* <td>{salesOrderObj.email}</td> */}
                    <td>
                      <button
                        className="btn btn-sm text-primary"
                        onClick={() => handleEmailPopup(salesOrderObj.email)}
                      >
                        Email
                      </button>
                    </td>
                    <td>{salesOrderObj.city}</td>
                    <td>{salesOrderObj.state}</td>
                    <td>{salesOrderObj.options}</td>
                    <td>{salesOrderObj.status}</td>
                    <td>{salesOrderObj.leadSource}</td>
                    <td>{salesOrderObj.approvedBy}</td>
                    <td>{salesOrderObj.approvedTime}</td>
                    <td>{salesOrderObj.description}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button className="btn btn-success btn-sm py-0 px-2">
                          Status
                        </button>
                        <button className="btn btn-info btn-sm py-0 px-2">
                          Invoice
                        </button>
                        <DeleteButton className="btn btn-danger btn-sm py-0 px-2" />
                        <EditButton
                          onClick={handleNavigate}
                          className="btn btn-primary btn-sm py-0 px-2"
                        />
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
            <table
              className="table small-table table-bordered"
              id="table-data1"
            >
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

          <button className="btn btn-primary">Create</button>
        </div>
      </div>
    </>
  );
};

export default SalesOrder;
