import React, { useEffect, useState } from "react";
import "./Payment.css";
import DeleteButton from "../../Components/Button/DeleteButton/DeleteButton";
import { EditButton } from "../../Components/Button/EditButton/EditButton";
import { StatusButton } from "../../Components/Button/StatusButton/StatusButton";
import { HashLoader } from "react-spinners";
import {
  deleteLeadPaymentRaiseThunk,
  getAllLeadPaymentRaiseThunk,
  putLeadPaymentRaiseThunk,
} from "../../Redux/Services/thunks/LeadPaymentRaiseThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExportData from "../../Components/Button/DataButton/ExportButton";
import { FaCreditCard } from "react-icons/fa";
import { SalesOrderButton } from "../../Components/Button/SalesOrderButton/SalesOrderButton";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { getPaymentFilterThunk } from "../../Redux/Services/thunks/AgeFilterThunk";
import { emp, storedUsername } from "../../Redux/Services/apiServer/ApiServer";
import { getAllEmpCodeNameThunk } from "../../Redux/Services/thunks/AdditionalApiThunk";

const Payment = () => {
  // window.scrollTo({ top: 0, behavior: "smooth" });
  const [Loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [AddPaymentRaise, setAddPaymentRaise] = useState([]);
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemperPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //!------------------------------Prstatus state here----------------------------------
  const [CurrentPaymentObj, setCurrentPaymentObj] = useState([]);
  const [addPRstatus, setaddPRStatus] = useState();
  const [showPrStatusPopup, setShowPrStatusPopup] = useState(false);
  // const [selectedPrId, setSelectedPrId] = useState(null);
  const { emplist, } = useSelector((state) => state.additional);
  const [options, setOptions] = useState([]);
  const pageOptions = [10, 20, 30, 50, 70, 100];
  const [updateStatus, setUpdateStatus] = useState({
    1: "RECIEVED",
    // 2: "PARTIAL RECIEVED",
    // 3: "PENDING",
    4: "NOT RECIEVED",
    5: "REJECTED",
    6: "REFUNDED",
  });
  const paymentStatusMap = {
    0: "PENDING",
    1: "RECIEVED",
    2: "PARTIAL RECIEVED",

    4: "NOT RECIEVED",
    5: "REJECTED",
    6: "REFUNDED",
  }

  const [totalCount, setTotalCount] = useState(0);
  // const storedUsername = localStorage.getItem("userName");


  useEffect(() => {
    dispatch(getAllEmpCodeNameThunk());
    // console.log("data-----------------", emplist);
  }, [dispatch]);


  useEffect(() => {
    if (emplist && Array.isArray(emplist.data)) {
      // console.log("Data received:", data);
      // Transform the array into dropdown options
      const transformedOptions = emplist.data.map((item) => ({
        id: item.employeeCode,  // Unique key
        employeeCode: item.employeeCode,
        employeeName: item.employeeName,
        label: `${item.employeeCode} - ${item.employeeName}`,
      }));

      setOptions(transformedOptions);
    } else {
      // console.log("Invalid data format or no data available.");
    }
  }, [emplist]);


  const handleOpenPrStatusPopup = () => {
    setShowPrStatusPopup(true);
  };
  const handleClosePrStatusPopup = () => {
    setShowPrStatusPopup(false);
  };

  // const handleChangedropdown = (e) => {
  //   const value = e.target.value;
  //   const statusKey = Object.keys(updateStatus).find(
  //     (key) => updateStatus[key] === value
  //   );
  //   setaddPRStatus(statusKey || value);
  // };

  const handleChangedropdown = (e) => {
    const value = e.target.value;
    setaddPRStatus(value);
  };
  //!-------------------------------------------Handle PR Status----------------------------------------------

  const handlePrStatus = async (paymentObj) => {
    // console.log("Payment Object Received------------------------------------here:", JSON.stringify(paymentObj));

    if (!paymentObj || !paymentObj.prId) {
      // console.error("Invalid Payment Object or missing prId");
      return;
    }
    setLoading(true);
    const addNewPr = {
      id: paymentObj.id,
      employeeCode: paymentObj.employeeCode,
      employeeName: paymentObj.employeeName,
      prId: paymentObj.prId,
      leadId: paymentObj.leadId,
      clientDetails: {
        name: paymentObj.clientDetails.name,
        fatherName: paymentObj.clientDetails.fatherName,
        motherName: paymentObj.clientDetails.motherName,
        mobile: paymentObj.clientDetails.mobile,
        email: paymentObj.clientDetails.email,
        dob: paymentObj.clientDetails.dob,
        remark: paymentObj.clientDetails.remark,
      },
      productDetails: {
        segment: paymentObj.productDetails.segment,
        netAmount: paymentObj.productDetails.netAmount,
        paidAmount: paymentObj.productDetails.paidAmount,
      },
      paymentDetails: {
        paymentDate: paymentObj.paymentDetails.paymentDate,
        modeOfPayment: paymentObj.paymentDetails.modeOfPayment,
        bankName: paymentObj.paymentDetails.bankName,
        transactionInfo: paymentObj.paymentDetails.transactionInfo,
        panNo: paymentObj.paymentDetails.panNo,
        state: paymentObj.paymentDetails.state,
        city: paymentObj.paymentDetails.city,
      },
      transactionReceipt: paymentObj.transactionReceipt,
      paymentStatus:
        addPRstatus !== "" ? addPRstatus : paymentObj?.paymentStatus || "",
    };

    dispatch(putLeadPaymentRaiseThunk(addNewPr))
      .then((response) => {
        if (response.payload === null) {
          console.error("No data received from the server");
        } else {
          console.log("Response from server:", response.payload);
        }

        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 100);
      })
      .catch((error) => {
        console.error("Error adding:", error);
      });
    handleClosePrStatusPopup();
    useEffect(() => {
      dispatch(getAllLeadPaymentRaiseThunk());
    }, [dispatch]);

  };

  //!-----------------------------------------------------------------------------Status logic end--------------------------------------------------------------------------
  const { data, loading, error } = useSelector(
    (state) => state.leadpaymentraise
  );
  // const totalCount = data?.totalCount || 0;

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
  const params = {
    pageNumber: currentPage,
    itemsPerPage: itemsPerPage
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const params = {
  //       pageNumber: currentPage,
  //       itemsPerPage: itemsPerPage
  //     };
  //     dispatch(getAllLeadPaymentRaiseThunk(params));
  //   };
  //   fetchData();
  // }, [dispatch, currentPage, itemsPerPage]);

  // useEffect(() => {
  //   if (data?.data) {
  //     setAddPaymentRaise(Array.isArray(data.data) ? data.data : [data.data]);
  //   }
  // }, [data]);
  const [filterData, setfilterData] = useState([]);
  const [selectedLeadSource, setSelectedLeadSource] = useState("All");
  const [ageBetween1, setAgeBetween1] = useState("");
  const [ageBetween2, setAgeBetween2] = useState("");
  const [State, setState] = useState("All");
  const [City, setCity] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [segment, setSegment] = useState("");
  const [prId, setprId] = useState("");
  const [leadId, setleadId] = useState("");
  const [employeeCode, setemployeeCode] = useState("");
  // const [pageNumber] = useState(1);
  // const [limit] = useState(10);
  const { data: ageFilterData } = useSelector((state) => state.agefilter);
  const indianStates = [
    "All", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar", "Chandigarh",
    "Daman and Diu", "Lakshadweep", "Delhi",
    "Puducherry", "Ladakh", "Jammu and Kashmir"
  ];
  //  const fetchLeads = () => {
  //     let filters = {
  //       agebetween1: ageBetween1 || "",
  //       agebetween2: ageBetween2 || "",
  //       SoStatus: soStatus === "All" ? "" : soStatus,
  //       Segment: segment === "All" ? "" : segment,
  //       state: State === "All" ? "" : State,
  //       city: City === "All" ? "" : City,
  //       prId: prId || "",
  //       leadId: leadId || "",
  //       soId: soId || "",
  //       employeeCode: employeeCode || "",
  //     };

  //     const hasFilters = Object.entries(filters).some(
  //       ([key, value]) => value !== "" && value !== "All"
  //     );

  //     if (hasFilters) {
  //       if ( (["admin", "Admin", "ADMIN"].includes(storedUsername))) {
  //         dispatch(getSoFilterThunk({ ...filters, employeeCode: employeeCode === "All" ? "" : employeeCode, pageNumber: currentPage, limit: itemsPerPage }));
  //       }
  //       else{
  //         dispatch(getSoFilterThunk({ ...filters, employeeCode: emp === "All" ? "" : emp, pageNumber: currentPage, limit: itemsPerPage }));
  //       }
  //     } else {
  //       dispatch(getAllSalesOrderThunk({ ...params, employeeCode: emp === "All" ? "" : emp, pageNumber: currentPage, limit: itemsPerPage }));
  //     }
  //   };
  const fetchLeads = () => {
    const filters = {
      agebetween1: ageBetween1 || "",
      agebetween2: ageBetween2 || "",
      PaymentStatus: paymentStatus === "All" ? "" : paymentStatus,
      Segment: segment || "",
      state: State === "All" ? "" : State,
      city: City || "",
      prId: prId || "",
      leadId: leadId || "",
      employeeCode: employeeCode || "",
    };
    const hasFilters = Object.entries(filters).some(
      ([key, value]) => value !== "" && value !== "All"
    );
    if (hasFilters) {
      if ((["admin", "Admin", "ADMIN"].includes(storedUsername))) {
        dispatch(getPaymentFilterThunk({ ...filters, employeeCode: employeeCode === "All" ? "" : employeeCode, pageNumber: currentPage, limit: itemsPerPage }));
      }
      else {
        dispatch(getPaymentFilterThunk({ ...filters, employeeCode: emp === "All" ? "" : emp, pageNumber: currentPage, limit: itemsPerPage }));
      }
    } else {
      dispatch(getAllLeadPaymentRaiseThunk({ ...filters, employeeCode: emp === "All" ? "" : emp, pageNumber: currentPage, limit: itemsPerPage }));
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "paymentStatus":
        setPaymentStatus(Number(value));
        break;
      case "segment":
        setSegment(value);
        break;
      case "state":
        setState(value);
        break;
      case "city":
        setCity(value);
        break;
      case "prId":
        setprId(value);
        break;
      case "leadId":
        setleadId(value);
        break;
      case "employeeCode":
        setemployeeCode(value);
        break;
      case "ageRange":
        if (value === "All") {
          setAgeBetween1("");
          setAgeBetween2("");
        } else {
          const [min, max] = value.split("-").map(Number);
          setAgeBetween1(min);
          setAgeBetween2(max);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLeads();
      // console.log("fetchLeads Called----------------------")
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedLeadSource, ageBetween1, ageBetween2, paymentStatus, segment, State, City, currentPage, itemsPerPage, prId, employeeCode, leadId, dispatch,]);


  useEffect(() => {
    setfilterData([])
    if (ageFilterData) {
      setfilterData(ageFilterData);
    } else {
    }
  }, [ageFilterData]);


  useEffect(() => {
    if (filterData) {
      setAddPaymentRaise(filterData.data);
      setTotalCount(filterData?.totalCount || 0);
      // console.log("totalCount--------------------" + filterData.totalCount)
    } else {

    }
    // console.log("filterData----------------------" + filterData);
  }, [filterData]);

  useEffect(() => {
    fetchLeads();
  }, []);


  useEffect(() => {

    if (data != null) {
      setAddPaymentRaise(data?.data);
      setTotalCount(data?.totalCount || 0);
    }
    else {

    }
  }, [data]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);
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
        setAddPaymentRaise((prevStatuses) =>
          prevStatuses.filter((AddPaymentRaise) => AddPaymentRaise.id !== id)
        );
        setMsg(response.message || "deleted successfully");
      })
      .catch((error) => {
        setMsg(error || "Failed to delete status");
      });
  };

  // !<--------------------------------------------------------------------------- PAGINATION LOGIC -------------------------------------------------------------------------
  return (
    <>
      <section
        style={{
          // position: "relative",
          // z-index: 1;
          zIndex: "1",
          // padding: "12px 30px",
          background: "#2c3e50",

          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          marginBottom: "0px",
          marginBottom: "5px",
        }}
        className="mt-2"
      >
        <h2
          className="mb-0 mt-5 mb-2"
          style={{
            padding: "8px 10px",
            fontSize: "28px",
            color: "white",
          }}
        >
          <FaCreditCard
            className="fs-1"
            style={{ marginRight: "8px", color: "white" }}
          />
          Payment Board
        </h2>
      </section>



      <div className="bg-white border border-2 px-4">
        {/* Filters Row */}
        <div className="d-flex align-items-center gap-3 flex-wrap" style={{ height: "80px" }}>

          {/* Lead Source Filter */}
          {/* <div>
            <label className="form-label">Lead Source</label>
            <select className="form-select input-box" name="selectedLeadSource" value={selectedLeadSource} onChange={handleChange}>
              <option value="All">All</option>
              <option value="Fresh Pool">Fresh Pool</option>
              <option value="Diamond Pool">Diamond Pool</option>
              <option value="Platinum Pool">Platinum Pool</option>
              <option value="HNI Pool">HNI Pool</option>
            </select>
          </div> */}

          {/* Age Range Filter */}
          <div>
            <label className="form-label">Search By Age</label>
            <select className="form-select input-box" name="ageRange" value={ageBetween1 && ageBetween2 ? `${ageBetween1}-${ageBetween2}` : "All"} onChange={handleChange}>
              <option value="All">All</option>
              <option value="18-25">18 - 25 years</option>
              <option value="26-35">26 - 35 years</option>
              <option value="36-45">36 - 45 years</option>
              <option value="46-55">46 - 55 years</option>
              <option value="56-65">56 - 65 years</option>
              <option value="66-75">66 - 75 years</option>
            </select>
          </div>

          {/* Lead Status Filter */}
          <div>
            <label className="form-label">Payment Status</label>
            <select className="form-select input-box" name="paymentStatus" value={paymentStatus} onChange={handleChange}>
              <option value="All">All</option>
              <option value="1">RECIEVED</option>
              <option value="2"> PARTIAL RECIEVED</option>
              <option value="4">NOT RECIEVED</option>
              <option value="5">REJECTED</option>
              <option value="6">REFUNDED</option>

            </select>
          </div>

          {/* Segment Filter */}
          <div>
            <label className="form-label w-50">Segment</label>
            <select name="segment" className="form-control input-box" id="" value={segment} onChange={handleChange}>
              <option value="All">All</option>
              <option value="Index Option">Index Option</option>
              <option value="Index Future">Index Future</option>
              <option value="Stock Option">Stock Option</option>
              <option value="Stock Future">Stock Future</option>
              <option value="Stock Cash">Stock Cash</option>
            </select>
            {/* <input type="text" className="form-control input-box" name="segment" placeholder="Enter Segment" value={segment} onChange={handleChange} /> */}
          </div>

          {/* State Filter */}
          <div>
            <label className="form-label w-50">State</label>
            <select className="form-select input-box" name="state" value={State} onChange={handleChange}>
              {indianStates.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {storedUsername?.toLowerCase() === "admin" && (
            <div>
              <label className="form-label">Employee Name</label>
              <select
                className="form-select input-box"
                name="employeeCode"
                value={options.employeeCode}
                onChange={handleChange}
              >
                <option value="" disabled>
                  --Select Employee Name--
                </option>
                {options.map((option) => (
                  <option key={option.id} value={option.employeeCode}>
                    {option.employeeName}
                  </option>
                ))}
              </select>
            </div>
          )}



          <div>
            <label className="form-label">PR ID</label>
            <input
              type="text"
              className="form-control input-box"
              placeholder="Enter PR Id"
              name="prId"
              value={prId}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label">Lead ID</label>
            <input type="text" className="form-control input-box"
              placeholder="Enter Lead Id "
              name="leadId"
              value={leadId}
              onChange={handleChange}
            />
          </div>

        </div>
      </div>


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
            <div className="d-flex gap-2">
              <ExportData tableId="table-dataOne" />
              <div>
                <div>
                  {/* <label htmlFor="itemsPerPage">Items per page:</label> */}
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => setItemperPage(Number(e.target.value))}
                    className="form-select input-box"
                  >
                    {pageOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="table-responsive">

              <table
                id="table-dataOne"
                className="table table-responsive table-bordered table-hover text-center mt-2"
                style={{ fontSize: "12px" }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th>S.No.</th>
                    <th>Lead Id</th>
                    <th>PR Id</th>
                    <th>Payment Date</th>
                    <th>Client Name</th>
                    {/* <th>Mobile</th> */}
                    <th>Employee Code</th>
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
                    <th>Payment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                  {loading ? (
                    <tr>
                      <td colSpan="10" className="text-center">
                        <div
                          style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(104, 102, 102, 0.5)",
                            zIndex: 9998,
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              zIndex: 9999,
                              backgroundColor: "transparent",
                            }}
                          >
                            <HashLoader color="#0060f1" size={50} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="10" className="text-center text-danger">
                        Error: {error}
                      </td>
                    </tr>
                  ) :AddPaymentRaise?.length > 0 &&
                    AddPaymentRaise.map((paymentObj, index) => (
                      <tr key={paymentObj?.id ?? `payment-${index}`}>
                        <td className="fs-md-6 fs-sm-7">{paymentObj.id}</td>
                        <td className="fs-md-6 fs-sm-7"> {paymentObj.leadId}</td>
                        <td>{paymentObj.prId || "N/A"}</td>

                        <td className="fs-md-6 fs-sm-7">{paymentObj.paymentDetails?.paymentDate || "N/A"}</td>
                        <td className="fs-md-6 fs-sm-7">{paymentObj.clientDetails?.name || "N/A"}</td>
                        {/* <td className="fs-md-6 fs-sm-7">{paymentObj.clientDetails?.mobile || "N/A"}</td> */}
                        <td className="fs-md-6 fs-sm-7"> {paymentObj.employeeCode || "N/A"}</td>
                        <td className="fs-md-6 fs-sm-7"> {paymentObj.employeeName || "N/A"}</td>
                        <td className="fs-md-6 fs-sm-7">{paymentObj.manager || "N/A"}</td>
                        <td className="fs-md-6 fs-sm-7">{paymentObj.paymentDetails?.panNo || "N/A"}</td>
                        <td className="fs-md-6 fs-sm-7">{paymentObj.productDetails?.segment || "N/A"}</td>
                        <td className="fs-md-6 fs-sm-7">{paymentObj.paymentDetails?.bankName || "N/A"}</td>
                        <td className="fs-md-6 fs-sm-7">{paymentObj.productDetails?.netAmount || "N/A"}</td>
                        <td className="fs-md-6 fs-sm-7">
                          <button
                            className="btn btn-sm text-primary"
                            onClick={() =>
                              handleEmailPopup(paymentObj.clientDetails?.email)
                            }
                          >
                            Email
                          </button>
                        </td>
                        <td className="fs-md-6 fs-sm-7">{paymentObj.paymentDetails?.city || "N/A"}</td>
                        <td className="fs-md-6 fs-sm-7"> {paymentObj.paymentDetails?.state || "N/A"}</td>
                        <td className="fs-md-6 fs-sm-7">{paymentObj.clientDetails?.dob || "N/A"}</td>
                        <td className="fs-md-6 fs-sm-7">{paymentObj.paymentStatus ?
                          paymentStatusMap[paymentObj.paymentStatus] : "N/A" || "N/A"}</td>
                        <td className="fs-md-6 fs-sm-7">
                          <div className="d-flex flex-row gap-2">
                            {/* //!---------------------------------------Status Button Start--------------------------------------------- */}
                            <div>


                              {!["admin", "Admin", "ADMIN"].includes(localStorage.getItem("userName")) && (
                                <p className={`p-1 rounded-1 py-0 ${paymentObj.paymentStatus !== 1 ? "bg-warning" : "bg-success"}`}>
                                  {paymentObj.paymentStatus !== 1 ? "Pending" : ""}
                                </p>
                              )}


                              {paymentObj.leadId &&
                                (["admin", "Admin", "ADMIN"].includes(storedUsername)) && (
                                  <StatusButton
                                    onClick={() => {
                                      handleOpenPrStatusPopup(paymentObj);
                                      console.log("Opening popup for:", paymentObj);
                                      console.log("Current popup for:", CurrentPaymentObj);
                                      setCurrentPaymentObj(paymentObj);
                                    }}
                                  />
                                )
                              }

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
                                        onChange={(e) => handleChangedropdown(e)}
                                      >
                                        <option value="">Select Status</option>
                                        {Object.entries(updateStatus).map(
                                          ([key, value]) => (
                                            <option key={key} value={key}>
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
                                          console.log(
                                            "Selected Payment Object:",
                                            paymentObj.prId
                                          );
                                          console.log(
                                            "Current Payment Object:",
                                            CurrentPaymentObj
                                          );
                                          handlePrStatus(CurrentPaymentObj);
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


                            {["admin", "Admin", "ADMIN"].includes(storedUsername) && (
                              <>
                                <EditButton
                                  onClick={() => handleNavigate(paymentObj.id, paymentObj)}
                                  className="btn btn-primary btn-sm mr-1 py-0 px-2"
                                />
                                <DeleteButton
                                  onDelete={() => handleDeletePayment(paymentObj.id)}
                                  className="btn btn-danger btn-sm mr-1 py-0 px-2"
                                />
                              </>
                            )}

                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* // !<------------------------------------------------------------------------------------ PAGINATION SUMMARY ----------------------------------------------------------------------------  */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="mb-3">
                Showing {currentPage * itemsPerPage - itemsPerPage + 1} -{' '}
                {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} entries
              </div>
              <div className="pagination d-flex  justify-content-end">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-outline-primary p-0 btn-circle ms-0"
                >
                  <LucideChevronLeft />

                </button>

                <button

                  className="btn btn-outline-primary p-2 py-0 btn-circle ms-0"

                >
                  {currentPage}
                </button>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-outline-primary p-0 btn-circle ms-0"
                >
                  <LucideChevronRight />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
