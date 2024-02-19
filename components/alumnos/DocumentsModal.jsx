import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider, Select, SelectItem, Chip } from "@nextui-org/react";
import { CartaCompromisoDeServicioSocial } from "../plantillas/CartaCompromisoDeServicioSocial";
import { CartaDeAceptacion } from '../plantillas/CartaDeAceptacion'
import { CartaDePresentacion } from '../plantillas/CartaDePresentacion'
import { FormatoAutoevaluacion } from '../plantillas/FormatoAutoevaluacion'
import { FormatoEvaluacion } from '../plantillas/FormatoEvaluacion'
import { InformeTrimestral } from '../plantillas/InformeTrimestral'
import { SolicitudDeServicioSocial } from "../plantillas/SolicitudDeServicioSocial";

import html2pdf from 'html2pdf.js';
import ReactDOMServer from 'react-dom/server';

const templates = [
    CartaCompromisoDeServicioSocial,
    CartaDeAceptacion,
    CartaDePresentacion,
    FormatoAutoevaluacion,
    FormatoEvaluacion,
    InformeTrimestral,
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
        const pdfBase64 = await blobToBase64(pdfBlob);
        return pdfBase64.split(',')[1];
    };

    const handleConfirm = async () => {
        setIsLoading(true);

        for (let student of selectedStudents) {
            console.log(student);
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
                        <p className="text-gray-800">{`Has seleccionado ${selectedKeys} alumnos.`}</p>
                        <ul>
                            {selectedStudents.map((student, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <p className="text-gray-800">
                                        Nombre: {' '}
                                        <span className="text-gray-500">
                                        {`${student.nombre} ${student.apePaterno} ${student.apeMaterno} - ${student.matricula}`}
                                        </span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={onClose}>Cancelar</Button>
                        <Button onPress={handleConfirm} color="primary" className="bg-emerald-500" isLoading={isLoading}> Confirmar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
