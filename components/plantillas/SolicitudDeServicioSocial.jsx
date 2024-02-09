import Image from 'next/image';

export const SolicitudDeServicioSocial = ({ alumno }) => {

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
      default:
        return semestre.toString();
    }
  }

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const options = [
    'Educación',
    'Actividades cívicas',
    'Desarrollo Sustentable',
    'Desarrollo de comunidad',
    'Actividades culturales',
    'Apoyo a la salud',
    'Actividades deportivas',
    'Medio ambiente',
    'Otros'
  ];

  function ListaOpciones({ tipoPrograma }) {
    return (
      <div className="grid grid-cols-3 gap-1">
        {options.map(opcion => (
          <div key={opcion}>
            ({tipoPrograma === opcion ? 'x' : ' '}) {opcion}
          </div>
        ))}
      </div>
    );
  }


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

      <div className='mt-4 text-center space-y-4'>
        <h1 className="uppercase font-bold text-lg">Solicitud de servicio social</h1>
        <p className='font-semibold text-sm'>Departamento de Residencias profesionales y Servicio Social</p>
      </div>

      <div className='mt-6 text-sm space-y-5'>
        {/* Datos personales */}
        <div>
          <div className="space-y-4">
            <h2 className="font-semibold">Datos personales:</h2>
            <div className='flex items-center justify-between'>
              <div className="flex justify-start items-start">
                <p>Nombre completo:</p>
                <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1">{alumno.nombre} {alumno.apePaterno} {alumno.apeMaterno}</p>
              </div>
              <div className="flex justify-start items-start">
                <p>Sexo:</p>
                <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1">
                  {alumno.genero === 'M' ? 'Masculino' : alumno.genero === 'F' ? 'Femenino' : ''}
                </p>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className="flex justify-start items-start">
                <p>Teléfono:</p>
                <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1">{alumno.telefono}</p>
              </div>
              <div className="flex justify-start items-start">
                <p>Domicilio:</p>
                <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1">{alumno.domicilio}</p>
              </div>
            </div>
            <div className="flex justify-start items-start">
              <p>Correo electrónico:</p>
              <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1">{`a${alumno.matricula}@iteshu.edu.mx`}</p>
            </div>
          </div>
        </div>

        {/* Escolaridad */}
        <div>
          <div className="space-y-4">
            <h2 className="font-semibold">Escolaridad:</h2>
            <div className='flex items-center justify-between'>
              <div className="flex justify-start items-start">
                <p>Matricula:</p>
                <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1">{alumno.matricula}</p>
              </div>
              <div className="flex justify-start items-start">
                <p>Carrera:</p>
                <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1 !capitalize">{alumno.carrera}</p>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className="flex justify-start items-start">
                <p>Periodo:</p>
                <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1 !capitalize">Enero - Junio 2021</p>
              </div>
              <div className="flex justify-start items-start">
                <p>Semestre:</p>
                <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1 !capitalize">{semesterToText(alumno.semestre)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Datos del Programa e Servicio Social (Para uso exclusivo de la Oficina de Servicio Social) */}
        <div>
          <div className="space-y-4">
            <h2 className="font-semibold">Datos del Programa de Servicio Social (Para uso exclusivo de la Oficina de Servicio Social):</h2>
            <div className="flex justify-start items-start">
              <p>Dependencia oficial:</p>
              <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1">{alumno.dependencias.institucion}</p>
            </div>
            <div className="flex justify-start items-start">
              <p>Titular de la dependencia:</p>
              <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1">{alumno.dependencias.directorGeneral}</p>
            </div>
            <div className="flex justify-start items-start">
              <p>Nombre del programa:</p>
              <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1">{alumno.dependencias.nombrePrograma}</p>
            </div>

            <div className='flex items-center gap-2'>
              <div className="flex justify-start items-start">
                <p>Modalidad:</p>
                <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1">{alumno.modalidad}</p>
              </div>
              <div className="flex justify-start items-start">
                <p>Fecha de inicio:</p>
                <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1">{alumno.fechaInicio}</p>
              </div>
              <div className="flex justify-start items-start">
                <p>Fecha de terminación:</p>
                <p className="border-b-1 border-black pr-10 mx-2 bg-white pb-1">{alumno.fechaFin}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tipo de programa */}
        <div>
          <div className="space-y-4">
            <h2 className="font-semibold">Tipo de programa:</h2>
            <ListaOpciones tipoPrograma="" />
          </div>
        </div>

        {/* Para uso exclusivo de la Oficina de Servicio Social */}
        <div>
          <div className="space-y-4">
            <h2 className="font-semibold">Para uso exclusivo de la Oficina de Servicio Social:</h2>
            <div className='mt-6 grid grid-cols-7'>
              <div className="flex items-center gap-2 col-span-2">
                <p>Aceptado(a):</p>
                <p>SI ( )</p>
                <p>NO ( ),</p>
              </div>
              <div className="flex w-full col-span-5">
                <p>Motivo:</p>
                <div className='w-full border-b-1 border-black'></div>
              </div>
              <div className='w-full h-6 border-b-1 border-black col-span-7'></div>
              <div className='w-full h-6 border-b-1 border-black col-span-7'></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p>R01/0823</p>
          <p>F-VI-17</p>
        </div>
      </div>
    </div>
  )
}
