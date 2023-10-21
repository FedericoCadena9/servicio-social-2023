"use client"
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider, Select, SelectItem, Chip } from "@nextui-org/react";
import { supabase } from "../../utils/supabase";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/20/solid";

export default function DependenciesModal({ isOpen, onOpenChange, selectedStudents = [] }) {

    const [dependencias, setDependencias] = useState([]);
    const [selectedDependency, setSelectedDependency] = useState(null);

    const student = selectedStudents && selectedStudents.length > 0 ? selectedStudents[0] : null;
    const { id, nombre, apePaterno, apeMaterno } = student || {};

    useEffect(() => {
        const getDependencies = async () => {
            let { data } = await supabase.from('dependencias').select('id, nombrePrograma');
            setDependencias(data);
        };

        getDependencies();
    }, []);

    const handleSave = async () => {
        console.log(selectedDependency, id);

        if (selectedDependency && id) {
            const { data, error } = await supabase
                .from('alumnos')
                .update({ dependenciaId: selectedDependency })
                .eq('id', id)
                .select();

            if (error) {
                console.error("Error updating student's dependency:", error);
            } else if (data) {
                onOpenChange(false);
            }
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-gray-700">Asignar dependencia</ModalHeader>
                            <ModalBody>
                                <p className="text-center text-lg font-medium text-gray-800">Al alumno: {' '}
                                    <span className="text-gray-400">
                                        {nombre} {apePaterno} {apeMaterno}
                                    </span>
                                </p>
                                <p className="text-center text-emerald-500">Se asignara la dependencia:</p>
                                <div className="flex items-center justify-center">
                                    <Divider className="my-2 w-48 bg-gradient-to-r from-gray-300 to-gray-100" />
                                    <Chip
                                        radius="sm"
                                        variant="shadow"
                                        color="success"
                                    >
                                        <ArrowPathRoundedSquareIcon className="w-5 h-5 text-white" />
                                    </Chip>
                                    <Divider className="my-2 w-48 bg-gradient-to-l from-gray-300 to-gray-100" />
                                </div>
                                <Select
                                    aria-label="Seleccionar una dependencia"
                                    items={dependencias}
                                    placeholder="Seleccionar una dependencia"
                                    size="sm"
                                    className="max-w-full"
                                    onChange={(event) => {
                                        setSelectedDependency(event.target.value);
                                    }}
                                >
                                    {({ id, nombrePrograma, index }) => <SelectItem aria-label="Dependencia" key={index} value={id}>{nombrePrograma}</SelectItem>}
                                </Select>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={handleSave}>
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
