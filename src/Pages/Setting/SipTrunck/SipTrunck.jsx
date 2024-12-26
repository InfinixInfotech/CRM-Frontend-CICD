import React, { useState } from "react";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import DeleteButton  from "../../../Components/Button/DeleteButton/DeleteButton";
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
  // style={{ background: "rgb(227,227,227)", border: "2px solid grey" }}
  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        SIP Trunk
      </h2>
      <BackButton />
      <div
        className="container-fluid border border-2 border-gray mt-2 py-3"
        style={{ padding: "18px 16px" }}
      >
        <div style={{ background: "rgb(227,227,227)", border: "2px solid grey" , padding:"15px" }}>
        <div className="mb-2" >
          <h5 className="text-dark fs-4 mb-3">Add New SIP Trunk</h5>
          <form>
            <div className="mb-3">
              <label className="form-label">Server</label>
              <select
               style={{fontSize:"14px"}}
                className="form-select"
                name="server"
                value={formData.server}
                onChange={handleChange}
              >
                <option value="Jugnu Server">Jugnu Server</option>
                <option value="Other Server">Other Server</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Trunk Name</label>
              <input
               style={{fontSize:"14px"}}
                type="text"
                className="form-control"
                name="trunkName"
                value={formData.trunkName}
                onChange={handleChange}
                placeholder="Trunk Name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Trunk IP Address</label>
              <input
               style={{fontSize:"14px"}}
                type="text"
                className="form-control"
                name="trunkIP"
                value={formData.trunkIP}
                onChange={handleChange}
                placeholder="Trunk IP Address"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
               style={{fontSize:"14px"}}
                type="text"
                className="form-control"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="User Name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
               style={{fontSize:"14px"}}
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <button
              className="btn btn-secondary mb-3"
              type="button"
              onClick={handleCreate}
            >
              Create
            </button>
          </form>
        </div>

        <div>
          <h5 className="text-dark p-0 mb-2 fs-4">View SIP Trunk</h5>
         <div style={{backgroundColor:"#F5F5F5" , padding:"2px 18px"}}>
         <div className="mb-2">
            <CopyButton />
            <CsvButton />
            <PdfButton />
            <PrintButton />
          </div>
          <table className="table table-bordered text-center">
            <thead className="table-dark" style={{opacity:"0.7"}}>
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
                  <div className="d-flex justify-content-center align-items-center gap-2 ">
                        <EditButton className="btn btn-primary btn-sm mr-1 py-0 px-2" />
                        <DeleteButton className="btn btn-danger btn-sm mr-1  py-0 px-2 " />
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default SipTrunk;
