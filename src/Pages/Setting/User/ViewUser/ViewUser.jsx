import React, { useState, useEffect } from "react";
import "./ViewUser.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("Active");
  const [search, setSearch] = useState("");

  // Fetch users from a mock API or backend
  useEffect(() => {
    // Replace this with your actual API call
    const fetchUsers = async () => {
      const mockData = [
        {
          id: 1,
          username: "Roshan.Chouhan",
          empCode: 117,
          extension: 5013,
          password: "172314",
        },
        {
          id: 2,
          username: "Nikhil.Mourya",
          empCode: 106,
          extension: 3012,
          password: "-0987654321*",
        },
        {
          id: 3,
          username: "Mayuri.Lohar",
          empCode: 4,
          extension: 5029,
          password: "Mayuri@123",
        },
        // Add more mock users...
      ];
      setUsers(mockData);
    };

    fetchUsers();
  }, []);

  // Handle search filtering
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) &&
      (status === "All" || user.status === status)
  );

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        View Users
      </h2>
      <BackButton />
      <div className="view-user-container mt-2">
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
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.empCode}</td>
                <td>{user.extension}</td>
                <td>
                  <input
                    type="text"
                    defaultValue={user.password}
                    className="password-box"
                  />
                  <button className="change-password-btn">
                    Change Password
                  </button>
                </td>
                <td>
                  <input type="file" className="upload-file" />
                </td>
                <td className="action-buttons">
                  <button className="edit-btn">Edit</button>
                  <button className="login-btn">Login As</button>
                  <button className="live-btn">Live Streaming</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button>Previous</button>
          {/* Add logic for pagination */}
          <button>Next</button>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
