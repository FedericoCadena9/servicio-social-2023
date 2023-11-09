"use client"
import React, { useCallback, useState, useMemo, useEffect } from "react";
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableColumn,
    Tooltip,
    useDisclosure
} from "@nextui-org/react";

import {
    PlusIcon, EllipsisVerticalIcon, MagnifyingGlassIcon, ChevronDownIcon
} from "@heroicons/react/20/solid";
import { capitalize } from "../../app/utils";
import DependenciesModal from "./DependenciesModal";
import DocumentsModal from "./DocumentsModal";

import { clientSupabase as supabase } from "../../utils/supabase";
import { useRouter } from "next/navigation";


export function AlumnosTable({ data, columns, initialValues, statusColorMap, statusOptions }) {

    const router = useRouter();
    useEffect(() => {
        const channel = supabase.channel('realtime alumnos')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'alumnos' },
                (payload) => {
                    router.refresh();
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, router])

    const INITIAL_VISIBLE_COLUMNS = initialValues;

    const dependenciesDisclosure = useDisclosure();
    const documentsDisclosure = useDisclosure();

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState([statusOptions[0].uid, statusOptions[2].uid]);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "nombre",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...data];

        const hasSearchFilter = filterValue !== "" && filterValue !== null;
        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.matricula.toString().startsWith(filterValue),
            );
        }

        const hasStatusFilter = statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length
        if (hasStatusFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
        }

        return filteredUsers;
    }, [data, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const formatStatus = (status) => {
        // Dividir el string en palabras separadas por mayúsculas
        const words = status.split(/(?=[A-Z])/).map(word => word.toLowerCase());

        // Unir las palabras con un espacio y capitalizar la primera letra de cada palabra
        const formattedStatus = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return formattedStatus;
    };

    const showSelectedStudents = useCallback(() => {
        const selectedKeysArray = Array.from(selectedKeys).map(Number);
        const selected = filteredItems.filter(user => selectedKeysArray.includes(user.id));

        setSelectedStudents(selected);
    }, [selectedKeys, filteredItems]);

    
    const handleUserModal = (user) => {
        // Crear un nuevo objeto con solo los campos necesarios
        const selectedUser = {
            id: user.id,
            nombre: user.nombre,
            apePaterno: user.apePaterno,
            apeMaterno: user.apeMaterno
        };

        dependenciesDisclosure.onOpen();
        setSelectedStudents([selectedUser]);
    };

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "status":
                return (
                    <Chip className="capitalize text-xs w-40" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {formatStatus(cellValue)}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        <Tooltip content="Asignar dependencia" placement={"left-start"}>
                            <Button onPress={() => handleUserModal(user)} isIconOnly color="default" aria-label="Asignar" variant="flat" size="sm" radius="full">
                                <PlusIcon className="w-4 h-4 text-gray-500" />
                            </Button>
                        </Tooltip>
                    </div>
                );
            case "dependenciaId":
                return user.dependencias ? user.dependencias.clavePrograma : '-';
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder={"Buscar por matricula"}
                        startContent={<MagnifyingGlassIcon className="w-4 h-4" />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        {selectedKeys.size > 0 && (
                            <Button color="primary" onPress={() => { showSelectedStudents(); documentsDisclosure.onOpen(); }} endContent={<PlusIcon className="w-5 h-5" />}>Generar documentos</Button>
                        )}
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="w-5 h-5" />} variant="flat">
                                    Estatus
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="w-5 h-5" />} variant="flat">
                                    Columnas
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">{data.length} alumnos</span>
                    <label className="flex items-center text-default-400 text-small">
                        Filas por página:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        selectedKeys,
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        data.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "Todos los elementos seleccionados"
                        : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Anterior
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Siguente
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <>
            <Table
                aria-label="Tabla con datos"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "max-h-[560px]",
                }}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
                loadingContent={<Spinner label="Loading..." />}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No se encontró ningún dato"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <DependenciesModal
                isOpen={dependenciesDisclosure.isOpen}
                onOpenChange={dependenciesDisclosure.onOpenChange}
                onClose={dependenciesDisclosure.onClose}
                selectedStudents={selectedStudents}
            />

            <DocumentsModal
                isOpen={documentsDisclosure.isOpen}
                onOpenChange={documentsDisclosure.onOpenChange}
                onClose={documentsDisclosure.onClose}
                selectedKeys={selectedKeys.size}
                selectedStudents={selectedStudents}
            />
        </>
    );
}
