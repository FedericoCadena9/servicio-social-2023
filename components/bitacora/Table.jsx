"use client"
import { useCallback, useState, useMemo, useEffect } from "react";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Chip
} from "@nextui-org/react";

export function TableBitacora({ columns, data }) {
    const renderCell = useCallback((user, columnKey, rowIndex) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "numero":
                return `${rowIndex + 1}`;
            case "nombreAlumno":
                return `${user.nombre} ${user.apePaterno} ${user.apeMaterno}`;
            case "solicitudSSCartaCompromiso":
                return (<Chip size="sm" color="success" variant="faded">Si</Chip>)
            case "cartaPresentacionAceptacion":
                return (<Chip size="sm" color="danger" variant="faded">No</Chip>)
            case "clavePrograma":
                return user.dependencias?.clavePrograma ? `${user.dependencias?.clavePrograma}` : '-';
            case "lugarAsignacion":
                return user.dependencias?.institucion ? `${user.dependencias?.institucion}` : '-';
            case "nombrePrograma":
                return user.dependencias?.nombrePrograma ? `${user.dependencias?.nombrePrograma}` : '-';
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            {data.map((carrera, index) => (
                <div key={index}>
                    <h1 className="mb-4 mt-8 font-semibold text-sm text-gray-500">{carrera.nombre}</h1>
                    <Table
                        aria-label={`Tabla con datos de ${carrera.nombre}`}
                        isHeaderSticky
                        classNames={{
                            wrapper: "max-h-[560px]",
                        }}
                        loadingContent={<Spinner label="Loading..." />}
                    >
                        <TableHeader columns={columns}>
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
                        <TableBody emptyContent={"No se encontró ningún dato"}>
                            {carrera.alumnos.map((item, rowIndex) => (
                                <TableRow key={item.id}>
                                    {columns.map((column) => (
                                        <TableCell key={column.uid}>
                                            {renderCell(item, column.uid, rowIndex)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ))}
        </>
    );
}
