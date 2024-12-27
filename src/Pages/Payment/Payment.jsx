import React, { useEffect, useState } from "react";
import "./Payment.css";
import DeleteButton from "../../Components/Button/DeleteButton/DeleteButton";
import { EditButton } from "../../Components/Button/EditButton/EditButton";
import { PrintButton } from "../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { StatusButton } from "../../Components/Button/StatusButton/StatusButton";

import { getAllLeadPaymentRaiseThunk } from "../../Redux/Services/thunks/LeadPaymentRaiseThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  // const [payments, setPayments] = useState([]);
  const [data, setdata] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleNavigate = (id, paymentObj) => {
    if (!paymentObj) {
      console.error("Payment object is undefined or null");
      return;
    }
  
    // console.log("payment ----------------------",paymentObj);
    navigate(`/editpr/${id}`, { state: { paymentObj } });
  };
  
  const fetchPaymentAll = () => {
    dispatch(getAllLeadPaymentRaiseThunk()).then((response) => {
      const payment = response.payload?.data;
      console.log(payment);
      setdata(payment);
      // setEditStatus(payment?.id);
      // setEditValue(payment?.payment);
    });
  };

  useEffect(() => {
    fetchPaymentAll();
  }, [dispatch]);

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
        Payment Board
      </h2>

      <div className="container-fluid border border-2 border-gray mt-1 ">
        <div className="outerBgBox mb-2">
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

          <div className="dropDownContainer p-3 m-3 ">
            {/* Filters */}
            <div className="row d-flex gap-2 mb-0 ">
              {[
                "Status",
                "By Date",
                "SO",
                "Assigned",
                "Bank Name",
                "Branch",
                "Lead Source",
              ].map((filter, index) => (
                <div className="col-md-2" key={index}>
                  <div>
                    <label className="ViewLeadFormLable form-label ">
                      {filter}
                    </label>
                    <select
                      className="formControl form-control px-2"
                      style={{ width: "8vw" }}
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

          <div className="paymentTable container-fluid mt-2">
            <table className="table table-bordered table-striped text-center">
              <thead className="thead-dark">
                <tr>
                <th>S.No.</th>
                  <th>Lead Id</th>
                  <th>Payment Date</th>
                  <th>Client Name</th>
                  <th>Mobile</th>
                  <th>Lead Owner</th>
                  <th>Manager</th>
                  <th>PAN No</th>
                  <th>Segment</th>
                  <th>Bank</th>
                  <th>Total</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>State</th>
                  <th>DOB</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((paymentObj, index) => (
                  <tr key={index}>
                     <td>{paymentObj.id}</td>
                    <td>{paymentObj.leadId}</td>
                    <td>{paymentObj.paymentDetails?.paymentDate || "N/A"}</td>
                    <td>{paymentObj.clientDetails?.name || "N/A"}</td>
                    <td>{paymentObj.clientDetails?.mobile || "N/A"}</td>
                    <td>{paymentObj.employeeName || "N/A"}</td>
                    <td>{paymentObj.manager || "N/A"}</td>
                    <td>{paymentObj.paymentDetails?.panNo || "N/A"}</td>
                    <td>{paymentObj.productDetails?.segment || "N/A"}</td>
                    <td>{paymentObj.paymentDetails?.bankName || "N/A"}</td>
                    <td>{paymentObj.productDetails?.netAmount || "N/A"}</td>
                    <td>
                      <button
                        className="btn btn-sm text-primary"
                        onClick={() =>
                          handleEmailPopup(paymentObj.clientDetails?.email)
                        }
                      >
                        Email
                      </button>
                    </td>
                    <td>{paymentObj.paymentDetails?.city || "N/A"}</td>
                    <td>{paymentObj.paymentDetails?.state || "N/A"}</td>
                    <td>{paymentObj.clientDetails?.dob || "N/A"}</td>
                    <td>
                      <div className="d-flex flex-row gap-2">
                        <StatusButton className="btn btn-primary btn-sm mr-1 py-0 px-2" />
                        <EditButton
                          onClick={() =>
                            handleNavigate(paymentObj.id, paymentObj)
                          }
                          className="btn btn-primary btn-sm mr-1 py-0 px-2"
                        />
                        <DeleteButton className="btn btn-danger btn-sm mr-1  py-0 px-2" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination and Summary */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                Showing <strong>1 to 10</strong> of <strong>3,445</strong>{" "}
                entries
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item">
                    <button className="page-link px-2 py-0">Previous</button>
                  </li>
                  <li className="page-item active">
                    <button className="page-link px-2 py-0">1</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link px-2 py-0">2</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link px-2 py-0">Next</button>
                  </li>
                </ul>
              </nav>
            </div>

            <div className=" mb-0 ">
              <PrintButton tableId="payment-table1" />
              <PdfButton tableId="payment-table1" />
              <CsvButton tableId="payment-table1" />
              <CopyButton tableId="payment-table1" />
            </div>
            <div className="mt-2">
              <table className="table table-bordered" id="payment-table1">
                <thead className="tableHeader table-dark">
                  <tr>
                    <th>Date Range</th>
                    <th>Branch</th>
                    <th>Grand Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>All</td>
                    <td></td>
                    <td>3190806</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination and Summary */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                Showing <strong>1 to 10</strong> of <strong>3,445</strong>{" "}
                entries
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item ">
                    <button className="page-link px-2 py-0">Previous</button>
                  </li>
                  <li className="page-item active">
                    <button className="page-link px-2 py-0">1</button>
                  </li>

                  <li className="page-item">
                    <button className="page-link px-2 py-0">Next</button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Summary */}
            <div className=" mb-0">
              <PrintButton tableId="payment-table2" />
              <PdfButton tableId="payment-table2" />
              <CsvButton tableId="payment-table2" />
              <CopyButton tableId="payment-table2" />
            </div>
            <div className="mt-2">
              <table className="table table-bordered" id="payment-table2">
                <thead className="tableHeader table-dark">
                  <tr>
                    <th>Date Range</th>
                    <th>Total Number Of Payment</th>
                    <th>Grand Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>All</td>
                    <td>152</td>
                    <td>3190806</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination and Summary */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                Showing <strong>1 to 10</strong> of <strong>3,445</strong>{" "}
                entries
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item">
                    <button className="page-link px-2 py-0">Previous</button>
                  </li>
                  <li className="page-item active">
                    <button className="page-link px-2 py-0">1</button>
                  </li>

                  <li className="page-item">
                    <button className="page-link px-2 py-0">Next</button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Summary */}
            <div className=" mb-0">
              <PrintButton tableId="payment-table3" />
              <PdfButton tableId="payment-table3" />
              <CsvButton tableId="payment-table3" />
              <CopyButton tableId="payment-table3" />
            </div>
            <div className="mt-2">
              <table className="table table-bordered" id="payment-table3">
                <thead className="tableHeader table-dark">
                  <tr>
                    <th>Branch Name</th>
                    <th>Target</th>
                    <th>Gross Amount</th>
                    <th>Net Amount</th>
                    <th>Remaining</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td>1</td>
                    <td>4287223</td>
                    <td>3572685.83</td>
                    <td>-4287222</td>
                    <td>428722300%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination and Summary */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                Showing <strong>1 to 10</strong> of <strong>3,445</strong>{" "}
                entries
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item">
                    <button className="page-link px-2 py-0">Previous</button>
                  </li>
                  <li className="page-item active">
                    <button className="page-link px-2 py-0">1</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link px-2 py-0">Next</button>
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

export default Payment;
