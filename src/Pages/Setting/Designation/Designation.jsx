import React, { useEffect, useState } from "react";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import {
  CreateDesignationThunk,
  deleteDesignationThunk,
  GetAllDesignationThunk,
} from "../../../Redux/Services/thunks/DesignationThunk";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import { staticToken } from "../../../Redux/Services/apiServer/ApiServer";
import ExportData from "../../../Components/Button/DataButton/ExportButton";
import { FaEye, FaIdBadge } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";

const Designation = () => {
  const [designation, setDesignation] = useState([]);
  const [newDesignation, setNewDesignation] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [msg, setMsg] = useState("");
  const [editDesignation, setEditDesignation] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editTarget, setEditTarget] = useState("");
  const { data, loading, error } = useSelector((state) => state.designation);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();

  //!----------------------------------------------------------------------------------------------<---Pagination Logic------------->------------------------------------------------------
  const totalPages = Math.ceil(designation.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStatuses = designation.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    dispatch(GetAllDesignationThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const sortedData = [...data.data].sort((a, b) => b.id - a.id);
      setDesignation(sortedData);
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

  const handleAddDesignation = () => {
    const DesignationPayLoad = {
      designationName: newDesignation,
      designationTarget: newTarget,
    };
    dispatch(CreateDesignationThunk(DesignationPayLoad)).then(() => {
      setDesignation([...designation, DesignationPayLoad]);
      setNewTarget("");
      setNewDesignation("");
      setShowPopup(false);
      dispatch(GetAllDesignationThunk());
    });
  };

  const handleDeleteDesignation = (id) => {
    dispatch(deleteDesignationThunk(id))
      .unwrap()
      .then((response) => {
        setMsg(response.message || "Deleted successfully");
        setDesignation((prevStatuses) =>
          prevStatuses.filter((status) => status.id !== id)
        );
      })
      .catch((error) => {
        setMsg(error || "Failed to delete designation");
      });
  };

  const handleEditDesignation = async (id) => {
    try {
      const token = staticToken;
      const response = await fetch(`/api/Designation/UpdateDesignation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          designationName: editValue,
          designationTarget: editTarget,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update designation");
      }

      setMsg(data.message || "Updated successfully");
      setDesignation((prevStatuses) =>
        prevStatuses.map((designation) =>
          designation.id === id
            ? {
                ...designation,
                designationName: editValue,
                designationTarget: editTarget,
              }
            : designation
        )
      );
      setEditDesignation(null);
      setEditValue("");
      setEditTarget("");
      setShowPopup(false);
    } catch (error) {
      setMsg(error.message || "Failed to update designation");
    }
  };
  // !<--------------------------------------------------------------------------- EMAIL POPUP FUNCTIONALITY--------------------------------------------------------------------------

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditDesignation(null);
    setNewDesignation("");
    setEditTarget(null);
    setNewTarget("");
    setEditValue("");
  };

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
          <FaIdBadge
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Designation
        </h2>
      </section>

      <div className="mt-2">
        <div
          className="lead-status-container mt-0"
        >
 
          <div className="bg-white  border border-2 border-gray">
            <h5
              className="text-dark border border-1 pb-2"
              style={{
                fontSize: "1.7 rem",
                backgroundColor: "#E8F1F3",
              }}
            >
              <BackButton />
              View Designation
            </h5>
            <div className="p-2">
                <div className="d-flex gap-1">
                  {/* //!-------------------------------------------------POPUP INPUT FIELD LOGIC HERE----------------------------------------// */}

                  <div className="addLeadscontainer add-status ">
                    <button
                      onClick={handleOpenPopup}
                      className="btn btn-exp btn-sm text-white d-flex align-items-center"
                      style={{ backgroundColor: "#009688" }}
                    >
                      <GrAdd className="text-white fs-6 fw-bold me-2" />
                      Add Designation
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
                            <h5 className="card-title text-center mb-4">
                              {editDesignation !== null
                                ? "Edit Designation"
                                : "Add New Designation"}
                            </h5>
                            <button
                              className="btn-close position-absolute top-0 end-0 m-3"
                              onClick={handleClosePopup}
                            ></button>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                if (editDesignation) {
                                  handleEditDesignation(editDesignation);
                                } else {
                                  handleAddDesignation();
                                }
                              }}
                            >
                              <div className="d-flex flex-column mt-3">
                                <input
                                  type="text"
                                  value={
                                    editDesignation ? editValue : newDesignation
                                  }
                                  onChange={(e) =>
                                    editDesignation
                                      ? setEditValue(e.target.value)
                                      : setNewDesignation(e.target.value)
                                  }
                                  placeholder="Designation Name"
                                  className="form-control mb-3"
                                />
                                <input
                                  type="number"
                                  value={
                                    editDesignation ? editTarget : newTarget
                                  }
                                  onChange={(e) =>
                                    editDesignation
                                      ? setEditTarget(e.target.value)
                                      : setNewTarget(e.target.value)
                                  }
                                  placeholder="Designation Target"
                                  className="form-control mb-3"
                                />
                                <button
                                  type="submit"
                                  className={`btn w-100 ${
                                    editDesignation !== null
                                      ? "btn-warning"
                                      : ""
                                  }`}
                                  style={
                                    editDesignation === null
                                      ? {
                                          backgroundColor: "#009688",
                                          color: "white",
                                        }
                                      : {}
                                  }
                                >
                                  {editDesignation ? "Update" : "Add"}
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* //!-------------------------------------------------COMMON DATA BUTTONS LOGIC HERE----------------------------------------// */}
                  <ExportData tableId="table-data" />
                </div>

                {msg && (
                  <Alert variant="info" className=" text-center">
                    {msg}
                  </Alert>
                )}
        
              <table
                id="table-data"
                className="table table-bordered table-striped mt-2"
              >
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Designation</th>
                    <th>Target</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <HashLoader color="#0060f1" size={50} />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="4" className="text-center text-danger">
                        Error: {error}
                      </td>
                    </tr>
                  ) : currentStatuses.length > 0 ? (
                    currentStatuses.map((designationObj) => (
                      <tr key={designationObj.id}>
                        <td>{designationObj.id}</td>
                        <td>{designationObj.designationName}</td>
                        <td>{designationObj.designationTarget}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <EditButton
                              onClick={() => {
                                setEditDesignation(designationObj.id);
                                setEditValue(designationObj.designationName);
                                setEditTarget(designationObj.designationTarget);
                                setShowPopup(true);
                              }}
                              className="btn btn-primary btn-sm"
                            />
                            <DeleteButton
                              onDelete={() =>
                                handleDeleteDesignation(designationObj.id)
                              }
                              className="btn btn-danger btn-sm"
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

export default Designation;
