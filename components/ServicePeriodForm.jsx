'use client'
import { useState, useEffect } from 'react';
import { clientSupabase as supabase } from '../utils/supabase';
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export const ServicePeriodForm = () => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    useEffect(() => {
        // Función para obtener los periodos de la base de datos de Supabase
        async function getPeriodos() {
            const { data, error } = await supabase
                .from('periodos_servicio_social')
                .select('*')
                .single();

            if (error) {
                console.error('Error al obtener los periodos:', error);
            } else if (data) {
                setFechaInicio(data.fecha_inicio);
                setFechaFin(data.fecha_fin);
            }
        }

        getPeriodos();
    }, []);

    // Manejador para el cambio de la fecha de inicio
    const handleFechaInicioChange = (e) => {
        setFechaInicio(e.target.value);
    };

    // Manejador para cuando la fecha de inicio pierde el foco
    const handleFechaInicioBlur = () => {
        const inicio = new Date(fechaInicio);
        const fin = new Date(inicio.setMonth(inicio.getMonth() + 6));
        setFechaFin(fin.toISOString().split('T')[0]); // Formato YYYY-MM-DD
    };

    // Manejador para el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('periodos_servicio_social')
            .upsert([
                { fecha_inicio: fechaInicio, fecha_fin: fechaFin }
            ]).select();

        if (error) {
            console.error('Error al insertar en Supabase:', error);
        } else {
            console.log('Periodo de servicio social añadido:', data);
            // Aquí puedes manejar una redirección o un mensaje de éxito
        }
    };

    return (
        <div className='mb-8'>
            <form onSubmit={handleSubmit} className='flex gap-3 items-center'>
                <Input
                    className='w-40'
                    type="date"
                    value={fechaInicio}
                    onChange={handleFechaInicioChange}
                    onBlur={handleFechaInicioBlur}
                />
                <Input
                    className='w-40'
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    readOnly // Esto hace que el campo no sea editable
                />

                <Button color="primary" className='w-40' type="submit">Guardar Periodo</Button>
            </form>
        </div>
    );
};