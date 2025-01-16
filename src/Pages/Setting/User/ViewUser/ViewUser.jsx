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

  // Calculate the total number of pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Generate page numbers around the current page
  const pageNumbers = [];
  const pageRange = 2; // Show 2 pages before and 2 pages after the current page (3 to 4 total pages)
  for (
    let i = Math.max(1, currentPage - pageRange);
    i <= Math.min(totalPages, currentPage + pageRange);
    i++
  ) {
    pageNumbers.push(i);
  }

  // Pagination handlers
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
      const timer = setTimeout(() => {
        setUsers(data.data);
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

  // const filteredUsers = users.filter(
  //   (user) =>
  //     (user.userName || "").toLowerCase().includes(search.toLowerCase()) &&
  //     (status === "All" || user.status === status)
  // );

  // !  <---------------------------------------Edit Functionality------------------->

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
  // !  <--------------------------------------- Delete Functionality------------------->

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
          // padding: "12px 30px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          marginBottom: "0px", // Uncomment and fix if needed
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
            // backgroundColor: "#E3E3E3",
          }}
        >
          <FaEye
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          View User
        </h2>
      </section>

      <BackButton />
      <div
        className="mt-2"
        // style={{ padding: "18px 16px" }}
      >
        <div className="view-user-container border border-2 border-grey mt-0 p-2">
          <div className="toolbar">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between ",
                gap: "65vw",
                maxWidth: "100vw",
                margin: "0 auto",
              }}
            >
              <div className="d-flex flex-column" s>
                <button
                  className="btn text-white mb-1"
                  style={{ backgroundColor: "#009688" }}
                  onClick={handleNavigateToAddUser}
                >
                  <FaUsers className="fs-5 me-1" />
                  Add Users
                </button>
                <ExportData tableId="table-data" />
              </div>

              <div
                className="status-filter d-flex flex-column gap-1"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-box"
                  style={{ padding: "10px", width: "200px" }}
                />

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ padding: "5px" }}
                >
                  <option value="" disabled>-- Select Status --</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="All">All</option>
                </select>
              </div>
            </div>
          </div>

          {msg && (
            <Alert variant="info" className="mt-2 text-center">
              {msg}
            </Alert>
          )}
          <table id="table-data" className="user-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Employee Code</th>
                <th>Extension</th>
                <th>Upload Pic</th>
                <th>password</th>
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
                  <td colSpan="6" className="text-center text-danger">
                    Error: {error}
                  </td>
                </tr>
              ) : currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.employeeCode || index}>
                    <td>{user.userName || "N/A"}</td>
                    <td>{user.employeeCode || "N/A"}</td>
                    <td>{user.extension?.callingExt || "No Extension"}</td>
                    <td>
                      <input type="file" className="upload-file" />
                    </td>
                    <td className="text-success">
                      {user.password || "No Extension"}
                    </td>

                    <td>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        {editUser === index ? (
                          <button
                            // onClick={() => handle(index)}
                            className="btn btn-success btn-sm py-0 px-2"
                          >
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
                            // borderRadius: "0",
                            // backgroundColor: "#1F68B1",
                            fontSize: "12px",
                            //   border: "1px solid grey",
                            //   color : "white"
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
    </>
  );
};
export default ViewUser;
