"use client"
import React, { useCallback, useState, useMemo, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    useDisclosure,
    Pagination,
    Spinner,
    Tooltip
} from "@nextui-org/react";

import {
    PlusIcon, TrashIcon, MagnifyingGlassIcon, ChevronDownIcon, PencilSquareIcon
} from "@heroicons/react/20/solid";
import { capitalize } from "../../app/utils";
import NewDependencyModal from "./NewDependencyModal";
import DeleteModal from "./DeleteModal";
import { clientSupabase as supabase } from "../../utils/supabase";
import { useRouter } from "next/navigation";

export function TableComponent({ data, type, columns, initialValues, statusMap, statusOptions }) {

    const router = useRouter();
    useEffect(() => {
        const channel = supabase.channel('realtime dependencias')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'dependencias' },
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
    const deleteDisclosure = useDisclosure();

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "nombre",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);
    const [currentDependencyId, setCurrentDependencyId] = useState(null);
    const [editingDependency, setEditingDependency] = useState(null);

    const handleOpenDeleteModal = (dependencyId) => {
        setCurrentDependencyId(dependencyId);
        deleteDisclosure.onOpen();
    };

    const handleModalClose = () => {
        setEditingDependency(null); 
        dependenciesDisclosure.onClose();
    };


    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredDependencies = [...data];

        const hasSearchFilter = filterValue !== "" && filterValue !== null;
        if (hasSearchFilter) {
            const searchFilterLower = filterValue.toLowerCase();

            filteredDependencies = filteredDependencies.filter((dependency) =>
                dependency.nombrePrograma && dependency.nombrePrograma.toLowerCase().includes(searchFilterLower),
            );
        }

        return filteredDependencies;
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

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-center items-center gap-2">
                        <Tooltip color="default" content="Editar dependencia" placement="left-start">
                            <span className="text-lg text-default cursor-pointer active:opacity-50" onClick={() => {
                                setEditingDependency(user);
                                dependenciesDisclosure.onOpen();
                            }}>
                                <PencilSquareIcon className="w-5 h-5" />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Eliminar dependencia" placement="left-start">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleOpenDeleteModal(user.id)}>
                                <TrashIcon className="w-5 h-5" />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [handleOpenDeleteModal]);

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
                        placeholder={type === "alumnos" ? "Buscar por matricula" : "Buscar por nombre de Programa"}
                        startContent={<MagnifyingGlassIcon className="w-4 h-4" />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Button color="primary" onPress={() => {  setEditingDependency(null); dependenciesDisclosure.onOpen(); }} endContent={<PlusIcon className="w-5 h-5" />}>Agregar Dependencia</Button>
                        {/* <Dropdown>
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
                        </Dropdown> */}
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
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
                    <span className="text-default-400 text-small">{data.length} {type}</span>
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

            <NewDependencyModal
                isOpen={dependenciesDisclosure.isOpen}
                onOpenChange={dependenciesDisclosure.onOpenChange}
                onClose={handleModalClose}
                editData={editingDependency}
            />

            <DeleteModal
                isOpen={deleteDisclosure.isOpen}
                onOpenChange={deleteDisclosure.onOpenChange}
                onClose={deleteDisclosure.onClose}
                dependencyId={currentDependencyId}
            />
        </>
    );
}
