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
        designationName : newDesignation,
        designationTarget : newTarget,
      }

      setDesignation([...designation, newaddDesignation]);
      setNewTarget("");
      setNewDesignation("")
    }
  };

  return (
    <>
     <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">Designation</h2>
     <BackButton/>
    <div className="lead-status-container mt-2">
     

     {/* Add New Status */}
     <div className="addLeadscontainer add-status p-2 mb-2">
       <h4 className="addLeadsinput border border-black p-2 mb-2 text-white ">
         Add New Designation
       </h4>
 
<div
 style={{
   display: "grid",
   gridTemplateColumns: "1fr 1fr auto", 
   gap: "20px", 
   alignItems: "center", 
   maxWidth: "600px", 
   margin: "0 auto", 
 }}
>


<input
   type="text"
   value={newDesignation}
   onChange={(e) => setNewDesignation(e.target.value)}
   placeholder="Designation Name"
   style={{ padding: "10px", width: "100%" }} 
 />

 
 <input
   type="text"
   value={newTarget}
   onChange={(e) => setNewTarget(e.target.value)}
   placeholder="Designation Target"
   style={{ padding: "10px", width: "100%" }} 
 />
 

 <button
   onClick={handleAddTarget}
   className="btn btn-primary"
   style={{ padding: "10px" }} 
 >
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
       <table id="table-data" className="table table-bordered table-striped">
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

export default Designation;
