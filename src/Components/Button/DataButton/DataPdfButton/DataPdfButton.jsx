import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import '../../DataButton/DataButton.css';

const handlePdf = (tableId) => {
  // Select the content of the table by its ID
  const content = document.getElementById(tableId);

  if (content) {
    // Use html2canvas to render the content into a canvas
    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Convert the canvas to an image

      // Initialize jsPDF and add the image to the PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
      console.log("PDF generated successfully!");
    });
  } else {
    alert("Table not found!");
  }
};

export const PdfButton = ({
  tableId = "table-data", // Default to "table-data" if no tableId is provided
  onClick = () => handlePdf(tableId),
  className = "Pdf-btn btn-primary mt-3 no-print",
}) => {
  return (
    <button
      onClick={() => handlePdf(tableId)}  // Call handlePdf with the dynamic tableId
      className={className}
    >
      Download Pdf
    </button>
  );
};
