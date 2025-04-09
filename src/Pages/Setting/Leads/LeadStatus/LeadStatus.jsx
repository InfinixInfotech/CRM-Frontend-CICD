import React, { useEffect, useState } from "react";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../../../Components/Button/DeleteButton/DeleteButton";
import "./LeadStatus.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLeadStatusThunk,
  postLeadStatusThunk,
  deleteLeadStatusThunk,
} from "../../../../Redux/Services/thunks/LeadStatusThunk";
import { HashLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import { staticToken } from "../../../../Redux/Services/apiServer/ApiServer";
import ExportData from "../../../../Components/Button/DataButton/ExportButton";
import { FaChartLine, FaEye, FaGraduationCap } from "react-icons/fa";
import { GrAdd, GrMenu } from "react-icons/gr";
import CommonPopup from "../../../../Components/Button/PopUpButton/PopupButton";

const LeadStatus = () => {
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [editStatus, setEditStatus] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.leadstatus);

  //!<---------------------------------------------------------------------------------Pagination Functionality---------------------------------------------------------------------->

  const totalPages = Math.ceil(statuses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStatuses = statuses.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    dispatch(getAllLeadStatusThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const sortedData = [...data.data].sort((a, b) => b.id - a.id); // Sort data in descending order of id
      const timer = setTimeout(() => {
        setStatuses(sortedData);
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

  //!<---------------------------------------------------------------------------------ADD DATA Functionality---------------------------------------------------------------------->

  const handleAddStatus = (e) => {
    e.preventDefault();
    if (
      newStatus !== "" &&
      !statuses.some((s) => s.status === newStatus)
    ) {
      const newLeadStatus = { status: newStatus };

      dispatch(postLeadStatusThunk(newLeadStatus)).then((response) => {
        setMsg(response?.payload?.message);
        setNewStatus("");

        dispatch(getAllLeadStatusThunk());
        handleClosePopup();
      });
    }
  };

  // !<--------------------------------------------------------------------------- EMAIL POPUP FUNCTIONALITY--------------------------------------------------------------------------

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditStatus(null);
    setNewStatus("");
    setEditValue("");
  };

  //!<---------------------------------------------------------------------------------EDIT Functionality---------------------------------------------------------------------->

  const handleEditStatus = async (id) => {
    if (editValue !== "") {
      try {
        const token = staticToken; // Replace with your token retrieval logic
        const response = await fetch(`/api/LeadStatus/UpdateLeadStatus`, {
          method: "POST", // Changed to POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adding the token
          },
          body: JSON.stringify({ id, status: editValue }), // Ensure `id` is included in the payload
        });

        if (!response.ok) {
          throw new Error("Failed to update status");
        }

        const data = await response.json();
        setMsg(data?.message || "Status updated successfully");

        setStatuses((prevStatuses) =>
          prevStatuses.map((status) =>
            status.id === id ? { ...status, status: editValue } : status
          )
        );
        setEditStatus(null);
        setEditValue("");
        handleClosePopup();
      } catch (error) {
        setMsg(error.message || "Failed to update status");
      }
    }
  };

  //!<---------------------------------------------------------------------------------DELETE DATA Functionality---------------------------------------------------------------------->

  const handleDeleteStatus = (id) => {
    dispatch(deleteLeadStatusThunk(id))
      .unwrap()
      .then((response) => {
        setMsg(response.message || "Status deleted successfully");
        setStatuses((prevStatuses) =>
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
          <FaChartLine
            className="fs-1"
            style={{ marginRight: "8px", color: "#2c3e50" }}
          />
          Lead Status
        </h2>
      </section>
      <div
        className="mt-2 py-3"
        // style={{ padding: "18px 16px" }}
      >
        <div
          className="lead-status-container border border-2 border-gray mt-0 "
          style={{
            // background: "rgb(227,227,227)",
            // border: "2px solid grey",
            height: "100%",
          }}
        >
          <h5
            className="  text-dark  border border-1 pb-2"
            style={{
              // padding: "18px 16px",
              fontSize: "1.7 rem",
              backgroundColor: "#E8F1F3",
            }}
          >
            {/* <FaEye
              className="fs-1"
              style={{ marginRight: "8px", color: "#2c3e50" }}
            /> */}
            <BackButton />
            View Lead Status
          </h5>
          <div className="addLeadscontainer add-status p-2 ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editStatus !== null) {
                  // Update functionality
                  handleEditStatus(editStatus);
                } else {
                  // Create functionality
                  handleAddStatus(e);
                }
              }}
            ></form>

            <div className=" mt-1">
              <div className="d-flex  gap-1">
                <div>
                  <CommonPopup
                    title="Lead Status"
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                    handleAddStatus={handleAddStatus}
                    handleEditStatus={handleEditStatus}
                    editStatus={editStatus}
                    setEditValue={setEditValue}
                    newStatus={newStatus}
                    setNewStatus={setNewStatus}
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
            </div>
            <table
              id="table-data"
              className="table table-bordered table-striped mt-2"
            >
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Lead Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="2" className="text-center">
                      <HashLoader color="#0060f1" size={50} />
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="2" className="text-center text-danger">
                      Error: {error}
                    </td>
                  </tr>
                ) : currentStatuses.length > 0 ? (
                  currentStatuses.map((statusObj) => (
                    <tr key={statusObj.id}>
                      <td>{statusObj.id}</td>
                      <td>
                        {/* {editStatus === statusObj.id ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        ) : ( */}
                        {statusObj.status}
                        {/* )} */}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <EditButton
                            className="btn btn-primary btn-sm mr-1 py-0 px-2"
                            onClick={() => {
                              handleOpenPopup();
                              setEditStatus(statusObj.id);
                              setEditValue(statusObj.status);
                            }}
                          />
                          <DeleteButton
                            className="btn btn-danger btn-sm mr-1 py-0 px-2"
                            onDelete={() => handleDeleteStatus(statusObj.id)}
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

export default LeadStatus;
