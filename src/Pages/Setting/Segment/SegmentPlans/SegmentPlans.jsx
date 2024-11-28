import React, { useState } from "react";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import { DeleteButton } from "../../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";

const SegmentPlans = () => {
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [isDropDown, setIsDropDown] = useState(true);
  const [status, setStatus] = useState(""); // Track selected status
  const [timePeriod, setTimePeriod] = useState(""); // Track selected status

  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Update status based on the selection
  };
  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value); 
  };

  const statusOptions = [
    { value: "StockCash", label: "Stock Cash" },
    { value: "StockOption", label: "Stock Option" },
    { value: "Gold", label: "Gold" },
  ];

  const TimePeriodOptions = [
    {value:"Monthly" , lable:"Monthly"},
    {value:"Quartely" , lable:"Quartely"},
    {value:"HalfYearly" , lable:"Half Yearly"},
    {value:"Yearly" , lable:"Yearly"},
  ];

  // Add a new status
  const handleAddStatus = () => {
    if (newStatus.trim() !== "" && !statuses.includes(newStatus.trim())) {
      setStatuses([...statuses, newStatus.trim()]);
      setNewStatus("");
    }
  };



  return (
 <>
   <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">Segment Plans</h2>
   <BackButton/>
    <div className="lead-status-container mt-2">
    
    {/* Add New Status */}
    <div className="addLeadscontainer add-status p-2 mb-2">
      <h4 className="addLeadsinput border border-black p-2 mb-2 text-white ">
        Add New Plans
      </h4>
     
  <div className="d-flex">


{isDropDown && (
      <div className="dropdown-content-Status ">
        <select
          value={status}
          onChange={handleStatusChange}
          name="status"
          id="status-dropdown"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )}


    {isDropDown && (
      <div className="dropdown-content-TimePeriod ms-3">
        <select
          value={timePeriod}
          onChange={handleTimePeriodChange}
          name="timePeriod"
          id="timePeriod-dropdown"
        >
          {TimePeriodOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.lable}
            </option>
          ))}
        </select>
      </div>
    )}

    {status && <p>Selected status: {timePeriod}</p>}
  
      <input
        type="text"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        placeholder="      Amount (in INR)"
        className="ms-3"
      />
      <button onClick={handleAddStatus} className="btn btn-primary">
        Create
      </button>
    </div>

    </div>
   
    <div className="bg-white p-4 rounded border border-4 border-gray">
      <h5>View Plans</h5>
      <div className=" mb-4 ">
        <PrintButton />
        <PdfButton />
        <CsvButton />
        <CopyButton />
      </div>
      <table id="table-data" className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Segment Name</th>
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
              <td colSpan="2">No data available in table</td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  </div>
 </>
  );
};

export default SegmentPlans;
