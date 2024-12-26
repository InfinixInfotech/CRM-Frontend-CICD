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
  getByIdQualificationThunk,
  postQualificationThunk,
  putQualificationThunk,
} from "../../../Redux/Services/thunks/QualificationThunk";
import { HashLoader } from "react-spinners";
import { Alert } from "react-bootstrap";

const Qualification = () => {
  const [qualification, setQualification] = useState([]);
  const [newQualification, setNewQualification] = useState("");
  const [editQualification, setEditQualification] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.qualification);

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
        // setQualification([...qualification, newQualification.trim()]);
        setMsg(response?.payload?.message || "added successfully");
        setQualification((prevState) => [
          ...prevState,
          { qualificationName: newQualification, id: response.id },
        ]);

        setNewQualification("");
      });
    }
  };

  const handleEditQualification = (id) => {
    if (editValue.trim() !== "") {
      dispatch(
        putQualificationThunk({ id, qualificationName: editValue })
      ).then((response) => {
        setMsg(response?.payload?.message || "updated successfully");
        dispatch(getAllQualificationThunk());
        setEditQualification(null);
        setEditValue("");
        setMsg(response.message);

      });
    }
  };

  const handleDeleteQualification = (id) => {
    dispatch(deleteQualificationThunk(id))
      .unwrap()
      .then((response) => {
        setMsg(response.message);
        setQualification((prevStatuses) =>
          prevStatuses.filter((status) => status.id !== id)
        );
      })
      .catch((error) => {
        setMsg(error || "Failed to delete status");
      });
  };

  const fetchQualificationById = (id) => {
    dispatch(getByIdQualificationThunk(id)).then((response) => {
      const qualificationName = response.payload?.data;
      setEditStatus(qualificationName?.id);
      setEditValue(qualificationName?.qualificationName);
    });
  };

  return (
    <>
      <h2
        className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2"
        style={{ padding: "18px 16px" }}
      >
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
              <form onSubmit={handleAddQualification}>
                <input
                  type="text"
                  value={newQualification}
                  onChange={(e) => setNewQualification(e.target.value)}
                  placeholder="Qualification Name"
                />
                <button type="submit" className="btn btn-primary">Create</button>
              </form>
            </div>

            <div className="bg-white p-4 rounded border border-4 border-gray">
              <h5>View Qualification</h5>
              <div className=" mb-4 ">
                <PrintButton />
                <PdfButton />
                <CsvButton />
                <CopyButton />

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
                  ) : qualification.length > 0 ? (
                    qualification.map((QualificationObj) => (
                      <tr key={QualificationObj.id}>
                        <td>
                          {editQualification === QualificationObj.id ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                            />
                          ) : (
                            QualificationObj.qualificationName
                          )}
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            {editQualification === QualificationObj.id ? (
                              <button
                                onClick={() =>
                                  handleEditQualification(QualificationObj.id)
                                }
                                className="btn btn-success"
                              >
                                Save
                              </button>
                            ) : (
                              <EditButton
                                className="btn btn-primary btn-sm mr-1 py-0 px-2"
                                onClick={() =>
                                  fetchQualificationById(QualificationObj.id)
                                }
                              />
                            )}
                            <DeleteButton
                              className="btn btn-danger btn-sm mr-1  py-0 px-2"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Qualification;
