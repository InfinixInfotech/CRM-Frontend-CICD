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
  putLeadPaymentRaiseThunk,
} from "../../Redux/Services/thunks/LeadPaymentRaiseThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExportData from "../../Components/Button/DataButton/ExportButton";
import { FaCreditCard } from "react-icons/fa";
import FilterImport from "../../Components/FilterImport/FilterImport";
import { PRButton } from "../../Components/Button/PRButton/PRButton";
import { SalesOrderButton } from "../../Components/Button/SalesOrderButton/SalesOrderButton";

const Payment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [AddPaymentRaise, setAddPaymentRaise] = useState([]);
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //!------------------------------Prstatus state here----------------------------------
  const [addPRstatus, setaddPRStatus] = useState("");
  const [showPrStatusPopup, setShowPrStatusPopup] = useState(false);
  const [selectedPrId, setSelectedPrId] = useState(null);
  const [updateStatus, setUpdateStatus] = useState({
    1: "RECIEVED",
    2: "PARTIAL RECIEVED",
    3: "PENDING",
    4: "NOT RECIEVED",
    5: "REJECTED",
    6: "REFUNDED",
  });

  const handleOpenPrStatusPopup = () => {
    setShowPrStatusPopup(true);
  };
  const handleClosePrStatusPopup = () => {
    setShowPrStatusPopup(false);
  };

  const handleChangedropdown = (event) => {
    console.log("Dropdown value selected:", event.target.value);
    setaddPRStatus(event.target.value);
  };

  //!-------------------------------------------Handle PR Status----------------------------------------------

  const handlePrStatus = async (paymentObj) => {
    console.log("Selected Lead ID:", selectedPrId); // Log the selectedLeadId
    console.log("Payment Object Pr ID:", paymentObj.prId); // Log the leadId from paymentObj
    console.log("Payment Object:", paymentObj); // Check the entire paymentObj

    if (!selectedPrId) {
      console.error("Please select a Pr first.");
      return;
    }

    // Ensure the paymentObj has a valid leadId and matches the selectedLeadId
    if (selectedPrId === paymentObj.prId) {
      const AddPaymentRaise = paymentObj;

      if (!paymentObj) {
        console.error("AddPaymentRaise not found");
        return;
      }
  
      const addNewPr = {
        employeeCode: paymentObj.employeeCode,
        employeeName: paymentObj.employeeName,
        prId: selectedPrId,
        leadId: paymentObj.leadId,
        clientDetails: {
          name: paymentObj.clientName,
          fatherName: paymentObj.fathersName,
          motherName: paymentObj.mothersName,
          mobile: paymentObj.mobile,
          email: paymentObj.email,
          dob: paymentObj.dob,
          remark: paymentObj.remark,
        },
        productDetails: {
          segment: paymentObj.segment,
          netAmount: paymentObj.netAmount
            ? parseFloat(paymentObj.netAmount)
            : 0,
          paidAmount: paymentObj.paidAmount
            ? parseFloat(paymentObj.paidAmount)
            : 0,
        },
        paymentDetails: {
          paymentDate: paymentObj.paymentDate,
          modeOfPayment: paymentObj.paymentMode,
          bankName: paymentObj.bankName,
          transactionInfo: paymentObj.transactionId,
          panNo: paymentObj.panNo,
          state: paymentObj.state,
          city: paymentObj.city,
        },
        transactionReceipt: "",
        paymentStatus:
          addPRstatus !== "" ? addPRstatus : AddPaymentRaise?.paymentStatus || "",
      };
  
      dispatch(putLeadPaymentRaiseThunk(addNewPr))
        .then((response) => {
          if (response.payload === null) {
            console.error("No data received from the server");
          }
          // setTimeout(() => {
          //   window.location.reload();
          // }, 400);
        })
        .catch((error) => {
          console.error("Error adding:", error);
        });
    } else {
      console.log("Pr ID mismatch:", selectedPrId, paymentObj.prId);
    }

    setSelectedPrId("");
    handleClosePopup();
  };
  //!-------------------------------------------Status logic end----------------------------------------------
  const { data, loading, error } = useSelector(
    (state) => state.leadpaymentraise
  );

  const handleNavigateToSo = (id, paymentObj) => {
    // console.log("addsalesorder----------", addsalesorder);
    // alert("clicked")
    navigate(`/addsalesorder/${id}`, { state: { paymentObj } });
  };

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
                    <td>{paymentObj.prId || "N/A"}</td>
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
                        {/* //!---------------------------------------Status Button Start--------------------------------------------- */}
                        <div>
                          <StatusButton
                            onClick={() => {
                              handleOpenPrStatusPopup();
                              setSelectedPrId(paymentObj.prId);
                            }}
                          />

                          {showPrStatusPopup && (
                            <>
                              <div
                                className="popup-overlay d-flex justify-content-center align-items-center"
                                onClick={handleClosePrStatusPopup}
                              ></div>
                              <div className="salesOrder-popup-content">
                                <h3 className="text-center mb-4">
                                  Lead Status
                                </h3>
                                <div className="mb-3">
                                  <label
                                    htmlFor="segmentInput"
                                    className="form-label fw-bold"
                                  >
                                    Select Lead Status
                                  </label>
                                  <select
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "500",
                                    }}
                                    name="segmentCategory"
                                    value={addPRstatus || ""}
                                    onChange={handleChangedropdown} // Use the handler directly
                                    className="form-select"
                                  >
                                    <option value="">Select Status</option>
                                    {Object.entries(updateStatus).map(
                                      ([key, value]) => (
                                        <option key={key} value={value}>
                                          {value}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                                <div className="d-flex justify-content-between mt-4">
                                  <button
                                    className="btn btn-secondary me-2"
                                    onClick={handleClosePrStatusPopup}
                                  >
                                    Close
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      handlePrStatus(paymentObj);
                                      console.log("paymentObjJSON.stringify-----------------",JSON.stringify(paymentObj.leadId));
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        {/* //!---------------------------------------Status button end--------------------------------------------- */}
                        {paymentObj.paymentStatus === 1 &&
                          paymentObj.leadId && (
                            <SalesOrderButton
                              onClick={() => {
                                handleNavigateToSo(paymentObj.id, paymentObj);
                              }}
                            />
                          )}

                        <EditButton
                          onClick={() =>
                            handleNavigate(paymentObj.id, paymentObj)
                          }
                          className="btn btn-primary btn-sm mr-1 py-0 px-2"
                        />
                        <DeleteButton
                          onDelete={() => handleDeletePayment(paymentObj)}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
