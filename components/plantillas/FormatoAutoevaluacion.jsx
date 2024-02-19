'use client'
import Image from 'next/image';
import { clientSupabase as supabase } from '../../utils/supabase';
import { useEffect, useState } from "react";

export const FormatoAutoevaluacion = ({ alumno }) => {
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

    //Periodos
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaInicioFormat = new Date(fechaInicio).toLocaleDateString('es-MX', options);
    const fechaFinFormat = new Date(fechaFin).toLocaleDateString('es-MX', options);

    return (
        <div className="w-[215.9mm] h-[279.4mm] bg-white border-1 border-gray-200 box-border m-auto px-10 py-10">
            <div className="flex items-center justify-between">
                <Image
                    src="/assets/img/iteshuLogo.png"
                    alt="ITESHU Logo"
                    width={150}
                    height={150}
                />

                <Image
                    src="/assets/img/servicioSocialLogo.png"
                    alt="ITESHU Logo"
                    width={150}
                    height={150}
                />
            </div>

            <div className='mt-4 text-center space-y-4 text-sm'>
                <h1 className="font-bold text-lg">Formato de Autoevaluación del Prestadora(a) de Servicio Social </h1>
            </div>

            <div className='mt-4 space-y-2 text-sm'>
                <div className="flex justify-start items-start">
                    <p>Nombre del prestador(a) de Servicio Social:</p>
                    <p className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">{alumno.nombre} {alumno.apePaterno} {alumno.apeMaterno}</p>
                </div>
                <div className="flex justify-start items-start">
                    <p>Programa:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">{alumno.dependencias?.nombrePrograma}</span>
                    </p>
                </div>
                <div className="flex justify-start items-start">
                    <p>Periodo de realización:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">
                            {fechaInicioFormat} al {fechaFinFormat}
                        </span>
                    </p>
                </div>
                <div className="flex justify-start items-start">
                    <p>Indíque a que trimestre corresponde:</p>
                    <div className="flex justify-between items-center w-60 ml-4">
                        <p>Trimestre</p>
                        <p>Final</p>
                    </div>
                </div>
            </div>

            <div className='mt-4'>
                <p className='text-xs'>Marque con una <span className='font-bold'>X</span> el valor que refleje su nivel de desempeño en la realización del Servicio Social.</p>
                <table className='min-w-full border text-sm font-light mt-2'>
                    <thead className='border-b text-[11px]'>
                        <tr className="border-b">
                            <th scope="col" className="border-r px-1 py-1.5 w-1/12">No.</th>
                            <th scope="col" className="border-r px-6 py-1.5 w-6/12">Criterios a evaluar</th>
                            <th scope="col" className="border-r px-2 py-1.5 w-1/12">Insuficiente</th>
                            <th scope="col" className="border-r px-2 py-1.5 w-1/12">Suficiente</th>
                            <th scope="col" className="border-r px-2 py-1.5 w-1/12">Bueno</th>
                            <th scope="col" className="border-r px-2 py-1.5 w-1/12">Notable</th>
                            <th scope="col" className="border-r px-2 py-1.5 w-1/12">Excelente</th>
                        </tr>
                    </thead>
                    <tbody className='text-[12px]'>
                        <tr className="border-b">
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">1</td>
                            <td className="whitespace-wrap border-r px-6 py-1.5 w-6/12">Cumplí en tiempo y forma con las actividades encomendadas alcanzando los objetivos.</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">0</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">1</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">2</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">3</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">4</td>
                        </tr>
                        <tr className="border-b">
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">2</td>
                            <td className="whitespace-wrap border-r px-6 py-1.5">Trabajé en equipo y me adapté a nuevas situaciones.</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">0</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">1</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">2</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">3</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">4</td>
                        </tr>
                        <tr className="border-b">
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">3</td>
                            <td className="whitespace-wrap border-r px-6 py-1.5">Mostré liderazgo en las actividades encomendadas.</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">0</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">1</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">2</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">3</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">4</td>
                        </tr>
                        <tr className="border-b">
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">4</td>
                            <td className="whitespace-wrap border-r px-6 py-1.5">Organicé mi  tiempo y trabajé de manera proactiva.</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">0</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">1</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">2</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">3</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">4</td>
                        </tr>
                        <tr className="border-b">
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">5</td>
                            <td className="whitespace-wrap border-r px-6 py-1.5">Interpreté la realidad y me sensibilicé aportando soluciones a la problemática con la actividad complementaria.</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">0</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">1</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">2</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">3</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">4</td>
                        </tr>
                        <tr className="border-b">
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">6</td>
                            <td className="whitespace-wrap border-r px-6 py-1.5">Realicé sugerencias innovadoras para beneficio o mejora del programa en el que participo.</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">0</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">1</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">2</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">3</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">4</td>
                        </tr>
                        <tr className="border-b">
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">7</td>
                            <td className="whitespace-wrap border-r px-6 py-1.5">Tuve iniciativa para ayudar en las actividades encomendadas y mostré espíritu de servicio.</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">0</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">1</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">2</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">3</td>
                            <td className="whitespace-nowrap border-r px-2 py-1.5 font-semibold text-center">4</td>
                        </tr>
                        <tr className="border-b">
                            <td></td>
                            <td className='px-2 uppercase font-bold border-r'>Total</td>
                            <td className='border-r'></td>
                            <td className='border-r'></td>
                            <td className='border-r'></td>
                            <td className='border-r'></td>
                            <td className='border-r'></td>
                        </tr>
                        <tr className="border-b">
                            <td></td>
                            <td className='px-2 uppercase font-bold border-r'>Sumatoria</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-2 flex gap-2">
                <p>Observaciones:</p>
                <div className="w-full h-auto border-b border-black"></div>
            </div>

            <div className="flex justify-between items-center mt-16">
                <div className='px-2 border-t border-black'>
                    <p className='font-medium text-xs'>Nombre, matrícula y  firma del prestador de  Servicio Social.</p>
                </div>

                <div className='px-2 border-t border-black'>
                    <p className='font-medium text-xs text-center'>Sello de la dependencia</p>
                </div>
            </div>

            <div className='text-xs mt-8'>
                <p>C.C.P. Oficina de Servicio Social</p>
                <div className="flex items-center justify-between mt-4">
                    <p>R01/0823</p>
                    <p>F-VI-19</p>
                </div>
            </div>


        </div>
    )
}
