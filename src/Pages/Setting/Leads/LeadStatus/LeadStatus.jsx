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

  const handleSaveEdit = () => {
    const updatedStatuses = statuses.map((status, index) =>
      index === editingIndex ? editingValue.trim() : status
    );
    setStatuses(updatedStatuses);
    setEditingIndex(null);
    setEditingValue('');
  };

 
  return (
   <>
 <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">Leads Status</h2>
 <BackButton/>
    <div className="lead-status-container mt-2">
     
     <div className="addLeadscontainer add-status p-2 mb-2">
       <h4 className='addLeadsinput border border-black p-2 mb-2 text-white '>Add New Lead Status</h4>
       <input
         type="text"
         value={newStatus}
         onChange={(e) => setNewStatus(e.target.value)}
         placeholder="Enter Lead Status"
       />
       <button onClick={handleAddStatus} className='btn btn-primary mt-2'>Create</button>
     </div>

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
   </>
  );
};

export default LeadStatus;
