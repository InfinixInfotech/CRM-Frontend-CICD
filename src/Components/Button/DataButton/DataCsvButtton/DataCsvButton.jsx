import React from 'react';
import { FaFileCsv } from "react-icons/fa";


const handleCsv = (tableId) => {
  // Get the table data using the provided table ID
  const table = document.querySelector(`#${tableId}`);
  
  if (table) {
    const rows = table.querySelectorAll("tr");

    // Prepare an array to store CSV data
    let csvContent = "";

    // Loop through each row
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td, th");
      const rowData = Array.from(cells)
        .map(cell => cell.textContent) // Get the text content from each cell
        .join(","); // Join them with commas
      csvContent += rowData + "\n"; // Add a new line after each row
    });

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create an anchor tag to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "table_data.csv"; // Specify the download file name
    link.click(); // Trigger the download
  } else {
    alert("Table not found!");
  }
};

export const CsvButton = ({
  tableId = "table-data", // Default to "table-data" if no tableId is provided
  onClick = () => handleCsv(tableId),
  className = "btn dataCopyButton  btn-sm px-2 py-0  me-1 mt-3 no-print ",
}) => {
  return (
    <button
      onClick={() => handleCsv(tableId)} // Call handleCsv with the dynamic tableId
      className={className}
      style={{fontWeight:"600" ,borderRadius: "0" , backgroundColor: "none", fontSize:"18px"}}
    >
      <FaFileCsv className="me-3 fs-5 colorful-icon text-secondary" />
      Csv
    </button>
  );
};