import React, { useEffect, useState } from "react";
import "./Payment.css";
import DeleteButton from "../../Components/Button/DeleteButton/DeleteButton";
import { EditButton } from "../../Components/Button/EditButton/EditButton";
import { PrintButton } from "../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { StatusButton } from "../../Components/Button/StatusButton/StatusButton";

import {
  deleteLeadPaymentRaiseThunk,
  getAllLeadPaymentRaiseThunk,
} from "../../Redux/Services/thunks/LeadPaymentRaiseThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExportData from "../../Components/Button/DataButton/ExportButton";
import { FaCreditCard } from "react-icons/fa";
import FilterImport from "../../Components/FilterImport/FilterImport";

const Payment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [AddPaymentRaise, setAddPaymentRaise] = useState([]);
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, error } = useSelector(
    (state) => state.leadpaymentraise
  );

  // !<--------------------------------------------------------------------------- HANDLE NAVIGATE --------------------------------------------------------------------------

  const handleNavigate = (id, paymentObj) => {
    if (!paymentObj) {
      console.error("Payment object is undefined or null");
      return;
    }

    navigate(`/editpr/${id}`, {
      state: {
        paymentObj,
        prId: paymentObj.prId,
        id: id,
      },
    });
  };


  // const handleNavigateToViewLead = (id, prId, paymentObj) => {
  //   if (paymentObj.paymentStatus === 1) {
  //     Navigate(`/addsalesorder/${id}`, { state: { prId, leadObj } });
  //   } else {
  //     alert("Payment status is not approved (1). Cannot generate Sales Order.");
  //   }
  // };
  // <button
  //   onClick={() => handleNavigateToSo(leadObj.id, leadObj.prId, leadObj)}
  //   style={{
  //     padding: 2,
  //     margin: 0,
  //     fontSize: "12px",
  //     color: "white",
  //     border: "1px solid grey",
  //     fontWeight: "600",
  //     borderRadius: "0",
  //     backgroundColor: "#758694",
  //   }}
  // >
  //   Generate Sales Order
  // </button>

  useEffect(() => {
    dispatch(getAllLeadPaymentRaiseThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      setAddPaymentRaise(data.data);
    }
  }, [data]);

  // !<--------------------------------------------------------------------------- EMAIL POPUP FUNCTIONALITY--------------------------------------------------------------------------

  const handleEmailPopup = (email) => {
    setSelectedEmail(email);
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedEmail(null);
  };

  // !<--------------------------------------------------------------------------- DELETE PAYMENT FUNCTIONALITY-------------------------------------------------------------------------

  const handleDeletePayment = (id) => {
    dispatch(deleteLeadPaymentRaiseThunk(id))
      .unwrap()
      .then((response) => {
        setMsg(response.message || "deleted successfully");
      })
      .catch((error) => {
        setMsg(error || "Failed to delete status");
      });
  };

  // !<--------------------------------------------------------------------------- PAGINATION LOGIC -------------------------------------------------------------------------

  const totalPages = Math.ceil(AddPaymentRaise.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPR = AddPaymentRaise.slice(indexOfFirstItem, indexOfLastItem);
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
          <FaCreditCard
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Payment Board
        </h2>
      </section>
      <FilterImport />

      <div className="mt-1">
        <div className="payment-outerBgBox mb-2">
          {/* // !<------------------------------------------------------------------------------------ POPUP ----------------------------------------------------------------------------  */}

          {showPopup && (
            <>
              <div
                className="payment-popup-overlay"
                onClick={handleClosePopup}
              ></div>
              <div className="payment-popup-content">
                <button
                  className="payment-popup-close"
                  onClick={handleClosePopup}
                >
                  ✖
                </button>
                <h4 className="mb-3 text-center fs-6">Client Email</h4>
                <p className="text-center">
                  {selectedEmail || "No email available"}
                </p>
              </div>
            </>
          )}

          <div className="payment-paymentTable border border-2 p-2 bg-white mt-2">
            {/* // !<----------------------------------------------------------------------------------- MAIN TABLE STARTING ----------------------------------------------------------------------------  */}
            <ExportData tableId="table-dataOne" />

            <table
              id="table-dataOne"
              className="table table-bordered table-striped text-center mt-2"
            >
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
                {currentPR.map((paymentObj) => (
                  <tr key={paymentObj.id}>
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
                        <DeleteButton
                          onDelete={() => handleDeletePayment(paymentObj.id)}
                          className="btn btn-danger btn-sm mr-1  py-0 px-2"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* // !<------------------------------------------------------------------------------------ PAGINATION SUMMARY ----------------------------------------------------------------------------  */}

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
            {/* // !<------------------------------------------------------------------------------------ TABLE TWO CONTAINER ----------------------------------------------------------------------------  */}

            {/* 
            <div>
              <div className=" mb-0 ">
                <PrintButton tableId="payment-table1" />
                <PdfButton tableId="payment-table1" />
                <CsvButton tableId="payment-table1" />
                <CopyButton tableId="payment-table1" />
              </div>
              <div className="mt-2">
                <table className="table table-bordered" id="payment-table1">
                  <thead className="payment-tableHeader table-dark">
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
              <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  <i className="bi bi-arrow-left-circle"></i>
                </button>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  <i className="bi bi-arrow-right-circle"></i>
                </button>
              </div>
            </div> */}

            {/* // !<------------------------------------------------------------------------------------ TABLE THIRD CONTAINER ----------------------------------------------------------------------------  */}

            {/* <div>
          <div className=" mb-0">
              <PrintButton tableId="payment-table2" />
              <PdfButton tableId="payment-table2" />
              <CsvButton tableId="payment-table2" />
              <CopyButton tableId="payment-table2" />
            </div>
            <div className="mt-2">
              <table className="table table-bordered" id="payment-table2">
                <thead className="payment-tableHeader table-dark">
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
          </div> */}

            {/* // !<------------------------------------------------------------------------------------ TABLE FOURTH CONTAINER ----------------------------------------------------------------------------  */}
            {/* <div>
              <div className=" mb-0">
                <PrintButton tableId="payment-table3" />
                <PdfButton tableId="payment-table3" />
                <CsvButton tableId="payment-table3" />
                <CopyButton tableId="payment-table3" />
              </div>
              <div className="mt-2">
                <table className="table table-bordered" id="payment-table3">
                  <thead className="payment-tableHeader table-dark">
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
              <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  <i className="bi bi-arrow-left-circle"></i>
                </button>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                  >
                    {number}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  <i className="bi bi-arrow-right-circle"></i>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
