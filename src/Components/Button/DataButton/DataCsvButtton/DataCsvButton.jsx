import React from 'react'


const handleCsv = () => {
    // Get the table data (you can adjust this to get the specific table or data you need)
    const table = document.querySelector("#table-data");
    const rows = table.querySelectorAll("tr");
  
    // Prepare an array to store CSV data
    let csvContent = "";
  
    // Loop through each row
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td, th");
      const rowData = Array.from(cells)
        .map(cell => cell.textContent.trim()) // Get the text content from each cell
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
  };
  
export const CsvButton = ({
    onClick = handleCsv,
    className="Csv-btn btn-primary mt-3 no-print", 
})=>{

    return(
    <button 
    onClick={onClick}
    className={className}
    >
      Download Csv
    </button>

    )
}