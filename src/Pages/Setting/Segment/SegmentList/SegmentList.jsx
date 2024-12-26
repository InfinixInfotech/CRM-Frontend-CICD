import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import DeleteButton from "../../../../Components/Button/DeleteButton/DeleteButton";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSegmentListThunk,
  getAllSegmentListThunk,
  getByIdSegmentListThunk,
  postSegmentListThunk,
  putSegmentListThunk,
} from "../../../../Redux/Services/thunks/SegmentListThunk";
import { HashLoader } from "react-spinners";

const SegmentList = () => {
  const [formData, setFormData] = useState({
    segmentName: "",
    tradeSegmentName: "",
    segmentType: "Equity",
    segmentCategory: "High Risk",
    highRisk: true,
    status: false,
  });
  const [segments, setSegments] = useState([]);
  const [editSegment, setEditSegment] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.segmentlist);

  useEffect(() => {
    dispatch(getAllSegmentListThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const timer = setTimeout(() => {
        setSegments(data.data);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setFormData({
      segmentName: "",
      tradeSegmentName: "",
      segmentType: "Equity",
      segmentCategory: "High Risk",
      highRisk: true,
      status: false,
    });
    setFormData(formData);
    dispatch(postSegmentListThunk(formData));
    setSegments(data.data);
  };

  const handleEditSegment = (id) => {
    if (editValue.trim() !== "") {
      dispatch(putSegmentListThunk({ id, segmentName: editValue })).then(
        (response) => {
          setMsg(response?.payload?.message || "updated successfully");
          dispatch(getAllSegmentListThunk());
          setEditSegment(null);
          setEditValue("");
        }
      );
    }
  };

  const handleDeleteSegment = (id) => {
    dispatch(deleteSegmentListThunk(id))
      .unwrap()
      .then((response) => {
        setMsg(response.message || "Segment deleted successfully");
        setSegments((prevStatuses) =>
          prevStatuses.filter((status) => status.id !== id)
        );
      })
      .catch((error) => {
        setMsg(error || "Failed to delete segment");
      });
  };

  const fetchSegmentById = (id) => {
    dispatch(getByIdSegmentListThunk(id)).then((response) => {
      const segmentName = response.payload?.data;
      setEditStatus(segmentName?.id);
      setEditValue(segmentName?.segmentName);
    });
  };

  const handleStatusToggle = (index) => {
    dispatch(toggleSegmentStatus(index));
  };

  return (
    <>
      <h2 className="mb-2 text-center bg-dark text-white py-3 mt-5">
        Segments
      </h2>
      <BackButton />
      <div
        className="container-fluid border border-2 border-gray mt-2 py-3"
        style={{ padding: "18px 16px" }}
      >
        <div
          className="container-fluid mt-0 p-3"
          style={{ background: "rgb(227,227,227)", border: "2px solid grey" }}
        >
          <div className="mb-4 p-3 border rounded">
            <h4 className="mb-3">Add New Segment</h4>
            <form onSubmit={handleCreate}>
              <div className="mb-3">
                <label className="form-label">Segment Name</label>
                <input
                  style={{ fontSize: "14px", fontWeight: "500" }}
                  type="text"
                  name="segmentName"
                  value={formData.segmentName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Trade Segment Name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Segment Type</label>
                <select
                  style={{ fontSize: "14px", fontWeight: "500" }}
                  name="segmentType"
                  value={formData.segmentType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Equity">Equity</option>
                  <option value="FNO">FNO</option>
                  <option value="Commodity">Commodity</option>
                  <option value="Forex">Forex</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Segment Category</label>
                <select
                  style={{ fontSize: "14px", fontWeight: "500" }}
                  name="segmentCategory"
                  value={formData.segmentCategory}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="High Risk">High Risk</option>
                  <option value="Moderate Risk">Moderate Risk</option>
                  <option value="Low Risk">Low Risk</option>
                </select>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                  className="form-check-input"
                  id="statusCheck"
                />
                <label className="form-check-label" htmlFor="statusCheck">
                  Active
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Create
              </button>
              
            </form>
            <p className="mt-3">{msg}</p>
          </div>

          <h4 className="mb-2 ps-4">View Segments</h4>
          <div className="p-4 border rounded bg-light">
            <div className="d-flex gap-2 mb-3">
              <CopyButton />
              <CsvButton />
              <PdfButton />
              <PrintButton />
            </div>
            <table className="table table-bordered">
              <thead className="table-dark" style={{ opacity: "0.7" }}>
                <tr>
                  <th>Segment Type</th>
                  <th>Segment Name</th>
                  <th>Segment Category</th>
                  <th>Status</th>
                  <th>Action</th>
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
                    <td colSpan="5" className="text-center text-danger">
                      Error: {error}
                    </td>
                  </tr>
                ) : segments.length > 0 ? (
                  segments.map((segmentObj, index) => (
                    <tr key={segmentObj.id}>
                      <td>{segmentObj.segmentType}</td>
                      <td>{segmentObj.segmentName}</td>
                      <td>{segmentObj.segmentCategory}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={segmentObj.status}
                          onChange={() => handleStatusToggle(segmentObj.id)}
                          className="form-check-input"
                        />
                      </td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          {editSegment === index ? (
                            <button
                              // onClick={() => handle(index)}
                              className="btn btn-success btn-sm py-0 px-2"
                            >
                              Save
                            </button>
                          ) : (
                            <EditButton
                              className="btn btn-primary btn-sm mr-1 py-0 px-2"
                              onClick={() => fetchSegmentById(segmentObj.id)}
                            />
                          )}
                          <DeleteButton
                            className="btn btn-danger btn-sm mr-1 py-0 px-2"
                            onDelete={() => handleDeleteSegment(segmentObj.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data available.
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

export default SegmentList;
