import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { supabase } from "../../utils/supabase";

export default function DeleteModal({ isOpen, onOpenChange, dependencyId }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const { error } = await supabase
                .from('dependencias')
                .delete()
                .match({ id: dependencyId });

            if (error) throw error;

            onOpenChange(false);
        } catch (error) {
            console.error('Error al eliminar la dependencia: ', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Eliminar Dependencia</ModalHeader>
                        <ModalBody>
                            <p className="text-gray-700">¿Está seguro de que desea eliminar la dependencia seleccionada? Esta acción no se puede deshacer.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button variant="solid" color="danger" isLoading={isDeleting} onPress={handleDelete}>
                                {isDeleting ? 'Eliminando...' : 'Eliminar'}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}