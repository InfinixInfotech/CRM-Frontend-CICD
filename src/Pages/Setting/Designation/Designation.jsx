import React, { useEffect, useState } from "react";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
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
      setDesignation(data.data);
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
    } catch (error) {
      setMsg(error.message || "Failed to update designation");
    }
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Designation
      </h2>
      <BackButton />
      <div className="container-fluid border border-2 border-gray mt-2 py-3">
        <div
          className="lead-status-container mt-0 p-3"
          style={{ background: "rgb(227,227,227)", border: "2px solid grey" }}
        >
          {/* Add/Edit Designation */}
          <div className="addLeadscontainer add-status p-2 mb-2">
            <h4 className="p-0 mb-2 text-dark">
              {editDesignation ? "Edit Designation" : "Add New Designation"}
            </h4>
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
              <div className="d-flex mt-3">
                <input
                  type="text"
                  value={editDesignation ? editValue : newDesignation}
                  onChange={(e) =>
                    editDesignation
                      ? setEditValue(e.target.value)
                      : setNewDesignation(e.target.value)
                  }
                  placeholder="Designation Name"
                />
                <input
                  type="number"
                  value={editDesignation ? editTarget : newTarget}
                  onChange={(e) =>
                    editDesignation
                      ? setEditTarget(e.target.value)
                      : setNewTarget(e.target.value)
                  }
                  placeholder="Designation Target"
                />
                <button
                  type="submit"
                  className={`btn ${
                    editDesignation !== null ? "btn-warning" : "btn-primary"
                  }`}
                >
                  {editDesignation ? "Update" : "Create"}
                </button>
              </div>
              {/* {editDesignation && (
                <button
                  type="button"
                  className="btn btn-secondary ml-2"
                  onClick={() => {
                    setEditDesignation(null);
                    setEditValue("");
                    setEditTarget("");
                  }}
                >
                  Cancel
                </button>
              )} */}
            </form>
          </div>

          {/* View Designations */}
          <div className="bg-white p-4 rounded border border-4 border-gray">
            <h5>View Designation</h5>
            <div className="mb-4">
              {/* <PrintButton />
              <PdfButton />
              <CsvButton />
              <CopyButton /> */}
              <ExportData tableId="table-data" />
              {msg && (
                <Alert variant="info" className="mt-2 text-center">
                  {msg}
                </Alert>
              )}
            </div>
            <table id="table-data" className="table table-bordered table-striped">
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

export default Designation;
