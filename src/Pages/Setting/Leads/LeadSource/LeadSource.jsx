import React, { useState } from "react";
import { DeleteButton } from "../../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";

const LeadSource = () => {
  const [statuses, setStatuses] = useState([
    'Dispose Pool',
    'Potential Pool',
    'webleads',
    'HNI pool',
    'Platinum Pool',
    'Diamond Pool',
    'Additional Pool',
    'Ultra HNI Pool',
    'Special Pool',
  ]);
  const [newDestination, setNewDestination] = useState([]);
  const [newStatus, setNewStatus] = useState("");

  // Add a new status
  const handleAddStatus = () => {
    if (newStatus.trim() !== "" && !statuses.includes(newStatus.trim())) {
      setStatuses([...statuses, newStatus.trim()]);
      setNewStatus("");
    }
  };


  const handleSaveEdit = () => {
    const updatedStatuses = statuses.map((status, index) =>
      index === editingIndex ? editingValue.trim() : status
    );
    setStatuses(updatedStatuses);
    setEditingIndex(null);
    setEditingValue("");
  };
  
  return (
 <>
 <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">Lead Source</h2>
 <BackButton/>
<div className="lead-status-container mt-2">

<div className="addLeadscontainer add-status p-2 mb-2">
  <h4 className="addLeadsinput border border-black p-2 mb-2 text-white ">
    Add New Pool
  </h4>
  <input
    type="text"
    value={newStatus}
    onChange={(e) => setNewStatus(e.target.value)}
    placeholder="Pool Name"
  />
  <button onClick={handleAddStatus} className="btn btn-primary mt-2">
    Create
  </button>
</div>

<div className="bg-white p-4 rounded border border-4 border-gray">
  <h5>View Pools</h5>
  <div className=" mb-4 ">
    <PrintButton />
    <PdfButton />
    <CsvButton />
    <CopyButton />
  </div>
  <table id="table-data" className="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Pool Name</th>
        <th className="text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      {statuses.length > 0 ? (
        statuses.map((status, index) => (
          <tr key={index}>
            <td>{status}</td>
            <td className="text-center">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <EditButton />
                <DeleteButton />
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="2" >
            No data available in table
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
</div>
 </>
  );
};

export default LeadSource;
