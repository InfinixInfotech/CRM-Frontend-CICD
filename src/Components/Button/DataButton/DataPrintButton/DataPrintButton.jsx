import React from "react";

const handlePrint = () => {
  // Get the table element by its ID
  const tableContent = document.getElementById("table-data").outerHTML;
  const printWindow = window.open( " ", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Table</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f8d7da;
          }
        </style>
      </head>
      <body>
        ${tableContent}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.print();
};

export const PrintButton = ({
  onClick = handlePrint,
  className = "Print-btn btn-primary mt-3 no-print",
}) => {
  return (
    <button onClick={onClick} className={className}>
      Print Table
    </button>
  );
};