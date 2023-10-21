"use client"
import { useState, useCallback, useEffect } from "react";
import { clientSupabase as supabase } from '../../utils/supabase';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    Button,
    TableCell, Chip,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    cn
} from "@nextui-org/react";
import {
    TrashIcon,
    EllipsisVerticalIcon,
    ClipboardDocumentListIcon,
    PencilSquareIcon
} from '@heroicons/react/24/solid';
import { columns } from "../../app/usuarios/tableData";

import DeleteUserModal from './DeleteUserModal';

export default function UsersTable({ serverUsers }) {

    const [users, setUsers] = useState(serverUsers.users);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const openModal = (userId) => {
        setSelectedUserId(userId);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const channel = supabase
            .channel('table-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'auth',
                    table: 'users',
                },
                (payload) => {
                    console.log('Change received!', { payload });
                    setUsers(payload.new);
                    console.log('new users:', users);
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel);
        }
    }, [supabase, users, setUsers])

    console.log('Users:', users);

    //Table components
    const renderCell = useCallback((user, columnKey) => {

        if (!user || !columnKey) return null;
        const cellValue = user[columnKey];

        const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

        switch (columnKey) {
            case "role":
                return (
                    <Chip className="capitalize" color={'success'} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                                <EllipsisVerticalIcon className="text-default-300" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Dropdown menu">
                            <DropdownSection title="Acciones" showDivider>
                                <DropdownItem
                                    key="copy"
                                    shortcut="⌘C"
                                    description="Copia en portapapeles el correo."
                                    startContent={<ClipboardDocumentListIcon className={cn(iconClasses, "w-6 h-6")} />}
                                >
                                    Copiar correo
                                </DropdownItem>
                                <DropdownItem
                                    key="edit"
                                    shortcut="⌘⇧E"
                                    description="Edita la información del usuario."
                                    startContent={<PencilSquareIcon className={cn(iconClasses, "w-6 h-6")} />}
                                >
                                    Editar usuario
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection title="Zona de riesgo">
                                <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    shortcut="⌘⇧D"
                                    description="Elimina el usuario."
                                    startContent={<TrashIcon className={cn(iconClasses, "text-danger w-6 h-6")} />}
                                    onClick={() => openModal(user.id)}
                                >
                                    Eliminar usuario
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                );
            default:
                return cellValue;
        }
    }, []);


    return (
        <>
            <DeleteUserModal isOpen={isModalOpen} onClose={closeModal} userId={selectedUserId} supabaseAdmin={supabase} />
            {users && columns && (
                <Table className='mt-6' aria-label="Usuarios registrados">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={users}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                // <pre>
                //     {JSON.stringify(users, null, 2)}
                // </pre>
            )}
        </>
    )
}
