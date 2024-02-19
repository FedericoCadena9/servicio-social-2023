import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';

import { DashboardLayout } from '../../components/DashboardLayout'
import { TextBlock } from "../../components/TextBlock";
import { TableBitacora } from "../../components/bitacora/Table";
import { columns, initialValues, statusOptions, statusColorMap } from "../../app/bitacora/tableData";

export const metadata = {
    title: 'Bitacora de Seguimiento | Departamento de Convenios',
    description: 'Agregue informacion relevante y evalue a los prestadores de Servicio Social.'
}


export default async function Bitacora() {

    const supabase = createServerComponentClient({ cookies })
    const { data: totalAdministracion } = await supabase
        .from('alumnos')
        .select(`*, dependencias(*)`)
        .eq('carrera', 'INGENIERÍA EN ADMINISTRACIÓN')
        .neq('creditosTotales', 250);

    const { data: totalGestionEmpresarial } = await supabase
        .from('alumnos')
        .select(`*, dependencias(*)`)
        .eq('carrera', 'INGENIERÍA EN GESTIÓN EMPRESARIAL')
        .neq('creditosTotales', 250);

    const { data: totalSistemasComputacionales } = await supabase
        .from('alumnos')
        .select(`*, dependencias(*)`)
        .eq('carrera', 'INGENIERÍA EN SISTEMAS COMPUTACIONALES')
        .neq('creditosTotales', 250);

    const { data: totalIndustrial } = await supabase
        .from('alumnos')
        .select(`*, dependencias(*)`)
        .eq('carrera', 'INGENIERÍA INDUSTRIAL')
        .neq('creditosTotales', 250);

    const { data: totalMecatronica } = await supabase
        .from('alumnos')
        .select(`*, dependencias(*)`)
        .eq('carrera', 'INGENIERÍA MECATRÓNICA')
        .neq('creditosTotales', 250);

    const { data: totalArquitectura } = await supabase
        .from('alumnos')
        .select(`*, dependencias(*)`)
        .eq('carrera', 'ARQUITECTURA')
        .neq('creditosTotales', 250);

    const { data: totalEnergiasRenovables } = await supabase
        .from('alumnos')
        .select(`*, dependencias(*)`)
        .eq('carrera', 'INGENIERÍA EN ENERGÍAS RENOVABLES')
        .neq('creditosTotales', 250);

    const { data: totalGastronomia } = await supabase
        .from('alumnos')
        .select(`*, dependencias(*)`)
        .eq('carrera', 'GASTRONOMÍA')
        .neq('creditosTotales', 250);

    const { data: totalInnovacionAgricolaSustentable } = await supabase
        .from('alumnos')
        .select(`*, dependencias(*)`)
        .eq('carrera', 'INGENIERÍA EN INNOVACIÓN AGRÍCOLA SUSTENTABLE')
        .neq('creditosTotales', 250);

    const data = [
        {
            nombre: 'INGENIERÍA EN ADMINISTRACIÓN',
            alumnos: totalAdministracion
        },
        {
            nombre: 'INGENIERÍA EN GESTIÓN EMPRESARIAL',
            alumnos: totalGestionEmpresarial
        },
        {
            nombre: 'INGENIERÍA EN SISTEMAS COMPUTACIONALES',
            alumnos: totalSistemasComputacionales
        },
        {
            nombre: 'INGENIERÍA INDUSTRIAL',
            alumnos: totalIndustrial
        },
        {
            nombre: 'INGENIERÍA MECATRÓNICA',
            alumnos: totalMecatronica
        },
        {
            nombre: 'ARQUITECTURA',
            alumnos: totalArquitectura
        },
        {
            nombre: 'INGENIERÍA EN ENERGÍAS RENOVABLES',
            alumnos: totalEnergiasRenovables
        },
        {
            nombre: 'GASTRONOMÍA',
            alumnos: totalGastronomia
        },
        {
            nombre: 'INGENIERÍA EN INNOVACIÓN AGRÍCOLA SUSTENTABLE',
            alumnos: totalInnovacionAgricolaSustentable
        }
    ];



    return (
        <DashboardLayout>
            <TextBlock type={'Bitacora de Seguimiento'} text={'Agregue informacion relevante y evalue a los prestadores de Servicio Social.'} />
            <TableBitacora columns={columns} data={data} />
        </DashboardLayout>
    )
}
