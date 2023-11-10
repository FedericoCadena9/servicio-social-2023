import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { supabase } from "../../utils/supabase";

const DeleteUserModal = ({ isOpen, onOpenChange, userId }) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleDeleteUser();;
        }
    };

    const handleDeleteUser = async () => {
        const { data, error } = await supabase.auth.admin.deleteUser(userId);

        if (error) {
            console.error('Error al eliminar usuario:', error);
        } else {
            console.log(`Usuario eliminado: ${userId}`);
            onOpenChange(false);
        }
    };


    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent onKeyDown={handleKeyDown}>
                {(onClose) => (
                    <>
                        <ModalHeader>¿Eliminar usuario?</ModalHeader>
                        <ModalBody>¿Estás seguro de que quieres eliminar este usuario?
                            No podrás deshacer esta acción.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color="danger" onPress={handleDeleteUser}>
                                Eliminar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default DeleteUserModal;
