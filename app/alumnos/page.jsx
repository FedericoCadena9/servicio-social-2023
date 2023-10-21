import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';

import { AlumnosTable } from "../../components/alumnos/Table";
import { DashboardLayout } from '../../components/DashboardLayout'
import { TextBlock } from "../../components/TextBlock";


import { columns, initialValues, statusOptions, statusColorMap } from "@/app/alumnos/tableData";
import { capitalizeEachWord } from '@/utils/capitalize';

export const metadata = {
  title: 'Alumnos | Departamento de Convenios',
  description: 'Consulta la lista de estudiantes que cumplen con los créditos para realizar servicio social.'
}

export default async function Alumnos() {

  const supabase = createServerComponentClient({ cookies })
  const { data: alumnos, error } = await supabase.from('alumnos')
    .select(`*, dependencias(clavePrograma)`)
    .order('matricula', { ascending: true })
    .neq('creditosTotales', 250)

  // Función para convertir la primera letra en mayúscula y el resto en minúscula

  // Aplicar la función a los nombres, apellidos paternos y maternos y carrera
  const formattedAlumnos = alumnos?.map(alumno => {
    let status = '';

    if (alumno.creditosTotales >= 182) {
      status = 'presentaServicio';
    } else if (alumno.creditosTotales >= 176 && alumno.creditosTotales < 182) {
      status = 'noPresenta';
    } else {
      status = 'presentaVerano';
    }

    return {
      ...alumno,
      nombre: alumno.nombre ? capitalizeEachWord(alumno.nombre) : '',
      apePaterno: alumno.apePaterno ? capitalizeEachWord(alumno.apePaterno) : '',
      apeMaterno: alumno.apeMaterno ? capitalizeEachWord(alumno.apeMaterno) : '',
      carrera: alumno.carrera ? capitalizeEachWord(alumno.carrera) : '',
      status
    };
  });

  return (
    <DashboardLayout>
      <TextBlock type={'Alumnos'} text={'Consulta la lista de estudiantes que cumplen con los créditos para realizar servicio social.'} />
      <AlumnosTable data={formattedAlumnos ?? []} columns={columns} initialValues={initialValues} statusColorMap={statusColorMap} statusOptions={statusOptions} />
    </DashboardLayout>
  )
}
