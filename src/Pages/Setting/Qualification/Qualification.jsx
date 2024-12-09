import React, { useEffect, useState } from "react";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import { DeleteButton } from "../../../Components/Button/DeleteButton/DeleteButton";
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
      setQualification(data.data);
    }
  }, [data]);

  const handleAddQualification = () => {
    if (
      newQualification.trim() !== "" &&
      !qualification.includes(newQualification.trim())
    ) {
      const newAddQualification = {
        qualificationName: newQualification,
      };

      dispatch(postQualificationThunk(newAddQualification)).then((response) => {
        setMsg(response?.payload?.message || "added successfully");
        setQualification([...qualification, newQualification.trim()]);
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
      });
    }
  };

  const handleDeleteQualification = (id) => {
    if (window.confirm("Are you sure you want to delete Qualification?")) {
      dispatch(deleteQualificationThunk(id))
        .unwrap()
        .then((response) => {
          setMsg(response.message || "deleted successfully");
        })
        .catch((error) => {
          setMsg(error || "Failed to delete status");
        });
    }
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
              <input
                type="text"
                value={newQualification}
                onChange={(e) => setNewQualification(e.target.value)}
                placeholder="Qualification Name"
              />
              <button
                onClick={handleAddQualification}
                className="btn btn-primary"
              >
                Create
              </button>
              <p className="mt-3 text-success">{msg}</p>
            </div>

            <div className="bg-white p-4 rounded border border-4 border-gray">
              <h5>View Qualification</h5>
              <div className=" mb-4 ">
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
                  <tr>
                    <th>Qualification Name</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="2" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="2" className="text-center text-danger">
                        Error: {error}
                      </td>
                    </tr>
                  ) : qualification.length > 0 ? (
                    // qualification.map((QualificationObj, index) => (
                    //   <tr key={index}>
                    //     <td>{QualificationObj.qualificationName}</td>{" "}
                    //     <td className="text-center">
                    //       <div className="d-flex justify-content-center align-items-center gap-2">
                    //         <EditButton className="btn btn-primary btn-sm mr-1 py-0 px-2" />
                    //         <DeleteButton className="btn btn-danger btn-sm mr-1  py-0 px-2 " />
                    //       </div>
                    //     </td>
                    //   </tr>
                    // ))
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
                              onClick={() =>
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
