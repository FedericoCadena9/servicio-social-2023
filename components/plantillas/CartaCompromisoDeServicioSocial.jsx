import Image from 'next/image';

export const CartaCompromisoDeServicioSocial = () => {
    return (
        <div className="w-[215.9mm] h-[279.4mm] bg-white border-1 border-gray-200 box-border m-auto py-20 px-14">
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
                    <p className='flex'>Nombre del prestador(a) de Servicio Social:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2">Hector Federico Cadena Lopez</span>
                    </p>
                </div>
                <div className="col-span-3">
                    <p className='flex'>Número de matrícula:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2">19021089</span>
                    </p>
                </div>
                <div className="col-span-3">
                    <p className='flex'>Domicilio:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2">Mejui #2 Col. Los Nogales</span>
                    </p>
                </div>
                <div className="col-span-2">
                    <p className='flex'>Teléfono:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2">7721125436</span>
                    </p>
                </div>
                <div className="col-span-2">
                    <p className='flex'>Carrera:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2">Innovacion agricola sustentable</span>
                    </p>
                </div>
                <div className="col-span-2">
                    <p className='flex'>Semestre:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2">Septimo</span>
                    </p>
                </div>
                <div className="col-span-6">
                    <p className='flex'>Dependencia u organismo:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2">Dependencia</span>
                    </p>
                </div>
                <div className="col-span-6">
                    <p className='flex'>Domicilio de la dependencia:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2">Domicilio</span>
                    </p>
                </div>
                <div className="col-span-6">
                    <p className='flex'>Responsable del programa:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2">Responsable</span>
                    </p>
                </div>
                <div className="col-span-3">
                    <p className='flex'>Fecha de inicio:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2"></span>
                    </p>
                </div>
                <div className="col-span-3">
                    <p className='flex'>Fecha de terminación:
                        <span className="border-b-1 border-black flex-grow bg-white ml-2"></span>
                    </p>
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
                <div className="col-span-6 mt-6">
                    <p className='flex'>En la ciudad de El Saucillo, Huichapan, Hidalgo a
                        <span className="border-b-1 border-black bg-white ml-2 px-2">12</span>
                        del mes
                        <span className="border-b-1 border-black bg-white ml-2 px-2">12</span>
                        de
                        <span className="border-b-1 border-black bg-white ml-2 px-2">2023</span>.
                    </p>
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
