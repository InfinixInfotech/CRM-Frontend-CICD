import React, { useState } from "react";
import "./UserOperation.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";

const UserOperation = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: "Roshan Chouhan",
      username: "Roshan.Chouhan",
      teamMember: "Team Member",
      manager: "Jitendra Jhariya",
      group: "BA",
      target: 88500,
      extension: 5013,
      did: "",
      ctc: true,
      numberHide: false,
      recording: true,
      status: "Active",
      extStatus: "None",
    },
    {
      id: 2,
      fullName: "Nikhil Mourya",
      username: "Nikhil.Mourya",
      teamMember: "Team Member",
      manager: "Jitendra Jhariya",
      group: "TL",
      target: 118000,
      extension: 3012,
      did: "",
      ctc: true,
      numberHide: false,
      recording: true,
      status: "Active",
      extStatus: "None",
    },
    // Add more users here
  ]);

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5">
        User Operation
      </h2>
      <BackButton />
      <div
        className="container-fluid border border-2 border-gray mt-2 py-3"
        style={{ padding: "18px 16px" }}
      >
        <div className="user-operation-container mt-0 "  style={{ background: "rgb(227,227,227)", border: "2px solid grey" }}>
          <div className="filters mt-1">
            <label>Status:</label>
            <select>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <label>Group:</label>
            <select>
              <option value="">Select here...</option>
              {/* Add group options dynamically if available */}
            </select>

            <label>Manager:</label>
            <select>
              <option value="">Select here...</option>
              {/* Add manager options dynamically */}
            </select>

            <input type="text" placeholder="Search..." className="search-box" />
          </div>

          <div className="action-buttons">
            <CopyButton />
            <CsvButton />
            <PdfButton />
            <PrintButton />
            <select>
              <option value="10">10 records per page</option>
              <option value="20">20 records per page</option>
            </select>
          </div>

          <table className="user-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>User Name</th>
                <th>Team Member</th>
                <th>Manager</th>
                <th>Group</th>
                <th>Target</th>
                <th>Extension</th>
                <th>DID</th>
                <th>CTC</th>
                <th>Number Hide</th>
                <th>Recording</th>
                <th>Status</th>
                <th>Ext. Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.fullName}</td>
                  <td>{user.username}</td>
                  <td>{user.teamMember}</td>
                  <td>
                    <select defaultValue={user.manager}>
                      <option value={user.manager}>{user.manager}</option>
                      {/* Dynamically populate manager options */}
                    </select>
                  </td>
                  <td>
                    <select defaultValue={user.group}>
                      <option value={user.group}>{user.group}</option>
                      {/* Dynamically populate group options */}
                    </select>
                  </td>
                  <td>
                    <input type="text" defaultValue={user.target} />
                  </td>
                  <td>
                    <input type="text" defaultValue={user.extension} />
                  </td>
                  <td>
                    <input type="text" defaultValue={user.did} />
                  </td>
                  <td>
                    <input type="checkbox" defaultChecked={user.ctc} />
                  </td>
                  <td>
                    <input type="checkbox" defaultChecked={user.numberHide} />
                  </td>
                  <td>
                    <input type="checkbox" defaultChecked={user.recording} />
                  </td>
                  <td>
                    <select defaultValue={user.status}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <select defaultValue={user.extStatus}>
                      <option value="None">None</option>
                      {/* Add other options dynamically */}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button>Previous</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOperation;
