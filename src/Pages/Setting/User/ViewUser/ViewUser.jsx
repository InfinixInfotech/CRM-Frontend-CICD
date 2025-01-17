import React, { useState, useEffect } from "react";
import "./ViewUser.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../../../Components/Button/DeleteButton/DeleteButton";
import {
  getAllUserThunk,
  getByIdUserThunk,
  putUserThunk,
} from "../../../../Redux/Services/thunks/UserThunk";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExportData from "../../../../Components/Button/DataButton/ExportButton";
import { FaEye, FaUser, FaUsers } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Page state
  const [usersPerPage] = useState(10);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  const Navigate = useNavigate();

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const pageNumbers = [];
  const pageRange = 2;
  for (
    let i = Math.max(1, currentPage - pageRange);
    i <= Math.min(totalPages, currentPage + pageRange);
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    dispatch(getAllUserThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const sortedData = [...data.data].sort((a, b) => b.id - a.id);
      const timer = setTimeout(() => {
        setUsers(sortedData);
      }, 500);
      return () => clearTimeout(timer);
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

  // !  <---------------------------------------------------------------------Edit Functionality------------------------------------------------------------------------------>

  const handleEditUser = (id, user) => {
    if (!user) {
      console.error("Payment object is undefined or null");
      return;
    }
    console.log("User ----------------------", user);
    Navigate(`/edituser/${id}`, {
      state: {
        user,
        employeeCode: user.employeeCode || null,
        id: id || null,
      },
    });
    // Navigate("/edit-page", { state: { users: user } });
  };

  const handleNavigateToAddUser = () => {
    Navigate(`/adduser`);
  };
  // !  <---------------------------------------------------------------------- Delete Functionality------------------------------------------------------------------------------>

  const handleDeleteUser = (id) => {
    dispatch(deleteDepartmentThunk(id))
      .unwrap()
      .then((response) => {
        setMsg(response.message || "deleted successfully");
        setAddDepartment((prevStatuses) =>
          prevStatuses.filter((status) => status.id !== id)
        );
      })
      .catch((error) => {
        setMsg(error || "Failed to delete status");
      });
  };

  const fetchUserById = (id) => {
    dispatch(getByIdUserThunk(id)).then((response) => {
      const user = response.payload?.data;
      setEditUser(user?.id);
      setEditValue(user?.user);
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
          <FaUser
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Users
        </h2>
      </section>

      <div className="mt-2">
        <div className="view-user-container border border-2 border-grey mt-0 ">
          <h5
            className="text-dark border border-1 pb-2"
            style={{
              // padding: "18px 16px",
              fontSize: "1.7 rem",
              backgroundColor: "#E8F1F3",
            }}
          >
            <BackButton />
            View Users
          </h5>
          <div className="p-2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "51vw",
                maxWidth: "100vw",
              }}
            >
              <div className="iteam_1 d-flex gap-1">
                <button
                  className="btn btn-exp btn-sm text-white"
                  style={{ backgroundColor: "#009688" }}
                  onClick={handleNavigateToAddUser}
                >
                  <GrAdd className="fs-6 me-1" />
                  Add Users
                </button>
                <ExportData tableId="table-data" />
              </div>

              <div className="iteam_2 d-flex gap-1">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ padding: "5px", height: "30px" }}
                >
                  <option value="" disabled>
                    -- Select Status --
                  </option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="All">All</option>
                </select>

                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-box"
                  style={{ padding: "10px", width: "200px", height: "30px" }}
                />
              </div>

              {/* <div className="iteam_3">
                 
                </div>

                <div className="iteam_4">
                 
                </div> */}
            </div>
            {msg && (
              <Alert variant="info" className="text-center">
                {msg}
              </Alert>
            )}
            <table id="table-data" className="user-table mt-2">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>User Name</th>
                  <th>Employee Code</th>
                  <th>Extension</th>
                  {/* <th>Upload Pic</th> */}
                  <th>password</th>
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
                    <td colSpan="6" className="text-center text-danger">
                      Error: {error}
                    </td>
                  </tr>
                ) : currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr key={user.employeeCode || index}>
                      <td>{user.id || "N/A"}</td>
                      <td>{user.userName || "N/A"}</td>
                      <td>{user.employeeCode || "N/A"}</td>
                      <td>{user.extension?.callingExt || "No Extension"}</td>
                      {/* <td>
                        <input type="file" className="upload-file" />
                      </td> */}
                      <td className="text-success">
                        {user.password || "No Extension"}
                      </td>

                      <td>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          {editUser === index ? (
                            <button className="btn btn-success btn-sm py-0 px-2">
                              Save
                            </button>
                          ) : (
                            <EditButton
                              className="btn btn-primary btn-sm mr-1 py-0 px-2"
                              onClick={() => handleEditUser(user.id, user)}
                            />
                          )}

                          <button
                            style={{
                              fontWeight: "600",
                              fontSize: "12px",
                            }}
                            className="btn btn-warning btn-sm mr-1 py-0 px-2"
                          >
                            Login As
                          </button>

                          <DeleteButton
                            className="btn btn-danger btn-sm mr-1 py-0 px-2"
                            onDelete={() => handleDeleteUser(user.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No Users Found</td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>
                <i class="bi bi-arrow-left-circle"></i>
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? "active" : ""}
                >
                  {number}
                </button>
              ))}
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                <i class="bi bi-arrow-right-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewUser;
