import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider, Select, SelectItem, Chip } from "@nextui-org/react";
import { CartaCompromisoDeServicioSocial } from "../plantillas/CartaCompromisoDeServicioSocial";
import { SolicitudDeServicioSocial } from "../plantillas/SolicitudDeServicioSocial";
import html2pdf from 'html2pdf.js';
import ReactDOMServer from 'react-dom/server';
import { blobToBase64 } from '../../utils/blobToBase64';

const templates = [
    CartaCompromisoDeServicioSocial,
    SolicitudDeServicioSocial
];

export default function DocumentsModal({ isOpen, onOpenChange, onClose, selectedKeys, selectedStudents }) {

    const [isLoading, setIsLoading] = useState(false);

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const generatePdf = async (element) => {
        const htmlString = ReactDOMServer.renderToString(element);

        const pdfOptions = {
            margin: 0,
            filename: 'documento.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
        };

        const pdfBlob = await html2pdf().from(htmlString).set(pdfOptions).outputPdf('blob');
        const pdfBase64 = await blobToBase64(pdfBlob);  // Convierte Blob a base64
        return pdfBase64.split(',')[1];  // Elimina la parte 'data:application/pdf;base64,' del resultado
    };

    const handleConfirm = async () => {
        setIsLoading(true);

        for (let student of selectedStudents) {
            const attachments = [];
            for (let Document of templates) {
                const element = <Document alumno={student} />;
                const pdfBase64 = await generatePdf(element);
                const attachment = {
                    filename: `${student.matricula}_${Document.name}.pdf`,
                    content: pdfBase64
                };
                attachments.push(attachment);
            }
            student.attachments = attachments;
            console.log(student);
            await sendEmail(student);
        }

        setIsLoading(false);
    };

    const sendEmail = async (student) => {
        const response = await fetch('/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student),
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader>Generar documento</ModalHeader>
                    <ModalBody>
                        <p>{`Has seleccionado ${selectedKeys} alumnos.`}</p>
                        <ul>
                            {selectedStudents.map((student, index) => (
                                <li key={index}>
                                    {`Nombre: ${student.nombre}, Matrícula: ${student.matricula}, Estado: ${student.status}`}
                                </li>
                            ))}
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={onClose}>Cancelar</Button>
                        <Button onPress={handleConfirm} color="primary" isLoading={isLoading}> Confirmar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
