import Image from 'next/image';

export const InformeTrimestral = ({ alumno, fechaInicio, fechaFin }) => {

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const monthSixMonthsLater = currentDate.getMonth() + 6;
    const year = currentDate.getFullYear();
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Usar el número del mes para obtener el nombre
    const monthName = months[month];


    return (
        <div className="w-[215.9mm] h-[279.4mm] bg-white border-1 border-gray-200 box-border m-auto px-20 py-10 ">

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

            <div className="flex flex-col text-center pt-10 font-semibold">
                <p>1ER INFORME TRIMESTRAL DE ACTIVIDADES</p>
            </div>

            <div>
                <div className="my-8 flex flex-col gap-8">
                    <p className='text-end'>Huichapan, Hgo., a {day} de {monthName} de {year}</p>
                </div>

                <div className='text-justify my-8 flex flex-col gap-3'>
                    <div className="flex justify-start items-start">
                        <p className='font-semibold'>Nombre del prestador:</p>
                        <p className="pr-10 mx-2 bg-white pb-1">{alumno.nombre} {alumno.apePaterno} {alumno.apeMaterno}</p>
                    </div>
                    <div className="flex justify-start items-start">
                        <p className='font-semibold'>Carrera:</p>
                        <p className="pr-10 mx-2 bg-white pb-1">{alumno.carrera}</p>
                    </div>
                    <div className="flex justify-start items-start">
                        <p className='font-semibold'>Número de matrícula:</p>
                        <p className="pr-10 mx-2 bg-white pb-1">{alumno.matricula}</p>
                    </div>
                    <div className="flex justify-start items-start">
                        <p className='font-semibold'>Periodo de:</p>
                        <p className="pr-10 mx-2 bg-white pb-1">
                            {fechaInicio} al {fechaFin}
                        </p>
                    </div>
                    <div className="flex justify-start items-start">
                        <p className='font-semibold'>Programa:</p>
                        <p className="pr-10 mx-2 bg-white pb-1">{alumno.dependencias?.nombrePrograma}</p>
                    </div>
                    <div className="flex justify-start items-start">
                        <p className='font-semibold'>Clave del programa:</p>
                        <p className="pr-10 mx-2 bg-white pb-1">{alumno.dependencias?.clavePrograma}</p>
                    </div>
                    <div className="flex justify-start items-start">
                        <p className='font-semibold'>Institución Prestataria:</p>
                        <p className="pr-10 mx-2 bg-white pb-1">{alumno.dependencias?.institucion}</p>
                    </div>
                </div>

                <div>
                    <p className='font-semibold uppercase text-center'>Actividades realizadas</p>
                    <div className="space-y-6 mt-4">
                        <div className="w-full h-px bg-black"></div>
                        <div className="w-full h-px bg-black"></div>
                        <div className="w-full h-px bg-black"></div>
                        <div className="w-full h-px bg-black"></div>
                        <p className='text-sm'>con un total de ___ hrs.</p>
                    </div>
                </div>

                <div>
                    <p className='font-semibold text-sm'>¿Con este programa que cantidad de personas son beneficiadas?
                        *Poner Cantidad en número* __________ </p>
                </div>

                <div className='mt-4'>
                    <p>(en caso de requerir mayor espacio, anexar las hojas necesarias)</p>
                </div>

                <div className='mt-16 flex w-full justify-between items-center'>
                    <div className='h-px w-56 bg-black'></div>
                    <div className='h-px w-56 bg-black'></div>
                </div>
            </div>
        </div>
    )
}
