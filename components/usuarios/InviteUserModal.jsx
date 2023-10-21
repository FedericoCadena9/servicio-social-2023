"use client"
import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { EnvelopeIcon } from "@heroicons/react/20/solid";

import supabase from '@/utils/supabase';


export function InviteUserModal() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validationState, setValidationState] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendInvite();
        }
    };

    const sendInvite = async () => {
        // Verificar si el correo tiene el dominio correcto
        // if (!email.endsWith('@iteshu.edu.mx')) {
        //     setValidationState('invalid');
        //     setErrorMessage('El dominio del correo debe ser @iteshu.edu.mx');
        //     return;
        // }
    
        setIsLoading(true);
        const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
        setIsLoading(false);
    
        if (error) {
            setValidationState('invalid');
            setErrorMessage('Error al enviar la invitación');
            console.log('Error sending invite:', error);
        } else {
            setValidationState(null);
            setErrorMessage('');
            onOpenChange(false);
        }
    };
    
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color="primary" endContent={<EnvelopeIcon className="w-5 h-5" />}>Invitar Usuario</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Invitar usuario</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    endContent={<EnvelopeIcon className="w-6 h-6 text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                    label="Correo"
                                    placeholder="Ingresar correo con @iteshu.edu.mx"
                                    variant="bordered"
                                    validationState={validationState}
                                    errorMessage={errorMessage}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onPress={sendInvite} isLoading={isLoading}>
                                    Enviar invitación
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
