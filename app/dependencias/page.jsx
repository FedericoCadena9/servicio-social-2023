import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';

import { TableComponent } from "../../components/dependencias/Table";
import { DashboardLayout } from '../../components/DashboardLayout'
import { TextBlock } from "../../components/TextBlock";

import { columns, initialValues, statusOptions } from "../../app/dependencias/tableData";

export default async function Dependencias() {

    const supabase = createServerComponentClient({ cookies })

    const { data: dependencias, error } = await supabase.from('dependencias').select('*')
    return (
        <DashboardLayout>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut voluptate impedit sequi minus ea vero consectetur error reiciendis omnis ex excepturi vel voluptates animi amet in dolorum, iure, labore culpa.
            </p>
            <TextBlock type={'Dependencias'} text={'Explora programas y lugares aprobados donde los alumnos pueden llevar a cabo su servicio social.'} />
            <TableComponent data={dependencias} type={'dependencias'} columns={columns} initialValues={initialValues} statusOptions={statusOptions} />
        </DashboardLayout>
    )
}
