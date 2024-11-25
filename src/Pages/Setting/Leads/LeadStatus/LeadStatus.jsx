import React, { useState } from 'react';
import { EditButton } from '../../../../Components/Button/EditButton/EditButton';
import { DeleteButton } from '../../../../Components/Button/DeleteButton/DeleteButton';
import './LeadStatus.css'
import BackButton from '../../../../Components/Button/BackButton/BackButton';
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";

const LeadStatus = () => {
  const [statuses, setStatuses] = useState([
    'BUSY',
    'FUTURE FOLLOWUP',
    'INTERESTED',
    'NOT INTERESTED',
    'NOT REACHABLE',
    'NPC',
    'Paid Client',
    'SWITCH OFF',
  ]);
  const [newStatus, setNewStatus] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  // Add a new status
  const handleAddStatus = () => {
    if (newStatus.trim() !== '' && !statuses.includes(newStatus.trim())) {
      setStatuses([...statuses, newStatus.trim()]);
      setNewStatus('');
    }
  };

  // // Delete a status
  // const handleDeleteStatus = (index) => {
  //   const updatedStatuses = statuses.filter((_, i) => i !== index);
  //   setStatuses(updatedStatuses);
  // };

  // // Start editing a status
  // const handleEditStatus = (index) => {
  //   setEditingIndex(index);
  //   setEditingValue(statuses[index]);
  // };

  // Save the edited status
  const handleSaveEdit = () => {
    const updatedStatuses = statuses.map((status, index) =>
      index === editingIndex ? editingValue.trim() : status
    );
    setStatuses(updatedStatuses);
    setEditingIndex(null);
    setEditingValue('');
  };

  return (
    <div className="lead-status-container mt-5">
        <BackButton/>
      <h2 className='bg-white p-2 border border-gray border-2 rounded mt-2'>Lead Status</h2>
      

      {/* Add New Status */}
      <div className="addLeadscontainer add-status p-2 mb-2">
        <h4 className='addLeadsinput border border-black p-2 mb-2 text-white '>Add New Lead Status</h4>
        <input
          type="text"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          placeholder="Enter Lead Status"
        />
        <button onClick={handleAddStatus} className='btn btn-primary'>Create</button>
      </div>
      {/* View and Manage Statuses */}
      {/* <table border="1" className="status-table">
        <thead>
          <tr>
            <th>Status Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status, index) => (
            <tr key={index}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                  />
                ) : (
                  status
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <button onClick={handleSaveEdit}>Save</button>
                ) : (
                 <div> <EditButton /></div>
                )}
                 <div> <DeleteButton/></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
   <div className='bg-white p-4 rounded border border-4 border-gray'>
   <h5>View Lead Status</h5>
     <div className=" mb-4 ">
                
                <PrintButton />
                <PdfButton />
                <CsvButton />
                <CopyButton />
                </div>  
      <table  id="table-data" className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Lead Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {statuses.map((status, index) => (
                        <tr key={index}>
                            <td >{status}</td>
                            <td className="text-center" >
                                <div className="d-flex justify-content-center align-items-center gap-2 ">
                                    <EditButton />
                                    <DeleteButton />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
   </div>
    </div>
  );
};

export default LeadStatus;
