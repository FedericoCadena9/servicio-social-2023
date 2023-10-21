import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import downloadjs from "downloadjs";

async function exportPdf(alumno) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const text = `Nombre: ${alumno.nombre}, Matrícula: ${alumno.matricula}, Estado: ${alumno.status}`;
  page.drawText(text, { x: 50, y: height - 50, font });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;

  // downloadjs(pdfBytes, `${alumno.nombre}-${alumno.matricula}.pdf`, "application/pdf");
}

module.exports = exportPdf;

