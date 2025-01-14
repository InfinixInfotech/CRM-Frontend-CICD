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
import { Alert } from "react-bootstrap";
import { staticToken } from "../../../../Redux/Services/apiServer/ApiServer";
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
  const [editTradeSegmentName, setEditTradeSegmentName] = useState("");
  const [editSegmentType, setEditSegmentType] = useState("");
  const [editSegmentCategory, setEditSegmentCategory] = useState("");
  const [editHighRisk, setEditHighRisk] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.segmentlist);



  //!----------------------------------------------------------------------------------------------<---Pagination Logic------------->------------------------------------------------------
  const totalPages = Math.ceil(segments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStatuses = segments.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));




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
  useEffect(() => {
    if (msg) {
      const alertTimer = setTimeout(() => {
        setMsg("");
      }, 3000); // Alert will disappear after 3 seconds
      return () => clearTimeout(alertTimer);
    }
  }, [msg]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const addPayload = {
      segmentName: formData.segmentName,
      tradeSegmentName: formData.tradeSegmentName,
      segmentType: formData.segmentType,
      segmentCategory: formData.segmentCategory,
      highRisk: formData.highRisk,
      status: formData.status,
    };
    setSegments(data.data);
    dispatch(postSegmentListThunk(addPayload));
    setFormData(addPayload);
  };
  const handleEditSegment = async () => {
    const requestBody = {
      id: formData.id || 0,
      segmentName: formData.segmentName || "",
      tradeSegmentName: formData.tradeSegmentName || "",
      segmentType: formData.segmentType || "",
      segmentCategory: formData.segmentCategory || "",
      highRisk: formData.highRisk ?? false,
      status: formData.status ?? false,
    };
    try {
      const token = staticToken;
      const response = await fetch(`/api/Segment/UpdateSegmentByIdAsync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        console.error("Error Response:", await response.json());
        throw new Error("Failed to update segment");
      }
      const responseData = await response.json();
      setMsg(responseData.message || "Updated successfully");
      // Fetch updated data from the backend
      dispatch(getAllSegmentListThunk());
      // Reset form and editing state
      setEditSegment(null);
      setFormData({
        id: "",
        segmentName: "",
        tradeSegmentName: "",
        segmentType: "Equity",
        segmentCategory: "High Risk",
        highRisk: true,
        status: false,
      });
    } catch (error) {
      console.error("Error during API call:", error);
      setMsg(error.message || "Failed to update");
    }
  };
  const handleEditButtonClick = (segment) => {
    // This function should handle the logic to edit the segment
    setFormData({
      id: segment.id,
      segmentName: segment.segmentName,
      tradeSegmentName: segment.tradeSegmentName,
      segmentType: segment.segmentType,
      segmentCategory: segment.segmentCategory,
      highRisk: segment.highRisk,
      status: segment.status,
    });
    setEditSegment(segment);
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editSegment) {
                  handleEditSegment(editSegment); // Pass the whole segment object
                } else {
                  handleCreate(e);
                }
              }}
            >
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
              <button type="submit"
                className={`btn ${editSegment !== null ? "btn-warning" : "btn-primary"}`}>
                {editSegment ? "Update" : "Create"}
              </button>
              {/* {editSegment && (
                <button
                  type="button"
                  className="btn btn-secondary ml-2"
                  onClick={() => {
                    setEditSegment(null);
                    setEditValue("");
                    setEditTradeSegmentName("");
                    setEditSegmentType("");
                    setEditSegmentCategory("");
                    setEditHighRisk("");
                    setEditStatus("");
                  }}
                >
                  Cancel
                </button>
              )} */}
            </form>
            <p className="mt-3">{msg}</p>
          </div>
          <h4 className="mb-2 ps-4">View Segments</h4>
          <div className="p-4 border rounded bg-light">
            <div className="mb-3">
              <CopyButton />
              <CsvButton />
              <PdfButton />
              <PrintButton />
              {msg && (
                <Alert variant="info" className="mt-2 text-center">
                  {msg}
                </Alert>
              )}
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
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="text-center text-danger">
                      Error: {error}
                    </td>
                  </tr>
                ) : currentStatuses && segments.length > 0 ? (
                  currentStatuses.map((segmentObj, index) => (
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
                              onClick={() => handleEditButtonClick(segmentObj)}
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
export default SegmentList;
