import React, { useEffect, useState } from "react";
import DeleteButton from "../../../../Components/Button/DeleteButton/DeleteButton";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import ExportButton from "../../../../Components/Button/DataButton/ExportButton"
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


const ViewGroups = () => {
  const [groupsData, setGroupsData] = useState([]);
  const [editgroups, setEditGroups] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(10); 
  const [msg,setMsg]=useState("")
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.groups);
  const navigate = useNavigate();
//!--------------------------------------------PAGINATION LOGIC-------------------------------------//

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = groupsData.slice(indexOfFirstGroup, indexOfLastGroup);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(groupsData.length / groupsPerPage);

  const handleNavigate = (id, groupObj)=>{
    if (!groupObj) {
      console.error("groupObj is undefined or null");
      return;
    }
    console.log("groupObj.groupId is ----------------", groupObj.groupId);
    
    navigate(`/editgroups/${id}`, {state: {groupObj, groupId: groupObj.groupId||null , id : id|| null}})
    alert("working")
  }

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
    if (editValue.trim() !== "") {
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
    <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2" style={{ position: "relative" }}>
      View Groups
    </h2>
    <BackButton />
    <div className="container-fluid border border-2 border-gray mt-2">
      <div
        style={{
          background: "rgb(227,227,227)",
          margin: "15px 5px 15px 5px",
          paddingBottom: "15px",
          border: "2px solid gray",
        }}
      >
        <div className="px-2 mt-1">
          <div className="mb-2">
            {/* <PrintButton tableId={"table-data"} />
            <PdfButton tableId={"table-data"} />
            <CsvButton tableId={"table-data"} />
            <CopyButton tableId={"table-data"} /> */}
            <ExportButton tableId={"table-data"} />
  
            {msg && (
              <Alert variant="info" className="mt-2 text-center">
                {msg}
              </Alert>
            )}
          </div>
  
          {/* Loader and Background Overlay */}
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
  
          <table id="table-data" className="table table-bordered table-striped w-100">
            <thead>
              <tr>
                <th className="text-center">Group Name</th>
                <th className="text-center">Lead Limit</th>
                <th className="text-center">Fetch Limit</th>
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
                            onClick={()=>{handleNavigate(groupObj.id , groupObj)}}
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
          <div className="d-flex justify-content-center mt-3">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};
export default ViewGroups;