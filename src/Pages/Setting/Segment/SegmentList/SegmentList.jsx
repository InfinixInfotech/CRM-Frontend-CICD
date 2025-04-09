import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import DeleteButton from "../../../../Components/Button/DeleteButton/DeleteButton";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSegmentListThunk,
  getAllSegmentListThunk,
  postSegmentListThunk,
} from "../../../../Redux/Services/thunks/SegmentListThunk";
import { HashLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import { staticToken } from "../../../../Redux/Services/apiServer/ApiServer";
import { FaEye, FaList } from "react-icons/fa";
import ExportData from "../../../../Components/Button/DataButton/ExportButton";
import { GrAdd } from "react-icons/gr";
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
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.segmentlist);
  const [showPopup, setShowPopup] = useState(false);

  //!----------------------------------------------------------------------------------------------<---Pagination Logic------------->------------------------------------------------------
  const totalPages = Math.ceil(segments?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStatuses = segments?.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    dispatch(getAllSegmentListThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const sortedData = [...data.data].sort((a, b) => b.id - a.id);
      const timer = setTimeout(() => {
        setSegments(sortedData);
      }, 300);
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
    setFormData({
      id: "",
      segmentName: "",
      tradeSegmentName: "",
      segmentType: "Equity",
      segmentCategory: "High Risk",
      highRisk: true,
      status: false,
    });
    setShowPopup(false);
    setTimeout(() => {
      window.location.reload();
    }, 600);
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
      dispatch(getAllSegmentListThunk());
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
      setShowPopup(false);
    } catch (error) {
      console.error("Error during API call:", error);
      setMsg(error.message || "Failed to update");
    }
  };
  const handleEditButtonClick = (segment) => {
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

  // !<--------------------------------------------------------------------------- EMAIL POPUP FUNCTIONALITY--------------------------------------------------------------------------

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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
          <FaList
            className="fs-1"
            style={{ marginRight: "8px", color: "#2c3e50" }}
          />
          Segment List
        </h2>
      </section>

      <div className="mt-1">
      <div className="border border-2 border-grey">
          <h5
            className="text-dark border border-1 pb-2"
            style={{
              // padding: "18px 16px",
              fontSize: "1.7 rem",
              backgroundColor: "#E8F1F3",
            }}
          >
            <BackButton />
            View Segment List
          </h5>
          <div className="p-2">
            <div className="mb-0">
              <div className="d-flex gap-1">
                <div className="mt-0">
                  <button
                    onClick={handleOpenPopup}
                    className="btn btn-exp btn-sm text-white d-flex align-items-center"
                    style={{ backgroundColor: "#2c3e50" }}
                  >
                    <GrAdd className="text-white fs-6 fw-bold me-1" />
                    Add Segment
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
                        className="popup-content card shadow-lg p-4 bg-white"
                        style={{ width: "400px", borderRadius: "10px" }}
                      >
                        <div className="card-body">
                          <h5 className="card-title text-center text-success mb-4">
                            {editSegment !== null
                              ? "Edit Segment"
                              : "Add New Segment"}
                          </h5>
                          <button
                            className="btn-close position-absolute top-0 end-0 m-3"
                            onClick={handleClosePopup}
                          ></button>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (editSegment) {
                                handleEditSegment(editSegment);
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
                                className="form-control input-box"
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
                                className="form-select input-box"
                              >
                                <option value="Equity">Equity</option>
                                <option value="FNO">FNO</option>
                                <option value="Commodity">Commodity</option>
                                <option value="Forex">Forex</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                Segment Category
                              </label>
                              <select
                                style={{ fontSize: "14px", fontWeight: "500" }}
                                name="segmentCategory"
                                value={formData.segmentCategory}
                                onChange={handleChange}
                                className="form-select input-box"
                              >
                                <option value="High Risk">High Risk</option>
                                <option value="Moderate Risk">
                                  Moderate Risk
                                </option>
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
                              <label
                                className="form-check-label"
                                htmlFor="statusCheck"
                              >
                                Active
                              </label>
                            </div>
                            <button
                              type="submit"
                              className={`btn w-100 ${
                                editSegment !== null ? "btn-warning" : ""
                              }`}
                              style={
                                editSegment === null
                                  ? {
                                      backgroundColor: "#2c3e50",
                                      color: "white",
                                    }
                                  : {}
                              }
                            >
                              {editSegment ? "Update" : "Add"}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <ExportData tableId="table-data" />
              </div>

              {msg && (
                <Alert variant="info" className="mt-0 text-center">
                  {msg}
                </Alert>
              )}
            </div>
            <table id="table-data" className="table table-bordered mt-2">
              <thead>
                <tr>
                  <th>S.No</th>
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
                      <td>{segmentObj.id}</td>
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
                              onClick={() => {
                                setShowPopup(true),
                                  handleEditButtonClick(segmentObj);
                              }}
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
