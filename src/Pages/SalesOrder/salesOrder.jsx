import React, { useEffect, useState } from "react";
import { EditButton } from "../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../Components/Button/DeleteButton/DeleteButton";
import { PrintButton } from "../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { useNavigate } from "react-router-dom";
import "./SalesOrder.css";
import {
  deleteSalesOrderThunk,
  getAllSalesOrderThunk,
} from "../../Redux/Services/thunks/SalesOrderThunk";
import { useDispatch } from "react-redux";
import ExportData from "../../Components/Button/DataButton/ExportButton";
import { FaShoppingCart } from "react-icons/fa";
import FilterImport from "../../Components/FilterImport/FilterImport";

const SalesOrder = () => {
  const [salesOrder, setsalesOrder] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const Navigate = useNavigate();
  const handleNavigate = (id, salesOrderObj) => {
    if (!salesOrderObj) {
      console.error("salesOrderObj is undefined or null");
      return;
    }
    console.log("salesOrderObj---------------", JSON.stringify(salesOrderObj));

    Navigate(`/editso/${id}`, {
      state: { salesOrderObj, soId: salesOrderObj.soId },
    });
  };

  const dispatch = useDispatch();

  const GetAllSalesOrder = () => {
    dispatch(getAllSalesOrderThunk())
      .then((response) => {
        if (response?.error) {
          console.error("Error:", response.error);
        } else {
          const salesorder = response.payload?.data;
          console.log(salesorder);
          setsalesOrder(salesorder);
        }
      })
      .catch((error) => {
        console.error("Request failed", error);
      });
  };

  useEffect(() => {
    GetAllSalesOrder();
  }, [dispatch]);

  const handleEmailPopup = (email) => {
    setSelectedEmail(email);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedEmail(null);
  };

  const handleDeleteSo = (id) => {
    dispatch(deleteSalesOrderThunk(id))
      .unwrap()
      .then((response) => {
        setsalesOrder((prevStatuses) =>
          prevStatuses.filter((salesorder) => salesorder.id !== id)
        );
        setMsg(response.message || "deleted successfully");
      })
      .catch((error) => {
        setMsg(error || "Failed to delete status");
      });
  };

  const totalPages = Math.ceil(salesOrder.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSO = salesOrder.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

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
          <FaShoppingCart
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Sales Order
        </h2>
      </section>

      <FilterImport />

      {/* Filters */}
      {/* <div className="container-fluid border border-2 border-gray mt-1 d-flex py-4 gap-1 bg-white">
        {[
          "Status",
          "Service Status",
          "Assigned",
          "By Date",
          "Lead Source",
          "Segment",
        ].map((filter, index) => (
          <div className="col-md-2" key={index}>
            <select className="form-control" style={{ width: "92%" }}>
              <option value="all">{filter}</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
        ))}
      </div> */}
      <div className="container-fluid border border-2 border-gray mt-1 bg-white">
        <div
          className="salesOrder-outerBgBox table-responsive container-fluid "
          // style={{ width: "80vw" }}
        >
          {/* Buttons */}
          <div className="mb-2 ">
            <ExportData tableId="table-data" />
          </div>
          {/* Popup */}
          {showPopup && (
            <>
              <div className="salesOrder-popup-overlay" onClick={handleClosePopup}></div>
              <div className="salesOrder-popup-content">
                <button className="salesOrder-popup-close" onClick={handleClosePopup}>
                  ✖
                </button>
                <h4 className="mb-3 text-center fs-6">Client Email</h4>
                <p className="text-center">
                  {selectedEmail || "No email available"}
                </p>
              </div>
            </>
          )}

          <div>
            <table
              id="table-data"
              className="small-table table table-bordered table-striped"
            >
              <thead>
                <tr>
                  <th>Client ID</th>
                  <th>Lead ID</th>
                  <th>Payment Date</th>
                  <th>Client Name</th>
                  <th>Mobile</th>
                  {/* <th>Assigned To</th>
                  <th>Manager Name</th>
                  <th>Segment</th>
                  <th>Type</th> */}
                  <th>Start Date</th>
                  <th>End Date</th>
                  {/* <th>Net Total</th>
                  <th>Tax</th> */}
                  <th>Grand Total</th>
                  <th>DOB</th>
                  <th>PAN No</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>State</th>
                  {/* <th>Options</th>
                  <th>Status</th>
                  <th>Lead Source</th>
                  <th>Approved By</th>
                  <th>Approved Time</th>
                  <th>Description</th> */}
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentSO.map((salesOrderObj, index) => (
                  <tr key={index}>
                    <td>{salesOrderObj.id}</td>
                    <td>{salesOrderObj.leadId}</td>
                    <td>{salesOrderObj.paymentDetails.paymentDate}</td>
                    <td>{salesOrderObj.personalDetails.clientName}</td>
                    <td>{salesOrderObj.personalDetails.mobile}</td>
                    {/* <td>{salesOrderObj.assignedTo}</td>
                    <td>{salesOrderObj.managerName}</td>
                    <td>{salesOrderObj.segment}</td>
                    <td>{salesOrderObj.type}</td> */}
                    <td>{salesOrderObj.productDetails[0]?.startDate}</td>
                    <td>{salesOrderObj.productDetails[0]?.endDate}</td>
                    {/* <td>{salesOrderObj.netTotal}</td>
                    <td>{salesOrderObj.tax}</td> */}
                    <td>{salesOrderObj.productDetails[0]?.grandTotal}</td>
                    <td>{salesOrderObj.personalDetails.dob}</td>

                    <td>{salesOrderObj.personalDetails.panNo}</td>
                    {/* <td>{salesOrderObj.email}</td> */}
                    <td>
                      <button
                        className="btn btn-sm text-primary"
                        onClick={() =>
                          handleEmailPopup(salesOrderObj.personalDetails.email)
                        }
                      >
                        Email
                      </button>
                    </td>
                    <td>{salesOrderObj.personalDetails.address.city}</td>
                    <td>{salesOrderObj.personalDetails.address.state}</td>
                    {/* <td>{salesOrderObj.options}</td>
                    <td>{salesOrderObj.status}</td>
                    <td>{salesOrderObj.leadSource}</td>
                    <td>{salesOrderObj.approvedBy}</td>
                    <td>{salesOrderObj.approvedTime}</td>
                    <td>{salesOrderObj.description}</td> */}
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button className="btn btn-success btn-sm py-0 px-2">
                          Status
                        </button>
                        <button className="btn btn-info btn-sm py-0 px-2">
                          Invoice
                        </button>
                        <DeleteButton
                          onDelete={() => {
                            handleDeleteSo(salesOrderObj.id);
                          }}
                          className="btn btn-danger btn-sm py-0 px-2"
                        />
                        <EditButton
                          onClick={() => {
                            handleNavigate(salesOrderObj.id, salesOrderObj);
                          }}
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
        {/* Summary */}
        <div className="mt-1 border border-2 p-4">
          <table
            className="table small-table table-bordered table-striped"
            id="table-data1"
          >
            <thead className="table">
              <tr>
                <th>Date Range</th>
                <th>Client Count</th>
                <th>Net Total</th>
                <th>Grand Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-11-01 to 2024-3-57</td>
                <td>10</td>
                <td>50,000</td>
                <td>51,000</td>
              </tr>
              <tr>
                <td>2024-11-01 to 2024-11-27</td>
                <td>7</td>
                <td>20,000</td>
                <td>17,000</td>
              </tr>
            </tbody>
          </table>

          <button
            className="btn text-white py-1 px-4"
            style={{ backgroundColor: "#009688" }}
          >
            Create
          </button>
        </div>
    </>
  );
};

export default SalesOrder;
