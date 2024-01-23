import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";

const GenerateProblemsPdf = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleGeneratePdf = () => {
    const generatePdf = async () => {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([612, 792]); // US Letter size page

      // Create a font and set its size
      // const font = await pdfDoc.embedFont(PDFDocument.Fonts.Helvetica);

      // Generate 30 random addition equations
      const equations = [];
      for (let i = 0; i < 30; i++) {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        // const sum = num1 + num2;
        equations.push(`${num1} + ${num2} = ________`);
      }

      // Add equations to the PDF page
      const textSize = 12;
      const textHeight = 20;
      for (let i = 0; i < equations.length; i++) {
        const text = equations[i];
        page.drawText(text, {
          x: 50, //May have to adjust this to allow multiple problems per line.
          y: 792 - 50 - i * textHeight, //This appears to be 50px down from the previous answer + the 20px height of text so 70px gap vertically between each problem.
          size: textSize,
          // font,
          color: rgb(0, 0, 0), // Black color
        });
      }

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the generated PDF bytes
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

      // Create a URL for the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a link element to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = pdfUrl;
      downloadLink.download = "math_practice_sheet.pdf";

      // Set the PDF URL to display it in an iframe
      setPdfUrl(pdfUrl);

      // Trigger the click event on the link to start the download
      downloadLink.click();

      // Clean up the URL object to release resources
      URL.revokeObjectURL(pdfUrl);
    };

    generatePdf();
  };

  return (
    <div className="my-[50px]">
      <button id="generatePdfButton" onClick={handleGeneratePdf}>
        Generate PDF
      </button>
      <button className="bg-blue-500 px-1 py-2 font-bold rounded-full" onClick={() => pdfUrl.download()}>
        <a href={pdfUrl} download="math_practice_sheet.pdf">
          Click to download
        </a>
      </button>
      {pdfUrl && (
        <div>
          <iframe title="Generated PDF" src={pdfUrl} width="100%" height="500px"></iframe>
          <a href={pdfUrl} download="math_practice_sheet.pdf">
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default GenerateProblemsPdf;
