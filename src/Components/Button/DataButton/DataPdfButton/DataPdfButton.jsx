import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react'
import '../../DataButton/DataButton.css'



const handlePdf = () => {
    // Select the content you want to include in the PDF
    const content = document.getElementById("table-data"); // Adjust the selector to match your specific content
  
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
  };

export const PdfButton = ({
    onClick = handlePdf,
    className="Pdf-btn btn-primary mt-3 no-print", 
})=>{

    return(
    <button 
    onClick={onClick}
    className={className}
    >
      Download Pdf
    </button>

    )
}