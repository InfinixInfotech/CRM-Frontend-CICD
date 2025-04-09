import React, { useState } from 'react';
import { CopyButton } from '../DataButton/DataCopyButton/DataCopyButton';
import { CsvButton } from '../DataButton/DataCsvButtton/DataCsvButton';
import { PdfButton } from '../DataButton/DataPdfButton/DataPdfButton';
import { PrintButton } from '../DataButton/DataPrintButton/DataPrintButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GrMenu } from "react-icons/gr";

const ExportData = ({ tableId }) => { 
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };
  return (
    <div >
      <button
        className="text-white btn  btn-sm "
        style={{backgroundColor:"#2c3e50"}}
        // type="button"
        onClick={handleDropdownToggle}
        aria-expanded={showDropdown}
      >
        <GrMenu className='me-1'/>Export Data
      </button>

      <div
        className={` dropdown-menu ${showDropdown ? 'show' : ''}`}
        style={{ minWidth: '150px', marginTop:"4px" }}
      >
        <div className="item text-center">
          <CopyButton tableId={tableId} /> 
        </div>
        <div className="dropdown text-center">
          <CsvButton tableId={tableId} /> 
        </div>
        <div className="dropdown text-center">
          <PdfButton tableId={tableId} /> 
        </div>
        <div className="dropdown text-center">
          <PrintButton tableId={tableId} /> 
        </div>
      </div>
    </div>
  );
};

export default ExportData;
