import React, { useState, useEffect } from "react";
import "./ViewUser.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import {
  getAllUserThunk,
  getByIdUserThunk,
} from "../../../../Redux/Services/thunks/UserThunk";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.user);

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

  // Handle search filtering
  const filteredUsers = users.filter(
    (user) =>
      (user.userName || "").toLowerCase().includes(search.toLowerCase()) &&
      (status === "All" || user.status === status)
  );

  const fetchUserById = (id) => {
    dispatch(getByIdUserThunk(id)).then((response) => {
      const userData = response.payload?.data;
      setEditUser(userData?.id);
      setEditValue(userData?.status);
    });
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        View Users
      </h2>
      <BackButton />
      <div
        className="container-fluid border border-2 border-gray mt-2 py-3"
        style={{ padding: "18px 16px" }}
      >
        <div
          className="view-user-container mt-0 p-3"
          style={{ background: "rgb(227,227,227)", border: "2px solid grey" }}
        >
          <div className="toolbar">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto 1fr", // Columns for BackButton, dropdown, and input
                gap: "30px", // Spacing between elements
                alignItems: "center", // Align items vertically
                maxWidth: "800px", // Limit width of the container
                margin: "0 auto", // Center horizontally
              }}
            >
              {/* Status Filter Dropdown */}
              <div
                className="status-filter"
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <label>Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ padding: "5px" }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="All">All</option>
                </select>
              </div>

              {/* Search Box */}
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-box"
                style={{ padding: "10px", width: "100%" }}
              />
            </div>
          </div>

          <table className="user-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Employee Code</th>
                <th>Extension</th>
                <th>Change Password</th>
                <th>Upload Pic</th>
                <th>Action</th>
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
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.employeeCode || index}>
                    <td>{user.userName || "N/A"}</td>
                    <td>{user.employeeCode || "N/A"}</td>
                    <td>
                      {user.extension?.callingExt
                        ? user.extension.callingExt
                        : "No Extension"}
                    </td>
                    <td>
                      <input type="file" className="upload-file" />
                    </td>
                    <td className="action-buttons">
                      <button
                        onClick={() => fetchUserById(user.employeeCode)}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </button>
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

          <div className="pagination">
            <button>Previous</button>
            {/* Add logic for pagination */}
            <button>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
