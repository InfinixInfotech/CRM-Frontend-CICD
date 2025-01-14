import React, { useState } from 'react';
import { CopyButton } from '../DataButton/DataCopyButton/DataCopyButton';
import { CsvButton } from '../DataButton/DataCsvButtton/DataCsvButton';
import { PdfButton } from '../DataButton/DataPdfButton/DataPdfButton';
import { PrintButton } from '../DataButton/DataPrintButton/DataPrintButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExportData = ({ tableId }) => { // Accept tableId as a prop
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle dropdown visibility
  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="dropdown">
      {/* Main button to open dropdown */}
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        onClick={handleDropdownToggle}
        aria-expanded={showDropdown}
      >
        Export Data
      </button>

      {/* Dropdown Menu */}
      <div
        className={`dropdown-menu ${showDropdown ? 'show' : ''}`}
        style={{ minWidth: '200px' }}
      >
        <div className="dropdown-item">
          <CopyButton tableId={tableId} /> {/* Pass tableId */}
        </div>
        <div className="dropdown-item">
          <CsvButton tableId={tableId} /> {/* Pass tableId */}
        </div>
        <div className="dropdown-item">
          <PdfButton tableId={tableId} /> {/* Pass tableId */}
        </div>
        <div className="dropdown-item">
          <PrintButton tableId={tableId} /> {/* Pass tableId */}
        </div>
      </div>
    </div>
  );
};

export default ExportData;
