import Image from 'next/image';

export const SolicitudDeServicioSocial = ({ alumno }) => {

  function semesterToText(semestre) {
    switch (semestre) {
      case 7:
        return 'séptimo';
      case 8:
        return 'octavo';
      case 9:
        return 'noveno';
      case 10:
        return 'décimo';
      default:
        return semestre.toString();
    }
  }

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
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
    <div className="w-[215.9mm] h-[279.4mm] bg-white border-1 border-gray-200 box-border m-auto p-20">
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

      <div className='mt-4 text-center space-y-6'>
        <h1 className="uppercase font-bold text-lg">Solicitud de servicio social</h1>
        <p className='font-semibold text-sm'>Departamento de Residencias profesionales y Servicio Social</p>
      </div>

      <div className='mt-6 text-sm space-y-5'>
        {/* Datos personales */}
        <div>
          <div className="space-y-4">
            <h2 className="font-semibold">Datos personales:</h2>
            <div className='flex items-center justify-between'>
              <p>Nombre completo:
                <span className="border-b-1 border-black pr-10 mx-2 bg-white">{alumno.nombre} {alumno.apePaterno} {alumno.apeMaterno}</span>
              </p>
              <p>Sexo:
                <span className="border-b-1 border-black pr-6 mx-2 bg-white">{alumno.sexo}</span>
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Teléfono:
                <span className="border-b-1 border-black mx-2 bg-white">341 123 4567</span>
              </p>
              <p>Domicilio:
                <span className="border-b-1 border-black pr-2 mx-2 bg-white">Calle 1 #123 Col. Centro, Ciudad Guzman, Jalisco</span>
              </p>
            </div>
            <p>Correo electrónico:
              <span className="border-b-1 border-black pr-20 mx-2 bg-white">a19021089@iteshu.edu.mx</span>
            </p>
          </div>
        </div>

        {/* Escolaridad */}
        <div>
          <div className="space-y-4">
            <h2 className="font-semibold">Escolaridad:</h2>
            <div className='flex items-center justify-between'>
              <p>Matricula:
                <span className="border-b-1 border-black pr-10 mx-2 bg-white">19021089</span>
              </p>
              <p>Carrera:
                <span className="border-b-1 border-black pr-10 mx-2 bg-white">Ingeniería en Sistemas Computacionales</span>
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <p>Periodo:
                <span className="border-b-1 border-black pr-10 mx-2 bg-white">Enero - Junio 2021</span>
              </p>
              <p>Semestre:
                <span className="border-b-1 border-black pr-28 mx-2 bg-white">Septimo</span>
              </p>
            </div>
          </div>
        </div>

        {/* Datos del Programa e Servicio Social (Para uso exclusivo de la Oficina de Servicio Social) */}
        <div>
          <div className="space-y-4">
            <h2 className="font-semibold">Datos del Programa e Servicio Social (Para uso exclusivo de la Oficina de Servicio Social):</h2>
            <p>Dependencia oficial:
              <span className="border-b-1 border-black pr-20 mx-2 bg-white">Instituto Tecnologico Superior de Huichapan</span>
            </p>
            <p>Titular de la dependencia:
              <span className="border-b-1 border-black pr-40 mx-2 bg-white">Luis Enrique Camargo Cruz</span>
            </p>
            <p>Nombre del programa:
              <span className="border-b-1 border-black pr-20 mx-2 bg-white">Sistema de control de inventarios</span>
            </p>
            <div className='flex items-center gap-2'>
              <p>Modalidad:
                <span className="border-b-1 border-black mx-2 bg-white">Escolarizada</span>
              </p>
              <p>Fecha de inicio:
                <span className="border-b-1 border-black mx-2 bg-white">01/01/2021</span>
              </p>
              <p>Fecha de terminación:
                <span className="border-b-1 border-black mx-2 bg-white">01/01/2021</span>
              </p>
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
