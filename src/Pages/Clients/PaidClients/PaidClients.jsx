import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import ExportData from "../../../Components/Button/DataButton/ExportButton";
import { getAllPaidClientsThunk } from "../../../Redux/Services/thunks/PaidClientsThunk";
import { useDispatch, useSelector } from "react-redux";
import { emp, storedUsername } from "../../../Redux/Services/apiServer/ApiServer";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { getAllPaidClientFilterThunk } from "../../../Redux/Services/thunks/AgeFilterThunk";
import { getAllEmpCodeNameThunk } from "../../../Redux/Services/thunks/AdditionalApiThunk";
import { HashLoader } from "react-spinners";

const PaidClients = () => {
  // window.scrollTo({ top: 0, behavior: "smooth" });
  const [paidClientData, setPaidClientData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemperPage] = useState(10);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.paidclients);
  // const totalCount = data?.totalCount || 0; 
  const [totalCount, setTotalCount] = useState(0);
  const { emplist, } = useSelector((state) => state.additional);
  const [options, setOptions] = useState([]);

  const pageOptions = [10, 20, 30, 50, 70, 100];

  useEffect(() => {
    dispatch(getAllEmpCodeNameThunk());
    // console.log("data-----------------", emplist);
  }, [dispatch]);


  useEffect(() => {
    if (emplist && Array.isArray(emplist.data)) {
      // console.log("Data received:", data);
      // Transform the array into dropdown options
      const transformedOptions = emplist.data.map((item) => ({
        id: item.employeeCode,
        employeeCode: item.employeeCode,
        employeeName: item.employeeName,
        label: `${item.employeeCode} - ${item.employeeName}`,
      }));

      setOptions(transformedOptions);
    } else {
      // console.log("Invalid data format or no data available.");
    }
  }, [emplist]);


  const params = {
    pageNumber:
      currentPage,
    itemsPerPage: itemsPerPage,
    emp
  };


  useEffect(() => {
    const fetchData = async () => {
      const params = {
        pageNumber:
          currentPage,
        itemsPerPage: itemsPerPage,
        emp
      };
      dispatch(getAllPaidClientsThunk(params));
    };
    fetchData();
  }, [dispatch, currentPage, itemsPerPage]);

  useEffect(() => {
    if (data?.data) {
      setPaidClientData(Array.isArray(data.data) ? data.data : [data.data]);
    }
  }, [data]);

  const [filterData, setfilterData] = useState([]);
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

    const isAdmin = ["admin", "Admin", "ADMIN"].includes(storedUsername);
    const employeeIdentifier = isAdmin ? (employeeCode || "") : (emp || "");

    const filters = {
      pageNumber: currentPage,
      limit: itemsPerPage,
      prId: prId || "",
      leadId: leadId || "",
      soId: soId || "",
      employeeCode: employeeCode,
      employeeName: "",
    };
    const hasFilters = Object.entries(filters).some(([key, value]) =>
      key !== "pageNumber" && key !== "limit" && value !== ""
    );

    if (hasFilters) {
      if ((["admin", "Admin", "ADMIN"].includes(storedUsername))) {
        dispatch(getAllPaidClientFilterThunk({ ...filters, employeeCode: employeeCode === "All" ? "" : employeeCode }));
      }
      else {
        dispatch(getAllPaidClientFilterThunk({ ...filters, employeeCode: emp === "All" ? "" : emp }));
      }
    } else {
      dispatch(getAllPaidClientsThunk(params));
    }
  };

  // Handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "prId":
        setprId(value);
        break;
      case "leadId":
        setleadId(value);
        break;
      case "employeeCode":
        setemployeeCode(value);
        break;
      case "soId":
        setsoId(value);
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
  }, [currentPage, prId, leadId, soId, employeeCode, itemsPerPage, dispatch,]);


  useEffect(() => {
    if (ageFilterData) {
      setfilterData(ageFilterData);
    }
  }, [ageFilterData]);
  // console.log("ageFilterData----------------",JSON.stringify(ageFilterData.data))

  useEffect(() => {
    if (filterData) {
      // // setPaidClientData([]);
      // console.log("filterData--------------------" + filterData)

      setPaidClientData(filterData.data);
      // console.log("paidClientData--------------------" + paidClientData)

      setTotalCount(filterData?.totalCount || 0);
    } else {
      setPaidClientData([]);
    }
    // console.log("filterData----------------------" + filterData);
  }, [filterData]);

  useEffect(() => {
    fetchLeads();
  }, []);


  useEffect(() => {
    if (data) {
      setPaidClientData(data?.data);
      setTotalCount(data?.totalCount || 0);
    }
  }, [data]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="mt-5">
      <section
        style={{
          position: "relative",
          background: "#2c3e50",
          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
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
          <FaCheckCircle
            className="fs-2"
            style={{ marginRight: "8px", color: "white" }}
          />
          Paid Clients
        </h2>
      </section>
      <div className="border border-2 border-gray mt-2">
        <h5
          className="text-dark border border-1 pb-2"
          style={{
            fontSize: "1.7 rem",
            backgroundColor: "#E8F1F3",
          }}
        >

          <div className="bg-white border border-2 px-4">
            {/* Filters Row */}
            <div className="d-flex align-items-center gap-3 flex-wrap" style={{ height: "80px" }}>
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


          {/* <BackButton /> */}
          {/* {/* View Clients */}
        </h5>
        <div className="">
          <div className="lead-status-container ">
            <div className="bg-white p-2">
              <div className="d-flex gap-2">

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

              <table
                id="table-data"
                className="viewLead-ViewLeadsTableFont table table-bordered table-hover mt-2"
                style={{ fontSize: "12px" }}
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Lead Id</th>
                    {/* <th>Mobile Number</th> */}
                    <th>SO Id</th>
                    <th>PR Id</th>
                    <th>Client Name</th>
                    <th>Employee Code</th>
                    <th>Employee Name</th>
                    {/* <th>Reporting To</th>
                    <th>Group Name</th> */}
                    <th>Create Date</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    {/* <th>SO Status</th> */}
                    <th>Grand Total</th>
                    <th>Comment</th>
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
                  ) : (
                    Array.isArray(paidClientData) &&
                    paidClientData.map((clientData) =>
                      Array.isArray(clientData.paymentHistory) &&
                      clientData.paymentHistory.map((history, index) => (
                        <tr key={`${clientData.id}-${index}`}>
                          <td>{clientData.id}</td>
                          <td>{clientData.leadId}</td>
                          <td>{history.soId}</td>
                          <td>{history.prId || "N/A"}</td>
                          <td>{clientData.clientName}</td>
                          <td>{history.employeeCode}</td>
                          <td>{history.employeeName}</td>
                          <td>{history.createDate}</td>
                          <td>{history.startDate}</td>
                          <td>{history.endDate}</td>
                          <td>{history.grandTotal}</td>
                          <td>{history.comment}</td>
                        </tr>
                      ))
                    )
                  )}
                </tbody>
              </table>
              {/* Pagination Controls */}
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
      </div>
    </div>
  );
};

export default PaidClients;
