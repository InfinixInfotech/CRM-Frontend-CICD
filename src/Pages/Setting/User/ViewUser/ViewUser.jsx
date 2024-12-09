import React, { useState, useEffect } from "react";
import "./ViewUser.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import {
  getAllUserThunk,
  getByIdUserThunk,
} from "../../../../Redux/Services/thunks/UserThunk";
import { useDispatch, useSelector } from "react-redux";

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
      setUsers(data.data); // Sets the 'data' array from the API response
    }
  }, [data]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const mockData = [
  //       {
  //         id: 1,
  //         username: "Roshan.Chouhan",
  //         empCode: 117,
  //         extension: 5013,
  //         password: "172314",
  //       },
  //       {
  //         id: 2,
  //         username: "Nikhil.Mourya",
  //         empCode: 106,
  //         extension: 3012,
  //         password: "-0987654321*",
  //       },
  //       {
  //         id: 3,
  //         username: "Mayuri.Lohar",
  //         empCode: 4,
  //         extension: 5029,
  //         password: "Mayuri@123",
  //       },

  //     ];
  //     setUsers(mockData);
  //   };

  //   fetchUsers();
  // }, []);

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
              {users && users.length > 0 ? (
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
