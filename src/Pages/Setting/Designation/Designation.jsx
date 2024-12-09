import React, { useState } from "react";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import { DeleteButton } from "../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";

const Designation = () => {
  const [designation, setDesignation] = useState([]);
  const [newDesignation, setNewDesignation] = useState("");
  const [newTarget, setNewTarget] = useState("");

  const handleAddTarget = () => {
    if (newTarget.trim() !== "" && !designation.includes(newTarget.trim())) {
      const newaddDesignation = {
        designationName: newDesignation,
        designationTarget: newTarget,
      };

      setDesignation([...designation, newaddDesignation]);
      setNewTarget("");
      setNewDesignation("");
    }
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Designation
      </h2>
      <BackButton />
      <div
        className="container-fluid border border-2 border-gray mt-2 py-3"
        style={{ padding: "18px 16px" }}
      >
        <div
          className="lead-status-container mt-0 p-3"
          style={{ background: "rgb(227,227,227)", border: "2px solid grey" }}
        >
          {/* Add New Status */}
          <div className="addLeadscontainer add-status p-2 mb-2">
            <h4 className=" p-0 mb-2 text-dark ">Add New Designation</h4>

            <div className="d-flex mt-3">
              <input
                type="text"
                value={newDesignation}
                onChange={(e) => setNewDesignation(e.target.value)}
                placeholder="Designation Name"
              />

              <input
                type="text"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                placeholder="Designation Target"
              />

              <button onClick={handleAddTarget} className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
          <div className="bg-white p-4 rounded border border-4 border-gray">
            <h5>View Designation</h5>
            <div className=" mb-4 ">
              <PrintButton />
              <PdfButton />
              <CsvButton />
              <CopyButton />
            </div>
            <table
              id="table-data"
              className="table table-bordered table-striped"
            >
              <thead>
                <tr>
                  <th>Designation Target</th>
                  <th>Designation Name</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {designation.length > 0 ? (
                  designation.map((designationObj, index) => (
                    <tr key={index}>
                      <td>{designationObj.designationName}</td>
                      <td>{designationObj.designationTarget}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <EditButton className="btn btn-primary btn-sm mr-1 py-0 px-2"/>
                          <DeleteButton className="btn btn-danger btn-sm mr-1  py-0 px-2 "/>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No data available in table</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Designation;
