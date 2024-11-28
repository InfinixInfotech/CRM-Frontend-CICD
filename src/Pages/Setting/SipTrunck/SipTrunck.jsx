import React, { useState } from "react";
import "./SipTrunck.css";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { DeleteButton } from "../../../Components/Button/DeleteButton/DeleteButton";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";

const SipTrunk = () => {
  const [formData, setFormData] = useState({
    server: "Jugnu Server",
    trunkName: "",
    trunkIP: "",
    userName: "",
    password: "",
  });

  const [sipTrunks, setSipTrunks] = useState([
    {
      server: "Jugnu Server",
      trunkName: "GSM_250",
      trunkIP: "192.168.1.250",
      userName: "GSM_250",
      password: "GSM_250",
    },
    {
      server: "Jugnu Server",
      trunkName: "Dinstart_249",
      trunkIP: "192.168.1.249",
      userName: "Dinstart_249",
      password: "Dinstart_249",
    },

  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = () => {
    setSipTrunks([...sipTrunks, formData]);
    setFormData({
      server: "Jugnu Server",
      trunkName: "",
      trunkIP: "",
      userName: "",
      password: "",
    });
  };


  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        SIP Trunk
      </h2>
      <BackButton />
      <div className="sip-trunk-container">
        <div className="add-sip-trunk">
          <h5 className="addLeadsinput border border-black p-2 mb-2 text-white ">
            Add New SIP Trunk
          </h5>
          <form>
            <div className="form-row">
              <label>Server</label>
              <select
                name="server"
                value={formData.server}
                onChange={handleChange}
              >
                <option value="Jugnu Server">Jugnu Server</option>
                <option value="Other Server">Other Server</option>
              </select>
            </div>
            <div className="form-row">
              <label>Trunk Name</label>
              <input
                type="text"
                name="trunkName"
                value={formData.trunkName}
                onChange={handleChange}
                placeholder="Trunk Name"
              />
            </div>
            <div className="form-row">
              <label>Trunk IP Address</label>
              <input
                type="text"
                name="trunkIP"
                value={formData.trunkIP}
                onChange={handleChange}
                placeholder="Trunk IP Address"
              />
            </div>
            <div className="form-row">
              <label>User Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="User Name"
              />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleCreate}
            >
              Create
            </button>
          </form>
        </div>

        <div className="view-sip-trunk">
          <h1>View SIP Trunk</h1>
          <CopyButton />
          <CsvButton />
          <PdfButton />
          <PrintButton />
          <table>
            <thead>
              <tr>
                <th>Server</th>
                <th>Trunk Name</th>
                <th>Trunk IP</th>
                <th>User Name</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sipTrunks.map((trunk, index) => (
                <tr key={index}>
                  <td>{trunk.server}</td>
                  <td>{trunk.trunkName}</td>
                  <td>{trunk.trunkIP}</td>
                  <td>{trunk.userName}</td>
                  <td>{trunk.password}</td>
                  <td>
                    <EditButton />
                    <DeleteButton />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SipTrunk;
