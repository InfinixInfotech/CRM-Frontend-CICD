import React, { useEffect, useState } from "react";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQualificationThunk,
  getAllQualificationThunk,
  postQualificationThunk,
  putQualificationThunk,
} from "../../../Redux/Services/thunks/QualificationThunk";
import { HashLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import { staticToken } from "../../../Redux/Services/apiServer/ApiServer";
import ExportData from "../../../Components/Button/DataButton/ExportButton";
import { FaGraduationCap } from "react-icons/fa";

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

  //!----------------------------------------------------------------------------------------------<---Pagination Logic------------->------------------------------------------------------
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
      const timer = setTimeout(() => {
        setQualification(data.data);
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
      <h2
        className="mb-0 py-2 text-dark mt-5 mb-2"
        style={{ padding: "18px 16px", fontSize: "30px" }}
      >
        <FaGraduationCap
          className="fs-1"
          style={{ marginRight: "8px", color: "#009688" }}
        />
        Qualification
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
          <div className="lead-status-container mt-2">
            <div className="addLeadscontainer add-status p-2 mb-2">
              <h4 className="p-0 mb-3 text-dark ">Add New Qualification</h4>
              <button onClick={handleOpenPopup} className="btn btn-primary">
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
                        <button type="submit" className="btn btn-success w-100">
                          {editQualification !== null ? "Update" : "Create"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded border border-4 border-gray">
              <h5
                className="mb-0  text-dark py-2 mt-5 mb-2 border border-1"
                style={{ padding: "18px 16px", backgroundColor: "#E8F1F3" }}
              >
                View Qualification
              </h5>
              <div className=" mb-4 ">
                <ExportData tableId="table-data" />

                {msg && (
                  <Alert variant="info" className="mt-2 text-center">
                    {msg}
                  </Alert>
                )}
              </div>
              <table
                id="table-data"
                className="table table-bordered table-striped"
              >
                <thead>
                  <tr>
                    <th>Qualification Name</th>
                    <th className="text-center">Action</th>
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
                        <td>
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
                              className="btn btn-primary btn-sm mr-1 py-0 px-2"
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
