const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");
const random = require("random");

// Create a new PDF document
const pdfDoc = await PDFDocument.create();
const page = pdfDoc.addPage([612, 792]); // US Letter size page

// Create a font and set its size
const font = await pdfDoc.embedFont(PDFDocument.Fonts.Helvetica);

// Generate 30 random addition equations
const equations = [];
for (let i = 0; i < 30; i++) {
  const num1 = random.int(1, 20);
  const num2 = random.int(1, 20);
  const sum = num1 + num2;
  equations.push(`${num1} + ${num2} = ________`);
}

// Add equations to the PDF page
const textSize = 12;
const textHeight = 20;
for (let i = 0; i < equations.length; i++) {
  const text = equations[i];
  page.drawText(text, {
    x: 50,
    y: 792 - 50 - i * textHeight,
    size: textSize,
    font,
    color: rgb(0, 0, 0), // Black color
  });
}

// Serialize the PDF to bytes
const pdfBytes = await pdfDoc.save();

// Write the PDF to a file
fs.writeFileSync("math_practice_sheet.pdf", pdfBytes);
