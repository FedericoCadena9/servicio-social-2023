'use client'
import Image from 'next/image';
import { clientSupabase as supabase } from '../../utils/supabase';
import { useEffect, useState } from "react";

export const CartaDePresentacion = ({ alumno }) => {

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

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    //Periodos
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaInicioFormat = new Date(fechaInicio).toLocaleDateString('es-MX', options);
    const fechaFinFormat = new Date(fechaFin).toLocaleDateString('es-MX', options);

    // Usar el número del mes para obtener el nombre
    const monthName = months[month];

    return (
        <div className="w-[215.9mm] h-[279.4mm] bg-white border-1 border-gray-200 box-border m-auto px-20 py-4 relative">
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <div className='relative h-20 w-40'>
                        <Image
                            src="/assets/img/educacionLogo.png"
                            alt="Educacion Logo"
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <span className='h-10 w-0.5 bg-[#802645]'></span>
                    <div className='relative h-14 w-28'>
                        <Image
                            src="/assets/img/tecnologicoNacionalLogo.svg"
                            alt="Tecnologico Nacional Mexico Logo"
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <span className='h-10 w-0.5 bg-[#802645]'></span>
                    <div className='relative h-14 w-28'>
                        <Image
                            src="/assets/img/iteshuLogo.png"
                            alt="ITESHU Logo"
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <span className='h-10 w-0.5 bg-[#802645]'></span>
                    <div className='relative h-24 w-48'>
                        <Image
                            src="/assets/img/hidalgoLogo.jpg"
                            alt="Hidalgo Logo"
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </div>
                <span className='text-xs text-gray-700 font-medium'>Instituto Tecnológico Superior de Huichapan</span>
            </div>

            <div>
                <div className="my-8 flex flex-col gap-8">
                    <p className='text-end'>El Saucillo, Huichapan, Hgo., a {day}/{monthName}/{year}</p>
                    <h1 className='font-semibold text-center'>CARTA DE PRESENTACIÓN DE SERVICIO SOCIAL</h1>
                </div>

                <div className='font-semibold text-sm'>
                    <p>Lic. Alba Mendoza Montaño</p>
                    <p>Secretaria del Departamento de Residencias</p>
                    <p>Profesionales y Servicio Social de ITESHU</p>
                    <p>Instituto Tecnológico Superior de Huichapan</p>
                    <p className='uppercase'>Presente.</p>
                </div>

                <div className='text-justify my-8 flex flex-col gap-6'>
                    <p>
                        Por este medio me permito presentar a Usted al alumno (a) <span className="underline underline-offset-4">{alumno.nombre} {alumno.apePaterno} {alumno.apeMaterno}</span>,
                        con número de matrícula  <span className="underline underline-offset-4">{alumno.matricula}</span> {' '}
                        de la carrera <span className="underline underline-offset-4">{alumno.carrera}</span>,
                        quien realizara Servicio Social en el <span className="underline underline-offset-4">{alumno.dependencias.institucion}</span>,
                        específicamente en el programa “<span className="underline underline-offset-4">{alumno.dependencias.nombrePrograma}</span>” con número de clave {' '}
                        <span className="underline underline-offset-4">{alumno.dependencias?.clavePrograma}</span>, durante el período comprendido del <span className='font-semibold'>{fechaInicioFormat} al
                            {fechaFinFormat},</span> cubriendo un total de 500 hrs, no menor a 6 meses y no
                        mayor a 1 año.
                    </p>
                    <p>
                        Agradeciendo anticipadamente las facilidades que le brinden al (a) portador (a) de
                        la presente para el desempeño de sus actividades, me es grato suscribirme a sus
                        amables órdenes.
                    </p>
                </div>

                <div className='mt-6'>
                    <p className='font-semibold uppercase text-center'>Atentamente.</p>
                    <div className='my-14'>
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-0.5 w-full bg-black"></div>
                            <div className='flex flex-col text-center font-semibold text-sm'>
                                <span>L.C.E. María Angélica Cruz Camargo</span>
                                <span>Jefa del Departamento de Servicio Social y</span>
                                <span>Residencias Profesionales de ITESHU</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[210mm] h-28 absolute bottom-0 left-5">
                <Image
                    src="/assets/img/membretado2023.png"
                    alt="ITESHU Logo"
                    fill
                />
            </div>
        </div>
    )
}
