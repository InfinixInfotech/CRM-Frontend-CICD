import React, { useEffect, useState } from "react";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSegmentPlanThunk,
  getAllSegmentPlanThunk,
  getByIdSegmentPlanThunk,
  postSegmentPlanThunk,
  putSegmentPlanThunk,
} from "../../../../Redux/Services/thunks/SegmentPlanThunk";
import { HashLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import { staticToken } from "../../../../Redux/Services/apiServer/ApiServer";
import ExportData from "../../../../Components/Button/DataButton/ExportButton";
import { FaEye, FaLayerGroup } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";

const SegmentPlans = () => {
  const [plans, setPlans] = useState([]);
  const [newSegment, setNewSegment] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newTimePeriod, setNewTimePeriod] = useState("");
  const [editSegmentPlan, setEditSegmentPlan] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editTimePeriod, setEditTimePeriod] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const { data, loading, error } = useSelector((state) => state.segmentplan);

  //!----------------------------------------------------------------------------------------------<---Pagination Logic------------->------------------------------------------------------
  const totalPages = Math.ceil(plans.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStatuses = plans.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    dispatch(getAllSegmentPlanThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const sortedData = [...data.data].sort((a, b) => b.id - a.id);
      const timer = setTimeout(() => {
        setPlans(sortedData);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [data]);

  useEffect(() => {
    if (msg) {
      const alertTimer = setTimeout(() => {
        setMsg("");
      }, 3000);
      return () => clearTimeout(alertTimer);
    }
  }, [msg]);

  const segmentOptions = [
    { value: "StockCash", label: "Stock Cash" },
    { value: "StockOption", label: "Stock Option" },
    { value: "Gold", label: "Gold" },
  ];

  const timePeriodOptions = [
    { value: "Monthly", label: "Monthly" },
    { value: "Quarterly", label: "Quarterly" },
    { value: "HalfYearly", label: "Half Yearly" },
    { value: "Yearly", label: "Yearly" },
  ];

  // Handle adding a new plan
  const handleAddPlan = (e) => {
    if (newSegment && newAmount && newTimePeriod) {
      const newPlan = {
        segmentName: newSegment,
        term: newTimePeriod,
        amount: {
          currency: "INR",
          value: newAmount,
        },
      };

      dispatch(postSegmentPlanThunk(newPlan)).then((response) => {
        setMsg(response?.payload?.message || "added successfully");
        setPlans([...plans, newPlan]);
        setNewSegment("");
        setNewAmount("");
        setNewTimePeriod("");
        setShowPopup(false);
        dispatch(getAllSegmentPlanThunk());
      });
    }
  };

  const handleDeleteSegmentPlan = (id) => {
    dispatch(deleteSegmentPlanThunk(id))
      .unwrap()
      .then((response) => {
        setMsg(response.message || "deleted successfully");
        setPlans((prevStatuses) =>
          prevStatuses.filter((status) => status.id !== id)
        );
      })
      .catch((error) => {
        setMsg(error || "Failed to delete");
      });
  };

  const handleEditSegmentPlan = async (id) => {
    try {
      const token = staticToken;

      const updatedPlan = {
        id,
        segmentName: newSegment,
        amount: {
          currency: "INR",
          value: newAmount,
        },
        term: newTimePeriod,
      };

      const response = await fetch(
        `/api/SegmentPlan/UpdateSegmentPlanByIdAsync`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedPlan),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update segment plan");
      }

      setMsg(data.message || "Updated successfully");

      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === id
            ? {
                ...plan,
                segmentName: newSegment,
                amount: { ...plan.amount, value: newAmount },
                term: newTimePeriod,
              }
            : plan
        )
      );

      setEditSegmentPlan(null);
      setNewSegment("");
      setNewAmount("");
      setNewTimePeriod("");
      setShowPopup(false);
    } catch (error) {
      setMsg(error.message || "Failed to update segment plan");
    }
  };
  // !<--------------------------------------------------------------------------- EMAIL POPUP FUNCTIONALITY--------------------------------------------------------------------------

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditSegmentPlan(null);
    setEditValue(null);
    setEditAmount(null);
    setNewSegment("");
    setNewAmount("");
    setNewTimePeriod("");
    setEditValue("");
  };

  return (
    <>
      <section
        style={{
          position: "relative",
          backgroundColor: "#fff",
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
            padding: "18px 16px",
            fontSize: "30px",
            color: "#2D2D2D",
          }}
        >
          <FaLayerGroup
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Segment Plans
        </h2>
      </section>
      <div
        className="mt-2 py-3"
        // style={{ padding: "18px 16px" }}
      >
        <div
          className="lead-status-container mt-0 "
          // style={{ background: "rgb(227,227,227)", border: "2px solid grey" }}
        >
          <div className="bg-white  border border-2 border-gray">
            <h5
              className="text-dark border border-1 pb-2"
              style={{
                // padding: "18px 16px",
                fontSize: "1.7 rem",
                backgroundColor: "#E8F1F3",
              }}
            >
              <BackButton />
              View Segment Plans
            </h5>
            <div className="p-2">
{/* //!--------------------------------------------------------------------------------POPUP INPUT LOGIC HERE-------------------------------------------------------------------------- */}
                <div className="addLeadscontainer add-status mt-1 d-flex gap-1">
                  <button
                    onClick={handleOpenPopup}
                    className="btn btn-exp btn-sm text-white d-flex align-items-center px-2 py-1"
                    style={{ backgroundColor: "#009688" }}
                  >
                    <GrAdd className="text-white fs-6 fw-bold me-2 " />
                    Add Plans
                  </button>

                  {showPopup && (
                    <div
                      className="popup d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        zIndex: 1050,
                      }}
                    >
                      <div
                        className="popup-content card shadow-lg p-4 bg-white rounded-3"
                        style={{ width: "500px" }}
                      >
                        <div className="card-body">
                          <h5 className="card-title text-center mb-4 fw-bold text-success">
                            {editSegmentPlan !== null
                              ? "Edit Plans"
                              : "Add New Plans"}
                          </h5>
                          <button
                            className="btn-close position-absolute top-0 end-0 m-3"
                            onClick={handleClosePopup}
                          ></button>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (editSegmentPlan !== null) {
                                handleEditSegmentPlan(editSegmentPlan);
                              } else {
                                handleAddPlan();
                              }
                            }}
                            className="d-flex flex-column align-items-center gap-3"
                          >
                            <select
                              value={newSegment}
                              onChange={(e) => setNewSegment(e.target.value)}
                              className="form-select me-3 w-50 rounded-2"
                            >
                              <option value="">Select Segment</option>
                              {segmentOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>

                            <select
                              value={newTimePeriod}
                              onChange={(e) => setNewTimePeriod(e.target.value)}
                              className="form-select me-3 w-50 rounded-2"
                            >
                              <option value="">Select Time Period</option>
                              {timePeriodOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>

                            <input
                              type="text"
                              value={newAmount}
                              onChange={(e) => setNewAmount(e.target.value)}
                              placeholder="Amount (INR)"
                              className="form-control w-50 rounded-2"
                            />

                            <button
                              type="submit"
                              className={`btn w-100 ${
                                editSegmentPlan !== null ? "btn-warning" : ""
                              }`}
                              style={
                                editSegmentPlan === null
                                  ? {
                                      backgroundColor: "#009688",
                                      color: "white",
                                    }
                                  : {}
                              }
                            >
                              {editSegmentPlan ? "Update" : "Add"}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* //!-------------------------------------------------------------------------------------EXPORT BUTTON------------------------------------------------------------------------------ */}
                  <ExportData tableId="table-data" />
                </div>
                {msg && (
                  <Alert variant="info" className="mt-0 text-center">
                    {msg}
                  </Alert>
                )}
              
              <table
                id="table-data"
                className="table table-bordered table-striped mt-2"
              >
                <thead>
                  {/* <p>{msg}</p> */}
                  <tr>
                    <th>S.No</th>
                    <th>Segment</th>
                    <th>Amount (INR)</th>
                    <th>Time Period</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <div
                      style={{
                        position: "fixed", // Fixed to ensure it stays over everything
                        top: 0,
                        left: 0,
                        width: "100vw", // Full width
                        height: "100vh", // Full height
                        backgroundColor: "rgba(104, 102, 102, 0.5)", // Semi-transparent background
                        zIndex: 9998, // Make sure it's above most elements
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%", // Center vertically
                          left: "50%", // Center horizontally
                          transform: "translate(-50%, -50%)", // Correct alignment
                          zIndex: 9999, // Ensure the loader is above the overlay
                          backgroundColor: "transparent",
                        }}
                      >
                        <HashLoader color="#0060f1" size={50} />
                      </div>
                    </div>
                  ) : error ? (
                    <tr>
                      <td colSpan="2" className="text-center text-danger">
                        Error: {error}
                      </td>
                    </tr>
                  ) : currentStatuses.length > 0 ? (
                    currentStatuses.map((planObj, index) => (
                      <tr key={planObj.id}>
                        <td>{planObj.id}</td>
                        <td>{planObj.segmentName}</td>
                        <td>{planObj.amount.value}</td>
                        <td>{planObj.term}</td>
                        <td>
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <EditButton
                              className="btn btn-primary btn-sm mr-1 py-0 px-2"
                              onClick={() => {
                                setShowPopup(true);
                                setEditSegmentPlan(planObj.id);
                                setNewSegment(planObj.segmentName);
                                setNewAmount(planObj.amount.value);
                                setNewTimePeriod(planObj.term);
                                setEditValue(planObj.segmentName);
                                setEditAmount(planObj.amount.value);
                                setEditTimePeriod(planObj.term);
                              }}
                            />
                            {/* )} */}

                            <DeleteButton
                              className="btn btn-danger btn-sm mr-1 py-0 px-2"
                              onDelete={() =>
                                handleDeleteSegmentPlan(planObj.id)
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No data available in table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* //!<---------------------------------------------------------------------------------Pagination BUTTON----------------------------------------------------------------------> */}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SegmentPlans;
