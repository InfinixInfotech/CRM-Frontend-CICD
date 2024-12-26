import React, { useEffect, useState } from "react";
import DeleteButton from "../../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLeadSourceThunk,
  getAllLeadSourceThunk,
  getByIdLeadSourceThunk,
  postLeadSourceThunk,
  putLeadSourceThunk,
} from "../../../../Redux/Services/thunks/LeadSourceThunk";
import { HashLoader } from "react-spinners";
import { Alert } from "react-bootstrap";

const LeadSource = () => {
  const [leadSource, setLeadSource] = useState([]);
  const [newLeadSource, setNewLeadSource] = useState("");
  const [editLeadSource, setEditLeadSource] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.leadsource);

  useEffect(() => {
    dispatch(getAllLeadSourceThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      setLeadSource(data.data);
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

  const handleAddLeadSource = (e) => {
    e.preventDefault();

    if (
      newLeadSource.trim() !== "" &&
      !leadSource.includes(newLeadSource.trim())
    ) {
      const newAddLeadSource = {
        leadSourceValue: newLeadSource,
      };

      dispatch(postLeadSourceThunk(newAddLeadSource)).then((response) => {
        setLeadSource((prevState) => [
          ...prevState,
          { leadSourceValue: newLeadSource, id: response.id },
        ]);
        setNewLeadSource("");
        setMsg(response.message || "Status added successfully");

      });
    }
  };

  const handleEditLeadSource = (id) => {
    if (editValue.trim() !== "") {
      dispatch(putLeadSourceThunk({ id, leadSourceValue: editValue })).then(
        (response) => {
          setMsg(response?.payload?.message || "Status updated successfully");
          dispatch(getAllLeadSourceThunk());
          setEditStatus(null);
          setEditValue("");
        }
      );
    }
  };

  const handleDeleteLeadSource = (id) => {
    dispatch(deleteLeadSourceThunk(id))
      .unwrap()
      .then((response) => {
        setMsg(response.message || "Status deleted successfully");
        setLeadSource((prevStatuses) =>
          prevStatuses.filter((status) => status.id !== id)
        );
      })
      .catch((error) => {
        setMsg(error || "Failed to delete status");
      });
  };

  const fetchLeadSourceById = (id) => {
    dispatch(getByIdLeadSourceThunk(id)).then((response) => {
      const leadSourceValue = response.payload?.data;
      setEditStatus(leadSourceValue?.id);
      setEditValue(leadSourceValue?.status);
    });
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Lead Source
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
            <h4 className="p-0 mb-3 text-dark ">Add New Pool</h4>
            <form onSubmit={handleAddLeadSource}>
              <input
                type="text"
                value={newLeadSource}
                onChange={(e) => setNewLeadSource(e.target.value)}
                placeholder="Pool Name"
              />
              <button className="btn btn-primary ">Create</button>
            </form>
          </div>

          <div className="bg-white p-4 rounded border border-4 border-gray">
            <h5>View Pools</h5>
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
                  <th>Pool Name</th>
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
                ) : leadSource.length > 0 ? (
                  leadSource.map((leadSourceObj, index) => (
                    <tr key={leadSourceObj.id || index}>
                      <td>
                        {editLeadSource === leadSourceObj.id ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        ) : (
                          leadSourceObj.leadSourceValue
                        )}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          {editLeadSource === leadSourceObj.id ? (
                            <button
                              onClick={() =>
                                handleEditLeadSource(leadSourceObj.id)
                              }
                              className="btn btn-success"
                            >
                              Save
                            </button>
                          ) : (
                            <EditButton
                              className="btn btn-primary btn-sm mr-1 py-0 px-2"
                              onClick={() =>
                                fetchLeadSourceById(leadSourceObj.id)
                              }
                            />
                          )}
                          <DeleteButton
                            className="btn btn-danger btn-sm mr-1  py-0 px-2"
                            onDelete={() =>
                              handleDeleteLeadSource(leadSourceObj.id)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center">
                      No statuses available.
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

export default LeadSource;
