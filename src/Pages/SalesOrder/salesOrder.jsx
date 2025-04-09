import React, { useEffect, useState } from "react";
import { EditButton } from "../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../Components/Button/DeleteButton/DeleteButton";
import { useNavigate } from "react-router-dom";
import "./SalesOrder.css";
import {
  deleteSalesOrderThunk,
  getAllSalesOrderThunk,
  putSalesOrderThunk,
} from "../../Redux/Services/thunks/SalesOrderThunk";
import { useDispatch, useSelector } from "react-redux";
import ExportData from "../../Components/Button/DataButton/ExportButton";
import { FaShoppingCart } from "react-icons/fa";
import { StatusButton } from "../../Components/Button/StatusButton/StatusButton";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { getSoFilterThunk } from "../../Redux/Services/thunks/AgeFilterThunk";
import { emp, storedUsername } from "../../Redux/Services/apiServer/ApiServer";
import { getAllEmpCodeNameThunk } from "../../Redux/Services/thunks/AdditionalApiThunk";
import { HashLoader } from "react-spinners";

const SalesOrder = () => {
  window.scrollTo(0, 0);
  const [salesOrder, setsalesOrder] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemperPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const { data, loading, error } = useSelector((state) => state.salesorder);
  // const totalCount = data?.totalCount || 0; 

  const dispatch = useDispatch();
  const pageOptions = [10, 20, 30, 50, 70, 100];

  //!------------------------------SoStatus state here----------------------------------
  const [CurrentSalesOrderObj, setCurrentSalesOrderObj] = useState([]);
  const [addSoStatus, setAddSoStatus] = useState();
  const [showSoStatusPopup, setShowSoStatusPopup] = useState(false);
  const { emplist, } = useSelector((state) => state.additional);
  const [options, setOptions] = useState([]);

  const [updateStatus, setUpdateStatus] = useState({
    1: "APPROVED",
    2: "PENDING",
    3: "REJECTED",
  })
  const salesorderMap = {
    1: "APPROVED",
    2: "PENDING",
    3: "REJECTED",
  }
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


  const handleOpenSOStatusPopup = () => {
    setShowSoStatusPopup(true);
  };
  const handleCloseSOStatusPopup = () => {
    setShowSoStatusPopup(false);
  };

  const handleChangedropdown = (e) => {
    const value = e.target.value;
    setAddSoStatus(value);
  };

  //!----------------------------------------------------------------------------------------------------------Handle PR Status-----------------------------------------------------------------------------------------------

  const handleSOStatus = async (salesOrderObj) => {
    console.log("salesOrderObj Received:", salesOrderObj);

    if (!salesOrderObj || !salesOrderObj.soId) {
      console.error("Invalid salesOrderObj or missing soId");
      return;
    }
    const addNewSo = {
      id: salesOrderObj.id || "",
      soId: salesOrderObj.soId || "SO12345",
      employeeCode: salesOrderObj.employeeCode,
      soStatus: addSoStatus !== "" ? addSoStatus : salesOrderObj.soStatus || "",
      employeeName: salesOrderObj?.employeeName || "John Doe",
      // so: salesOrderObj?.so || "DefaultSO",
      leadId: salesOrderObj.leadId || "L67890",
      prId: salesOrderObj.prId || "string",
      personalDetails: {
        createdDate:
          salesOrderObj?.personalDetails?.createdDate,
        // new Date().toISOString().split("T")[0],
        clientName: salesOrderObj?.personalDetails?.clientName || "",
        fatherName: salesOrderObj?.personalDetails?.fatherName || "Father's Name",
        motherName: salesOrderObj?.personalDetails?.motherName || "Mother's Name",
        mobile: salesOrderObj?.personalDetails?.mobile || "1234567890",
        email: salesOrderObj?.personalDetails?.email || "email@example.com",
        dob: salesOrderObj?.personalDetails?.dob || "2000-01-01",
        address: {
          city: salesOrderObj?.personalDetails?.address?.city || "CityName",
          state: salesOrderObj?.personalDetails?.address?.state || "StateName",
          pinCode: salesOrderObj?.personalDetails?.address?.pinCode || "123456",
        },
        aadhar: salesOrderObj?.personalDetails?.aadhar || "123456789012",
        panNo: salesOrderObj?.personalDetails?.panNo || "ABCDE1234F",
        gstin: salesOrderObj?.personalDetails?.gstin || "GSTIN12345678",
        sac: salesOrderObj?.personalDetails?.sac || "SAC123",
      },
      paymentDetails: {
        paymentDate:
          salesOrderObj?.paymentDetails?.paymentDate ||
          "2024-12-17T07:19:15.663Z",
        modeOfPayment: salesOrderObj?.paymentDetails?.modeOfPayment || "Online Payment",
        bankName: salesOrderObj?.paymentDetails?.bankName || "BankName",
        paymentGateway: salesOrderObj?.paymentDetails?.paymentGateway || "",
        serviceMode: salesOrderObj?.paymentDetails?.serviceMode || "",
        terms: salesOrderObj?.paymentDetails?.terms || "",
        paymentIdOrRefNo: salesOrderObj?.paymentDetails?.paymentIdOrRefNo || "",
        serviceStatus: salesOrderObj?.paymentDetails?.serviceStatus || "",
      },
      businessDetails: {
        businessType: salesOrderObj?.businessDetails?.businessType || "New Business",
        comment: salesOrderObj?.businessDetails?.comment || "Some comment here",
      },
      productDetails: salesOrderObj?.productDetails || [
        {
          product: salesOrderObj.product,
          startDate: salesOrderObj.startDate,
          endDate: salesOrderObj.endDate,
          grandTotal: salesOrderObj.grandTotal,
          remaining: salesOrderObj.remaining,
          discount: salesOrderObj.discount,
          adjustment: salesOrderObj.adjustment,
        },
      ],
    };

    dispatch(putSalesOrderThunk(addNewSo))
      .then((response) => {
        if (response.payload === null) {
          console.error("No data received from the server");

        } else {
          console.log("Response from server:", response.payload);
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      })
      .catch((error) => {
        console.error("Error adding:", error);
      });
    handleCloseSOStatusPopup();
  };

  //!---------------------------------------------------------------------------------------------Status Handle logic end------------------------------------------------------------------------------------------------------------


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

  // const dispatch = useDispatch();

  // const GetAllSalesOrder = () => {
  //   dispatch(getAllSalesOrderThunk())
  //   .then((response) => {
  //     if (response?.error) {
  //       console.error("Error:", response.error);
  //     } else {
  //       const salesorder = response.payload?.data;
  //       console.log(salesorder);
  //       setsalesOrder(salesorder);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Request failed", error);
  //   });
  // };

  // useEffect(() => {
  //   GetAllSalesOrder();
  // }, [dispatch]);



  // getAllSalesOrderThunk

  const params = {
    pageNumber: currentPage,
    itemsPerPage: itemsPerPage,
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const params = {
  //       pageNumber: currentPage,
  //       itemsPerPage: itemsPerPage,
  //     };
  //     dispatch(getAllSalesOrderThunk(params));
  //   };
  //   fetchData();
  // }, [dispatch, currentPage, itemsPerPage]);

  // useEffect(() => {
  //   if (data?.data) {
  //     setsalesOrder(Array.isArray(data.data) ? data.data : [data.data]);
  //   }
  // }, [data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [filterData, setfilterData] = useState([]);
  // const [selectedLeadSource, setSelectedLeadSource] = useState("All");
  const [ageBetween1, setAgeBetween1] = useState("");
  const [ageBetween2, setAgeBetween2] = useState("");
  const [State, setState] = useState("All");
  const [City, setCity] = useState("");
  const [soStatus, setSoStatus] = useState("All");
  const [segment, setSegment] = useState("");
  const { data: ageFilterData } = useSelector((state) => state.agefilter);
  const [prId, setprId] = useState("");
  const [leadId, setleadId] = useState("");
  const [soId, setsoId] = useState("");
  const [employeeCode, setemployeeCode] = useState("");
  const indianStates = [
    "All", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar", "Chandigarh",
    "Daman and Diu", "Lakshadweep", "Delhi",
    "Puducherry", "Ladakh", "Jammu and Kashmir"
  ];

  // Fetch Leads Data
  const fetchLeads = () => {
    let filters = {
      agebetween1: ageBetween1 || "",
      agebetween2: ageBetween2 || "",
      SoStatus: soStatus === "All" ? "" : soStatus,
      Segment: segment === "All" ? "" : segment,
      state: State === "All" ? "" : State,
      city: City === "All" ? "" : City,
      prId: prId || "",
      leadId: leadId || "",
      soId: soId || "",
      employeeCode: employeeCode || "",
    };

    const hasFilters = Object.entries(filters).some(
      ([key, value]) => value !== "" && value !== "All"
    );

    if (hasFilters) {
      if ((["admin", "Admin", "ADMIN"].includes(storedUsername))) {
        dispatch(getSoFilterThunk({ ...filters, employeeCode: employeeCode === "All" ? "" : employeeCode, pageNumber: currentPage, limit: itemsPerPage }));
      }
      else {
        dispatch(getSoFilterThunk({ ...filters, employeeCode: emp === "All" ? "" : emp, pageNumber: currentPage, limit: itemsPerPage }));
      }
    } else {
      dispatch(getAllSalesOrderThunk({ ...params, employeeCode: emp === "All" ? "" : emp, pageNumber: currentPage, limit: itemsPerPage }));
    }
  };



  // Handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "soStatus":
        setSoStatus(Number(value));
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
      case "soId":
        setsoId(value);
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
  }, [ageBetween1, ageBetween2, soStatus, segment, State, City, currentPage, employeeCode, prId, leadId, soId, itemsPerPage, dispatch,]);


  useEffect(() => {
    setfilterData([])
    if (ageFilterData) {
      setfilterData(ageFilterData);
    } else {
      setfilterData([])
    }
  }, [ageFilterData]);


  useEffect(() => {
    setsalesOrder([])
    if (filterData) {
      setsalesOrder(filterData.data);
      setTotalCount(filterData?.totalCount || 0);
      // console.log("totalCount--------------------" + filterData.totalCount)
    } else {
      //setAddPaymentRaise([]);

    }
    // console.log("filterData----------------------" + filterData);
  }, [filterData]);

  useEffect(() => {
    fetchLeads();
  }, []);


  useEffect(() => {

    if (data) {
      setsalesOrder(data?.data);
      setTotalCount(data?.totalCount || 0);
    } else {

    }
  }, [data]);



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


  // const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <>
      <section
        style={{
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
          <FaShoppingCart
            className="fs-1"
            style={{ marginRight: "8px", color: "white" }}
          />
          Sales Order
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
            <select className="form-select input-box" name="soStatus" value={soStatus} onChange={handleChange}>
              <option value="All">All</option>
              <option value="1">Approved</option>
              <option value="2"> PENDING</option>
              <option value="4">REJECTED</option>
            </select>
          </div>

          {/* Segment Filter */}
          {/* <div>
            <label className="form-label w-50">Segment</label>
            <select name="segment" id="" value={segment} onChange={handleChange} className="form-select input-box">
              <option value="All">All</option>
              <option value="stockoption">Stock Option</option>
              <option value="stockcash">Stock Cash</option>
              <option value="gold">Gold</option>
            </select>
            <input type="text" className="form-control input-box" name="segment" placeholder="Enter Segment" value={segment} onChange={handleChange} />
          </div> */}

          {/* State Filter */}
          <div>
            <label className="form-label w-50">Select State</label>
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
            <label className="form-label">SO ID</label>
            <input type="text" className="form-control input-box"
              placeholder="Enter SO Id "
              name="soId"
              value={soId}
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

      <div className="border border-2 border-gray mt-1 bg-white">
        <div
          className="p-2 table-responsive"
        // style={{ width: "80vw" }}
        >
          {/* Buttons */}
          <div className="mb-2 d-flex gap-2 ">
            <ExportData tableId="table-data" />
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
              className="viewLead-ViewLeadsTableFont table table-bordered table-hover mt-2"
              style={{ fontSize: "12px" }}
            >
              <thead>
                <tr>
                  <th>Client ID</th>
                  <th>Lead ID</th>
                  <th>Pr ID</th>
                  <th>So ID</th>
                  <th>Payment Date</th>
                  <th>Client Name</th>
                  <th>Employee Code</th>
                  <th>Employee Name</th>
                  {/* <th>Mobile</th> */}
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Grand Total</th>
                  <th>DOB</th>
                  <th>PAN No</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>State</th>
                  <th>SO Staus</th>

                  <th className="text-center">Action</th>
                </tr>
              </thead>

              {/* //!----------------------------------------------------------------------------------------------------------------------------------------------- */}
              {/* //TODO   __Table_Body_Map__*/}
              {/* //!----------------------------------------------------------------------------------------------------------------------------------------------- */}

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
                ) :

                  salesOrder?.length > 0 ? (
                    salesOrder?.map((salesOrderObj, index) => (
                      <tr key={index}>
                        <td className="align-middle">{salesOrderObj?.id}</td>
                        <td className="align-middle">{salesOrderObj?.leadId}</td>
                        <td className="align-middle">{salesOrderObj?.prId}</td>
                        <td className="align-middle">{salesOrderObj?.soId}</td>
                        <td className="align-middle">{salesOrderObj?.paymentDetails?.paymentDate || "N/A"}</td>
                        <td className="align-middle">{salesOrderObj?.personalDetails?.clientName || "N/A"}</td>
                        <td className="align-middle">{salesOrderObj?.employeeCode || "N/A"}</td>
                        <td className="align-middle">{salesOrderObj?.employeeName || "N/A"}</td>
                        {/* <td className="align-middle">{salesOrderObj?.personalDetails?.mobile || "N/A"}</td> */}
                        <td className="align-middle">
                          {salesOrderObj?.productDetails?.length > 0 ? salesOrderObj.productDetails[0]?.startDate || "N/A" : "N/A"}
                        </td>
                        <td className="align-middle">
                          {salesOrderObj?.productDetails?.length > 0 ? salesOrderObj.productDetails[0]?.endDate || "N/A" : "N/A"}
                        </td>
                        <td className="align-middle">
                          {salesOrderObj?.productDetails?.length > 0 ? salesOrderObj.productDetails[0]?.grandTotal || "N/A" : "N/A"}
                        </td>
                        <td className="align-middle">{salesOrderObj?.personalDetails?.dob || "N/A"}</td>
                        <td className="align-middle">{salesOrderObj?.personalDetails?.panNo || "N/A"}</td>
                        <td className="align-middle">
                          <button
                            className="btn btn-sm text-primary"
                            onClick={() => handleEmailPopup(salesOrderObj?.personalDetails?.email)}
                          >
                            Email
                          </button>
                        </td>
                        <td className="align-middle">{salesOrderObj?.personalDetails?.address?.city || "N/A"}</td>
                        <td className="align-middle">{salesOrderObj?.personalDetails?.address?.state || "N/A"}</td>
                        <td className="align-middle">{salesOrderObj?.soStatus ? salesorderMap[salesOrderObj.soStatus] : "N/A" || "N/A"}</td>
                        <td className="align-middle text-center">
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            {/* Status Button */}
                            {salesOrderObj.leadId && ["admin", "Admin", "ADMIN"].includes(storedUsername) && (
                              <StatusButton
                                onClick={() => {
                                  handleOpenSOStatusPopup(salesOrderObj);
                                  setCurrentSalesOrderObj(salesOrderObj);
                                }}
                              />
                            )}

                            {showSoStatusPopup && (
                              <>
                                <div className="popup-overlay d-flex justify-content-center align-items-center" onClick={handleCloseSOStatusPopup}></div>
                                <div className="salesOrder-popup-content">
                                  <h3 className="text-center mb-4">Sales Order Status</h3>
                                  <div className="mb-3">
                                    <label htmlFor="soInput" className="form-label fw-bold">Select Sales Order Status</label>
                                    <select
                                      style={{ fontSize: "14px", fontWeight: "500" }}
                                      name="salesOrderStatus"
                                      value={addSoStatus || ""}
                                      onChange={(e) => handleChangedropdown(e)}
                                    >
                                      <option value="">Select Status</option>
                                      {Object.entries(updateStatus).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="d-flex justify-content-between mt-4">
                                    <button className="btn btn-secondary me-2" onClick={handleCloseSOStatusPopup}>Close</button>
                                    <button className="btn btn-primary" onClick={() => handleSOStatus(CurrentSalesOrderObj)}>
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}

                            {/* Action Buttons (Only for Admin) */}
                            {["admin", "Admin", "ADMIN"].includes(localStorage.getItem("userName")) && (
                              <>
                                <button className="btn btn-info btn-sm py-0 px-2">Invoice</button>
                                <DeleteButton onDelete={() => handleDeleteSo(salesOrderObj.id)} className="btn btn-danger btn-sm py-0 px-2" />
                                <EditButton onClick={() => handleNavigate(salesOrderObj.id, salesOrderObj)} className="btn btn-primary btn-sm py-0 px-2" />
                              </>
                            )}

                            {/* Sales Order Status for Non-Admin Users */}
                            {!["admin", "Admin", "ADMIN"].includes(storedUsername) && (
                              <p
                                className={`p-1 rounded-1 text-white ${salesOrderObj.soStatus === "1" ? "bg-success" :
                                  salesOrderObj.soStatus === "3" ? "bg-danger" :
                                    salesOrderObj.soStatus === "2" ? "bg-warning" :
                                      salesOrderObj.soStatus === null ? "bg-primary" :
                                        "bg-secondary"
                                  }`}
                                style={{ fontSize: "12px" }}
                              >
                                {salesOrderObj.soStatus === "1" ? "Approved" :
                                  salesOrderObj.soStatus === "3" ? "Rejected" :
                                    salesOrderObj.soStatus === "2" ? "pending" :
                                      salesOrderObj.soStatus === null ? "Created" : "Unknown"}
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">No Sales Orders Found</td>
                    </tr>
                  )}
              </tbody>

            </table>
          </div>
          {/* //!------------------------------------------------------------------------------------------------------------------------------------------------------------------ -*/}
          {/*//TODO Pagination */}
          {/* //!---------------------------------------------------------------------------------------------------------------------------------------------------- --------------*/}

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
    </>
  );
};

export default SalesOrder;
