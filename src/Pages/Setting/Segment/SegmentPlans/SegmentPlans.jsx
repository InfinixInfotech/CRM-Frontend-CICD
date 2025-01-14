import React, { useEffect, useState } from "react";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
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
      const timer = setTimeout(() => {
        setPlans(data.data);
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
      const token = staticToken; // Replace with your actual token logic if needed

      // Using the new selected values from the dropdowns
      const updatedPlan = {
        id,
        segmentName: newSegment, // Use the value selected from the segment dropdown
        amount: {
          currency: "INR",
          value: newAmount, // Use the value entered in the amount input
        },
        term: newTimePeriod, // Use the value selected from the time period dropdown
      };

      const response = await fetch(
        `/api/SegmentPlan/UpdateSegmentPlanByIdAsync`,
        {
          method: "POST", // Use POST for updating
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

      // Update the plans state to reflect the changes
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

      // Clear the edit state and reset the form values
      setEditSegmentPlan(null); // Clear edit state
      setNewSegment(""); // Clear selected segment value
      setNewAmount(""); // Clear amount input
      setNewTimePeriod(""); // Clear time period input
    } catch (error) {
      setMsg(error.message || "Failed to update segment plan");
    }
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Segment Plans
      </h2>
      <BackButton />
      <div
        className="container-fluid border border-2 border-gray mt-2 py-3"
        style={{ padding: "18px 16px" }}
      >
        <div
          className="lead-status-container mt-0 p-3"
          style={{ background: "rgb(227,227,227)", border: "2px solid grey" }}
        >
          {/* Edit Section moved to the top */}
          <div className="addLeadscontainer add-status p-2 mb-2">
            <h4 className="mb-3 text-dark">Add Plan</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editSegmentPlan !== null) {
                  handleEditSegmentPlan(editSegmentPlan);
                } else {
                  handleAddPlan();
                }
              }}
              className="d-flex align-items-center gap-3"
            >
              <select
                value={newSegment}
                onChange={(e) => setNewSegment(e.target.value)}
                className="form-select me-3 w-25"
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
                className="form-select me-3 w-25"
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
                className="form-control w-25"
              />

              {/* 
              {editSegmentPlan === index ? (
                <button
                  onClick={() => handleEditSegmentPlan(planObj.id)}
                  className="btn btn-success btn-sm py-0 px-2"
                >
                  Save
                </button>
              ) : ( */}
              <button
                type="submit"
                className={`btn px-3 py-1 ${
                  editSegmentPlan !== null ? "btn-warning" : "btn-primary"
                }`}
              >
                {editSegmentPlan !== null ? "Update" : "Add"} Plan
              </button>
              {/* )} */}
            </form>

            {msg && (
              <Alert variant="info" className="mt-2 text-center">
                {msg}
              </Alert>
            )}
          </div>

          <div className="bg-white p-4 rounded border border-4 border-gray">
            <h5>View Plans</h5>
            <div className="mb-4">
              {/* <PrintButton />
              <PdfButton />
              <CsvButton />
              <CopyButton /> */}

              <ExportData tableId="table-data" />
            </div>
            <table
              id="table-data"
              className="table table-bordered table-striped"
            >
              <thead>
                <p>{msg}</p>
                <tr>
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
                      <td>{planObj.segmentName}</td>
                      <td>{planObj.amount.value}</td>
                      <td>{planObj.term}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          {/* {editSegmentPlan === index ? (
                            <button
                              onClick={() => handleEditSegmentPlan(planObj.id)}
                              className="btn btn-success btn-sm py-0 px-2"
                            >
                              Save
                            </button>
                          ) : ( */}
                          <EditButton
                            className="btn btn-primary btn-sm mr-1 py-0 px-2"
                            onClick={() => {
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
                            onDelete={() => handleDeleteSegmentPlan(planObj.id)}
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

export default SegmentPlans;
