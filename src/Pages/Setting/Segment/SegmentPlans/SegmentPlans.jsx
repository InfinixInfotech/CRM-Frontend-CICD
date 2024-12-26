import React, { useEffect, useState } from "react";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import {
  deleteSegmentPlanThunk,
  getAllSegmentPlanThunk,
  getByIdSegmentPlanThunk,
  postSegmentPlanThunk,
  putSegmentPlanThunk,
} from "../../../../Redux/Services/thunks/SegmentPlanThunk";
import { HashLoader } from "react-spinners";


const SegmentPlans = () => {
  const [plans, setPlans] = useState([]);
  const [newSegment, setNewSegment] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newTimePeriod, setNewTimePeriod] = useState("");
  const [editSegmentPlan, setEditSegmentPlan] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.segmentplan);

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
    e.preventDefault();
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

  const handleEditSegmentPlan = (id) => {
    if (editValue.trim() !== "") {
      dispatch(putSegmentPlanThunk({ id, segmentName: editValue })).then(
        (response) => {
          setMsg(response?.payload?.message || "updated successfully");
          dispatch(getAllSegmentPlanThunk());
          setEditSegmentPlan(null);
          setEditValue("");
        }
      );
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

  const fetchSegmentPlanById = (id) => {
    dispatch(getByIdSegmentPlanThunk(id)).then((response) => {
      const segmentName = response.payload?.data;
      setEditSegmentPlan(segmentName?.id);
      setEditValue(segmentName?.segmentName);
    });
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
          <div className="addLeadscontainer add-status p-2 mb-2">
            <h4 className="mb-3 text-dark">Add New Plan</h4>

            <form onSubmit={handleAddPlan} className="d-flex align-items-center gap-3">
              <select
                value={newSegment}
                onChange={(e) => setNewSegment(e.target.value)}
                className="form-select me-3"
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
                className="form-select me-3"
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
                className="form-control me-3"
              />

              <button type="submit" className="btn btn-primary px-3 py-1">Add</button>
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
              <PrintButton />
              <PdfButton />
              <CsvButton />
              <CopyButton />
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
                ) : plans.length > 0 ? (
                  plans.map((planObj, index) => (
                    <tr key={planObj.id}>
                      <td>{planObj.segmentName}</td>
                      <td>{planObj.amount.value}</td>
                      <td>{planObj.term}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          {editSegmentPlan === index ? (
                            <button
                              // onClick={() => handle(index)}
                              className="btn btn-success btn-sm py-0 px-2"
                            >
                              Save
                            </button>
                          ) : (
                            <EditButton
                              className="btn btn-primary btn-sm mr-1 py-0 px-2"
                              onClick={() => fetchSegmentPlanById(planObj.id)}
                            />
                          )}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SegmentPlans;
