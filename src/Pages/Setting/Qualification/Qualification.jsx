import React, { useEffect, useState } from "react";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQualificationThunk,
  getAllQualificationThunk,
  postQualificationThunk,
} from "../../../Redux/Services/thunks/QualificationThunk";
import { HashLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import { staticToken } from "../../../Redux/Services/apiServer/ApiServer";
import ExportData from "../../../Components/Button/DataButton/ExportButton";
import { FaGraduationCap } from "react-icons/fa";
import { GrAdd, GrMenu } from "react-icons/gr";
import { BorderBottom } from "@mui/icons-material";
import "./Qualification.css"

const Qualification = () => {
  const [qualification, setQualification] = useState([]);
  const [newQualification, setNewQualification] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [editQualification, setEditQualification] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.qualification);

  //!------------------------------------------------------------------------<-----Pagination Logic----->------------------------------------------------------
  const totalPages = Math.ceil(qualification.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStatuses = qualification.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  // !<--------------------------------------------------------------------------- USEEFFECTS--------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getAllQualificationThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const sortedData = [...data.data].sort((a, b) => b.id - a.id);
      const timer = setTimeout(() => {
        setQualification(sortedData);
      }, 500);
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

  // !<--------------------------------------------------------------------------- EMAIL POPUP FUNCTIONALITY--------------------------------------------------------------------------

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditQualification(null);
    setNewQualification("");
    setEditValue("");
  };

  const handleAddQualification = (e) => {
    e.preventDefault();

    if (
      newQualification.trim() !== "" &&
      !qualification.includes(newQualification.trim())
    ) {
      const newAddQualification = {
        qualificationName: newQualification,
      };

      dispatch(postQualificationThunk(newAddQualification)).then((response) => {
        setMsg(response?.payload?.message || "added successfully");
        setQualification((prevState) => [
          ...prevState,
          { qualificationName: newQualification, id: response.id },
        ]);
        setNewQualification("");
        dispatch(getAllQualificationThunk());
        handleClosePopup();
      });
    }
  };

  const handleEditQualification = async (id) => {
    if (editValue.trim() !== "") {
      try {
        const token = staticToken; // Replace with your token retrieval logic
        const response = await fetch(
          `/api/Qualification/UpdateQualificationByIdAsync`,
          {
            method: "POST", // Ensure this matches your API's requirement
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add the token
            },
            body: JSON.stringify({ id, qualificationName: editValue }), // Ensure id and qualificationName are in the payload
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update qualification");
        }

        const data = await response.json();
        setMsg(data?.message || "Qualification updated successfully");

        setQualification((prevQualifications) =>
          prevQualifications.map((qual) =>
            qual.id === id ? { ...qual, qualificationName: editValue } : qual
          )
        );
        setEditQualification(null);
        setEditValue("");
        handleClosePopup();
      } catch (error) {
        setMsg(error.message || "Failed to update qualification");
      }
    }
  };

  const handleDeleteQualification = (id) => {
    dispatch(deleteQualificationThunk(id))
      .unwrap()
      .then((response) => {
        setMsg(response.message || "deleted successfully");
        setQualification((prevStatuses) =>
          prevStatuses.filter((status) => status.id !== id)
        );
      })
      .catch((error) => {
        setMsg(error || "Failed to delete qualification");
      });
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
          <FaGraduationCap
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Qualification
        </h2>
      </section>

      <div className="border border-2 border-gray mt-2">
        <h5
          className="text-dark border border-1 pb-2"
          style={{
            // padding: "18px 16px",
            fontSize: "1.7 rem",
            backgroundColor: "#E8F1F3",
          }}
        >
          <BackButton />
          View Qualification
        </h5>
        <div className="">
          <div className="lead-status-container ">
            <div className="bg-white p-2">
              <div className="d-flex gap-1">
{/* //!--------------------------------------------------------------------------------POPUP INPUT LOGIC------------------------------------------------------------------------------ */}
                <div className="addLeadscon6tainer  add-status">
                  {/* <h4 className="p-0 mb-3 text-dark ">Add New Qualification</h4> */}

                  <button
                    onClick={handleOpenPopup}
                    className="btn btn-sm text-white "
                    style={{ backgroundColor: "#009688" }}
                  >
                    <GrAdd className="text-white fs-6 fw-bold" />
                    Add Qualification
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
                            {editQualification !== null
                              ? "Edit Qualification"
                              : "Add New Qualification"}
                          </h5>
                          <button
                            className="btn-close position-absolute top-0 end-0 m-3"
                            onClick={handleClosePopup}
                          ></button>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (editQualification !== null) {
                                handleEditQualification(editQualification);
                              } else {
                                handleAddQualification(e);
                              }
                            }}
                          >
                            <div className="mb-3">
                              <label
                                htmlFor="qualificationInput"
                                className="form-label"
                              >
                                Qualification Name
                              </label>
                              <input
                                type="text"
                                id="qualificationInput"
                                className="form-control"
                                value={
                                  editQualification !== null
                                    ? editValue
                                    : newQualification
                                }
                                onChange={(e) =>
                                  editQualification !== null
                                    ? setEditValue(e.target.value)
                                    : setNewQualification(e.target.value)
                                }
                                placeholder="Enter qualification name"
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn text-white w-100"
                              style={{ backgroundColor: "#009688" }}
                            >
                              {editQualification !== null ? "Update" : "Add"}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
{/* //!---------------------------------------------------------------------------EXPORT DATA BUTTON------------------------------------------------------------------------------- */}
                <ExportData tableId="table-data" />
              </div>

              {msg && (
                <Alert variant="info" className="mt-2 text-center">
                  {msg}
                </Alert>
              )}

              <table
                id="table-data"
                className="table table-bordered table-striped mt-2"
              >
                <thead>
                  <tr>
                    <th style={{ color: "#2D2D2D" }} className="text-center">
                      S.No
                    </th>
                    <th style={{ color: "#2D2D2D" }} className="text-center">
                      Qualification Name
                    </th>
                    <th style={{ color: "#2D2D2D" }} className="text-center">
                      Action
                    </th>
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
                      <td colSpan="2" className="text-center text-danger">
                        Error: {error}
                      </td>
                    </tr>
                  ) : currentStatuses.length > 0 ? (
                    currentStatuses.map((QualificationObj) => (
                      <tr key={QualificationObj.id}>
                        <td className="text-center">{QualificationObj.id}</td>
                        <td className="text-center">
                          {/* {editQualification === QualificationObj.id ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                            />
                          ) : ( */}
                          {QualificationObj.qualificationName}
                          {/* )} */}
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <EditButton
                              // className="btn btn-primary btn-sm mr-1 py-0 px-2"
                              onClick={() => {
                                handleOpenPopup();
                                setEditQualification(QualificationObj.id);
                                setEditValue(
                                  QualificationObj.qualificationName
                                );
                              }}
                            />

                            <DeleteButton
                              className="btn btn-danger btn-sm mr-1 py-0 px-2"
                              onDelete={() =>
                                handleDeleteQualification(QualificationObj.id)
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No data available in table</td>
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

export default Qualification;
