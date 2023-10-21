import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';

const DeleteUserModal = ({ isOpen, onClose, userId, supabaseAdmin }) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleDeleteUser();;
        }
    };

    const handleDeleteUser = async () => {
        const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);
        console.log(`Usuario eliminado: ${userId}`);

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
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
