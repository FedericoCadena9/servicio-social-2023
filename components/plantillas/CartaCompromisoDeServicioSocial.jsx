import Image from 'next/image';

export const CartaCompromisoDeServicioSocial = ({ alumno }) => {

    function semesterToText(semestre) {
        switch (semestre) {
            case 7:
                return 'Séptimo';
            case 8:
                return 'Octavo';
            case 9:
                return 'Noveno';
            case 10:
                return 'Décimo';
            case 11:
                return 'Onceavo';
            default:
                return semestre.toString();
        }
    }

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return (
        <div className="w-[215.9mm] h-[279.4mm] bg-white border-1 border-gray-200 box-border m-auto px-20 py-10">
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

            <div className='mt-4 text-center space-y-2'>
                <h1 className="font-bold text-lg">Carta Compromiso de Servicio Social</h1>
                <p className='font-semibold text-sm'>Departamento de Residencias profesionales y Servicio Social</p>
            </div>

            <div className="grid grid-cols-6 mt-6 text-sm gap-6">
                <div className='col-span-6 text-center'>
                    <p>Con el fin de dar cumplimiento con lo establecido en la Ley Reglamentaria del Artículo 5° Constitucional relativo al ejercicio de profesiones, el suscrito:</p>
                </div>
                <div className="col-span-6">
                    <div className="flex justify-start items-start">
                        <p>Nombre del prestador(a) de Servicio Social:</p>
                        <p className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">{alumno.nombre} {alumno.apePaterno} {alumno.apeMaterno}</p>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex justify-start items-start">
                        <p>Número de matrícula:</p>
                        <p className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">{alumno.matricula}</p>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex justify-start items-start">
                        <p>Domicilio:</p>
                        <p className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">{alumno.domicilio}</p>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="flex justify-start items-start">
                        <p>Telefono:</p>
                        <p className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">{alumno.telefono}</p>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="flex justify-start items-start">
                        <p>Carrera:</p>
                        <p className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">{alumno.carrera}</p>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="flex justify-start items-start">
                        <p>Semestre:</p>
                        <p className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">{semesterToText(alumno.semestre)}</p>
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="flex justify-start items-start">
                        <p>Dependencia u organismo:</p>
                        <p className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">{alumno.dependencias.nombrePrograma}</p>
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="flex justify-start items-start">
                        <p>Domicilio de la dependencia:</p>
                        <p className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">{alumno.dependencias.domicilio}</p>
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="flex justify-start items-start">
                        <p>Responsable del programa:</p>
                        <p className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">{alumno.dependencias.responsableArea}</p>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex justify-start items-start">
                        <p>Fecha de inicio:</p>
                        <p className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">11 de junio</p>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex justify-start items-start">
                        <p>Fecha de terminación:</p>
                        <p className="border-b-1 border-black flex-grow bg-white ml-2 pb-1">12 de junio</p>
                    </div>
                </div>
                <div className="col-span-6 mt-4">
                    <p className="text-center text-[13px]">
                        Me comprometo a realizar el Servicio Social acatando el reglamento del Instituto Tecnológico Superior de Huichapan
                        (ITESHU) , así como el emitido por el Tecnológico Nacional de México y llevarlo a cabo en el lugar y periodos
                        manifestados, así como, a participar con mis conocimientos e iniciativa en las actividades que desempeñe, procurando
                        dar una imagen positiva del ITESHU al cual pertenezco en el Organismo o Dependencia oficial, de no hacerlo así quedo
                        enterado (a) de la cancelación respectiva, la cual procederá automáticamente.
                    </p>
                </div>
                <div className="col-span-6 mt-4">
                    <div className='flex'>
                        <p>En la ciudad de El Saucillo, Huichapan, Hidalgo a</p>
                        <div className="flex justify-start items-start">
                            <p className="border-b-1 border-black bg-white ml-2 px-2 pb-1">{day}</p>
                            <p>del mes</p>
                            <p className="border-b-1 border-black bg-white ml-2 px-2 pb-1">{month}</p>
                            <p>de</p>
                            <p className="border-b-1 border-black bg-white ml-2 px-2 pb-1">{year}</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 mt-4">
                    <p className='uppercase text-center'>Conformidad</p>

                    <div className="flex justify-center mt-12 w-full">
                        <p className='pt-2 border-black border-t-1 text-center inline-block'>Firma del estudiante prestador(a) de Servicio Social</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6 text-sm">
                <p>R01/0823</p>
                <p>F-VI-19</p>
            </div>
        </div>
    )
}
