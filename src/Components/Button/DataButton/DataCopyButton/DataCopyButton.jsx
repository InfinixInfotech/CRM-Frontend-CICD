import React from 'react';

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
      .map(cell => cell.textContent.trim()) // Get the text content from each cell
      .join("\t"); // Join cells with tab for separation (to mimic CSV)
    copiedContent += rowData + "\n"; // Add a new line after each row
  });

  // Copy the content to the clipboard
  navigator.clipboard.writeText(copiedContent)
    .then(() => {
      console.log("Table data copied to clipboard!");
      alert("Table data copied to clipboard!"); // Show success message
    })
    .catch((err) => {
      console.error("Failed to copy table data: ", err);
      alert("Failed to copy table data");
    });
};

export const CopyButton = ({
  tableId = "table-data", // Default to "table-data" if no tableId is provided
  onClick = () => handleCopy(tableId),
  className = "Copy-btn btn-primary mt-3 no-print",
}) => {
  return (
    <button
      onClick={() => handleCopy(tableId)} // Call handleCopy with the dynamic tableId
      className={className}
    >
      Copy to Clipboard
    </button>
  );
};
