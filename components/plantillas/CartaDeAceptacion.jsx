export const CartaDeAceptacion = ({ alumno }) => {

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Usar el número del mes para obtener el nombre
    const monthName = months[month];

    return (
        <div className="w-[215.9mm] h-[279.4mm] bg-white border-1 border-gray-200 box-border m-auto px-20 py-10 ">
            <div className="flex flex-col text-center pt-20 font-semibold">
                <p>***(HOJA MEMBRETADA de la dependencia)</p>
                <p>CARTA DE ACEPTACIÓN</p>
            </div>

            <div>
                <div className="my-8 flex flex-col gap-8">
                    <p className='text-end'>Huichapan, Hgo., a {day} de {monthName} de {year}</p>
                </div>

                <div className='font-semibold text-sm uppercase'>
                    <p>L.C.E. MARÍA ANGÉLICA CRUZ CAMARGO</p>
                    <p>Jefa Departamento de Residencias</p>
                    <p>Profesionales y Servicio Social de ITESHU</p>
                    <p>Presente.</p>
                </div>

                <div className='text-justify my-8 flex flex-col gap-6'>
                    <p>
                        Por este medio, hago de su conocimiento que el (la) C. <span className="underline underline-offset-4">{alumno.nombre} {alumno.apePaterno} {alumno.apeMaterno}</span>, con número
                        de matrícula <span className="underline underline-offset-4">{alumno.matricula}</span>, estudiante de la carrera de <span className="underline underline-offset-4">{alumno.carrera}</span>, ha
                        sido aceptado (a) para realizar su servicio social en el periodo del 24 de julio de 2023
                        al 24 de enero de 2024, en el programa "<span className="underline underline-offset-4">{alumno.dependencias.nombrePrograma}</span>” con número de clave {' '}
                        <span className="underline underline-offset-4">{alumno.dependencias?.clavePrograma}</span> cubriendo un total de 500 horas en 6 meses o no mayor a 1 año.
                    </p>
                    <p>Sin más por el momento, aprovecho la ocasión para enviarle un cordial saludo.</p>
                </div>

                <div className='mt-6'>
                    <p className='font-semibold uppercase text-center'>Atentamente</p>
                    <div className='my-14'>
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-0.5 w-full bg-black"></div>
                            <div className='flex flex-col text-center font-semibold text-sm'>
                                <span>Lic. Alba Mendoza Montaño</span>
                                <span>Secretaria del Departamento de</span>
                                <span>Residencias Profesionales y Servicio Social de ITESHU</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
