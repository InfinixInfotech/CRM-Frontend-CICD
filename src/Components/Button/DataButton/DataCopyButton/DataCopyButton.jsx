import React from 'react';
import { FaCopy } from "react-icons/fa";

const handleCopy = (tableId) => {
  // Get the table data by its ID
  const table = document.getElementById(tableId);

  if (!table) {
    console.error(`Table with id '${tableId}' not found.`);
    alert(`Table with id '${tableId}' not found.`);
    return;
  }

  // Get all the rows of the table
  const rows = table.querySelectorAll("tr");

  // Prepare an array to store the copied content
  let copiedContent = "";

  // Loop through each row and prepare the content
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td, th");
    const rowData = Array.from(cells)
      .map(cell => cell.textContent)
      .join("\t"); 
    copiedContent += rowData + "\n"; 
  });

  // Copy the content to the clipboard
  navigator.clipboard.writeText(copiedContent)
    .then(() => {
      console.log("Table data copied to clipboard!");
      alert("Table data copied to clipboard!"); 
    })
    .catch((err) => {
      console.error("Failed to copy table data: ", err);
      alert("Failed to copy table data");
    });
};

export const CopyButton = ({
  tableId = "table-data", 
  onClick = () => handleCopy(tableId),
  className = "btn dataCopyButton btn-sm px-2 py-0 me-1 mt-3 no-print text-center",

}) => {
  return (
    <button
      onClick={() => handleCopy(tableId)} 
      className={className}
      style={{ fontWeight: "500", borderRadius: "0", backgroundColor: "none", fontSize:"18px" }}
    >
      <FaCopy className="me-2 fs-5 colorful-icon text-secondary" />
      Copy
    </button>
  );
};