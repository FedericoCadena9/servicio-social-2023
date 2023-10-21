import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider, Select, SelectItem, Chip } from "@nextui-org/react";

export default function DocumentsModal({ isOpen, onOpenChange, onClose, selectedKeys, selectedStudents }) {

    const [isLoading, setIsLoading] = useState(false);

    console.log(selectedStudents);

    const handleConfirm = async () => {
        setIsLoading(true);  // Mostrar un indicador de carga mientras se procesa la solicitud
        try {
            const response = await axios.post(
                'https://tu-proyecto.supabase.co/rest/v1/tu-edge-function',  // La URL de tu Edge Function
                { students: selectedStudents },  // Los datos de los alumnos seleccionados
                { headers: { 'Content-Type': 'application/json' } }  // Configuración de headers
            );
            console.log(response.data);  // Imprime la respuesta en la consola
            // Aquí puedes gestionar la respuesta, por ejemplo, mostrar una notificación de éxito
        } catch (error) {
            console.error(error);  // Manejo de errores
            // Aquí puedes gestionar los errores, por ejemplo, mostrar una notificación de error
        } finally {
            setIsLoading(false);  // Ocultar el indicador de carga
        }
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
