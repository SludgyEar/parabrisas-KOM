import jsPdf from 'jspdf';

function addFooter(doc, margin, pageWidth, pageHeight, auth) {
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        // Selecciona la página actual
        doc.setPage(i);

        // Configura la fuente y color para el footer
        doc.setFontSize(10);
        doc.setTextColor(100);

        // Dibuja una línea divisoria en la parte inferior de la página
        doc.setDrawColor(200);
        doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

        // Texto alineado a la izquierda: fecha de generación
        doc.text(`Generado el ${new Date().toLocaleDateString()}`, margin, pageHeight - 10);

        // Texto centrado: número de página
        const pageText = `Página ${i} de ${pageCount}`;
        const pageTextWidth = doc.getStringUnitWidth(pageText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(pageText, (pageWidth - pageTextWidth) / 2, pageHeight - 10);

        // Texto alineado a la derecha: información del usuario
        const userRole = auth.user.PERFIL_USR === 'C' ? "Administrador" : "Recepcionista";
        const userText = `Por: ${auth.user.CORREO_USR} - ${userRole}`;
        const textWidth = doc.getStringUnitWidth(userText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(userText, pageWidth - margin - textWidth, pageHeight - 10);
    }
}


export function exportPdf(divElement, auth) { // Recibe el id del elemento div
    const doc = new jsPdf();
    const element = document.getElementById(divElement);


    doc.html(element, {
        callback: function (pdf) {
            addFooter(pdf, 15, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), auth);
            pdf.save('ReporteVentas.pdf')
        },
        x: 15,
        y: 0,
        html2canvas : { scale: 0.16 }
    });
}