import React from 'react'


const handleCopy = () => {
    // Get the table data by ID (adjust to match your specific table ID)
    const table = document.querySelector("#table-data");
    
    if (!table) {
      console.error("Table with id 'table-data' not found.");
      return;
    }
    
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
    onClick = handleCopy,
    className="Copy-btn btn-primary mt-3 no-print", 
})=>{

    return(
    <button 
    onClick={onClick}
    className={className}
    >
      Copy Clipbord
    </button>

    )
}