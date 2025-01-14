import React, { useEffect, useState } from "react";
import { DeleteButton } from "../../../../Components/Button/DeleteButton/DeleteButton";
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

const LeadSource = () => {
  const [leadSource, setLeadSource] = useState([]);
  const [newLeadSource, setNewLeadSource] = useState("");
  const [editLeadSource, setEditLeadSource] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.leadsource);


   

  useEffect(() => {
    dispatch(getAllLeadSourceThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const timer = setTimeout(() => {
        setLeadSource(data.data);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleAddLeadSource = () => {
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
      });
    }
  };

  const handleEditLeadSource = (id) => {
    if (editValue.trim() !== "") {
      setLeadSource((prevState) =>
        prevState.map((source) =>
          source.id === id ? { ...source, leadSourceValue: editValue } : source
        )
      );
      setEditLeadSource(null); // Exit editing mode
      setEditValue(""); // Clear the input field
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

            <input
              type="text"
              value={newLeadSource}
              onChange={(e) => setNewLeadSource(e.target.value)}
              placeholder="Pool Name"
            />
            <button onClick={handleAddLeadSource} className="btn btn-primary ">
              Create
            </button>
            <p className="mt-3 text-success">{msg}</p>
          </div>

          <div className="bg-white p-4 rounded border border-4 border-gray">
            <h5>View Pools</h5>
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
                  <th>Pool Name</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100px",
                        }}
                      >
                        <HashLoader color="#0060f1" size={50} />
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="2" className="text-center text-danger">
                      Error: {error}
                    </td>
                  </tr>
                ) : currentStatuses.length > 0 ? (
                  currentStatuses.map((leadSourceObj, index) => (
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
                              onClick={handleEditLeadSource}
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

export default LeadSource;