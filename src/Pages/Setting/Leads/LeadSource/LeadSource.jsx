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
import { staticToken } from "../../../../Redux/Services/apiServer/ApiServer";
import ExportData from "../../../../Components/Button/DataButton/ExportButton";
import CommonPopup from "../../../../Components/Button/PopUpButton/PopupButton";

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
  const [showPopup, setShowPopup] = useState(false);
  //!----------------------------------------------------------------------------------------------<---Pagination Logic------------->------------------------------------------------------
  const totalPages = Math.ceil(leadSource.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStatuses = leadSource.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    dispatch(getAllLeadSourceThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const sortedData = [...data.data].sort((a, b) => b.id - a.id);
      setLeadSource(sortedData);
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
        dispatch(getAllLeadSourceThunk());
      });
      setShowPopup(false);
    }
  };

  //!<---------------------------------------------------------------------------------EDIT Functionality---------------------------------------------------------------------->

  const handleEditSource = async (id) => {
    if (editValue.trim() !== "") {
      try {
        const token = staticToken;
        const response = await fetch(`/api/LeadSource/UpdateLeadSource`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id, leadSourceValue: editValue }),
        });

        if (!response.ok) {
          throw new Error("Failed to update lead source");
        }

        const data = await response.json();
        setMsg(data.message || "Lead source updated successfully");
        setLeadSource((prevStatuses) =>
          prevStatuses.map((status) =>
            status.id === id
              ? { ...status, leadSourceValue: editValue }
              : status
          )
        );
        setEditLeadSource(null);
        setEditValue("");
        setShowPopup(false);
      } catch (err) {
        setMsg(err.message);
      }
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
          Lead Source
        </h2>
      </section>

      <div className="mb-0">
        <div className="lead-status-container mt-0 ">
          <div className="addLeadscontainer add-status mt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editLeadSource !== null) {
                  // Update functionality
                  handleEditSource(editLeadSource);
                } else {
                  // Create functionality
                  handleAddLeadSource(e);
                }
              }}
            ></form>
          </div>

          <div className="bg-white  border border-2 border-gray">
            <h5
              className="text-dark border border-1 pb-2"
              style={{
                // padding: "18px 16px",
                fontSize: "1.7 rem",
                backgroundColor: "#E8F1F3",
              }}
            >
              <BackButton />
              View Lead Source
            </h5>
            <div className="p-2">
              <div className="d-flex gap-1">
                <div>
                  <CommonPopup
                    title="Lead Source"
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                    handleAddStatus={handleAddLeadSource}
                    handleEditStatus={handleEditSource}
                    editStatus={editLeadSource}
                    setEditValue={setEditValue}
                    newStatus={newLeadSource}
                    setNewStatus={setNewLeadSource}
                    editValue={editValue}
                  />
                </div>
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
                    <th>S.No</th>
                    <th>Lead Source Name</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="text-center">
                        <HashLoader color="#0060f1" size={50} />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="3" className="text-center text-danger">
                        Error: {error}
                      </td>
                    </tr>
                  ) : currentStatuses.length > 0 ? (
                    currentStatuses.map((leadSourceObj) => (
                      <tr key={leadSourceObj.id}>
                        <td>{leadSourceObj.id}</td>
                        <td>{leadSourceObj.leadSourceValue}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <EditButton
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setShowPopup(true);
                                setEditLeadSource(leadSourceObj.id);
                                setEditValue(leadSourceObj.leadSourceValue);
                              }}
                            />
                            <DeleteButton
                              className="btn btn-danger btn-sm"
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
                      <td colSpan="3" className="text-center">
                        No lead sources available.
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

export default LeadSource;
