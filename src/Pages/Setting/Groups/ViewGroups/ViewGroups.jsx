import React, { useEffect, useState } from "react";
import DeleteButton from "../../../../Components/Button/DeleteButton/DeleteButton";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import ExportButton from "../../../../Components/Button/DataButton/ExportButton";
import {
  putGroupsThunk,
  deleteGroupsThunk,
  getAllGroupsThunk,
  getByIdGroupsThunk,
} from "../../../../Redux/Services/thunks/GroupsThunk";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaEye } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";

const ViewGroups = () => {
  const [groupsData, setGroupsData] = useState([]);
  const [editgroups, setEditGroups] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.groups);
  const navigate = useNavigate();
  //!--------------------------------------------PAGINATION LOGIC-------------------------------------//

  const totalPages = Math.ceil(groupsData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGroups = groupsData.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  //!--------------------------------------------Handle Navigate-------------------------------------//

  const handleNavigate = (id, groupObj) => {
    if (!groupObj) {
      console.error("groupObj is undefined or null");
      return;
    }
    console.log("groupObj.groupId is ----------------", groupObj.groupId);

    navigate(`/editgroups/${id}`, {
      state: { groupObj, groupId: groupObj.groupId || null, id: id || null },
    });
    alert("working");
  };

  const handleNavigateToAddGrp = () => {
    navigate(`/addgroups`);
  };

  useEffect(() => {
    dispatch(getAllGroupsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const timer = setTimeout(() => {
        setGroupsData(data.data);
      }, 300);
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

  const handleEditGroups = (id) => {
    if (editValue !== "") {
      dispatch(putGroupsThunk({ id, status: editValue })).then((response) => {
        setMsg(response?.payload?.message || "updated successfully");
        dispatch(getAllGroupsThunk());
        setEditStatus(null);
        setEditValue("");
      });
    }
  };

  const handleDeleteGroups = (id) => {
    setGroupsData((prevGroups) =>
      prevGroups.filter((group) => group.id !== id)
    );
    dispatch(deleteGroupsThunk(id))
      .unwrap()
      .then((response) => {
        setMsg(response.message || "Group deleted successfully");
      })
      .catch((error) => {
        // Handle error in case of failure
        setMsg(error || "Failed to delete group");
      });
  };

  //!----COMMENT-------------------------------------//

  //TODO    const fetchGroupsById = (id) => {
  //TODO    dispatch(getByIdGroupsThunk(id)).then((response) => {
  //TODO     const status = response.payload?.data;
  //TODO     setEditStatus(status?.id);
  //TODO     setEditValue(status?.status);
  //TODO      });
  //TODO    };
  //!------------------------------------------------------------------//

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
          <FaUsers
            className="fs-1"
            style={{ marginRight: "8px", color: "#2c3e50" }}
          />
          Groups
        </h2>
      </section>
      <div className="mt-2 w-100 border border-2 border-gray ">
        <h5
          className="text-dark border border-1 pb-2"
          style={{
            // padding: "18px 16px",
            fontSize: "1.7 rem",
            backgroundColor: "#E8F1F3",
          }}
        >
          {/* <FaEye
            className="fs-2"
            style={{ marginRight: "8px", color: "#2c3e50" }}
          /> */}
          <BackButton />
          View Groups
        </h5>
        <div
          style={{
            margin: "15px 5px 15px 5px",
            paddingBottom: "15px",
          }}
        >
          <div className="px-2 mt-1">
            <div className=" d-flex gap-1">
              <button
                className="btn text-white px-2 py-0"
                style={{ backgroundColor: "#2c3e50" }}
                onClick={handleNavigateToAddGrp}
              >
                <GrAdd className="fs-6 me-1" />
                Add Groups
              </button>
              <ExportButton tableId={"table-data"} />

              {msg && (
                <Alert variant="info" className="mt-2 text-center">
                  {msg}
                </Alert>
              )}
            </div>

            {loading && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
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
                  }}
                >
                  <HashLoader color="#0060f1" size={50} />
                </div>
              </div>
            )}

            <table
              id="table-data"
              className="table table-bordered table-striped mt-2 w-100"
            >
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Group Name</th>
                  <th>Group ID</th>
                  <th>Fetch Limit</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      {/* Empty row for loader */}
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4" className="text-center text-danger">
                      Error: {error}
                    </td>
                  </tr>
                ) : currentGroups.length > 0 ? (
                  currentGroups.map((groupObj) => (
                    <tr key={groupObj.id}>
                      <td>{groupObj.id}</td>
                      <td>
                        {editgroups === groupObj.id ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        ) : (
                          groupObj.groupName || "N/A"
                        )}
                      </td>
                      <td>
                        {editgroups === groupObj.id ? (
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        ) : (
                          groupObj.groupId || "N/A"
                        )}
                      </td>
                      <td>
                        {editgroups === groupObj.id ? (
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        ) : (
                          groupObj.fetchLimit || "N/A"
                        )}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          {editgroups === groupObj.id ? (
                            <button
                              onClick={() => handleEditGroups(groupObj.id)}
                              className="btn btn-success btn-sm"
                            >
                              Save
                            </button>
                          ) : (
                            <EditButton
                              className="btn btn-primary btn-sm mr-1 py-0 px-2"
                              onClick={() => {
                                handleNavigate(groupObj.id, groupObj);
                              }}
                            />
                          )}
                          <DeleteButton
                            className="btn btn-danger btn-sm mr-1 py-0 px-2"
                            onDelete={() => handleDeleteGroups(groupObj.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No data available in table</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
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
export default ViewGroups;
