import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';

import { TableComponent } from "@/components/Table";
import { DashboardLayout } from '@/components/DashboardLayout'

import { columns, initialValues, statusOptions } from "@/app/dependencias/tableData";

export default async function Dependencias() {

    const supabase = createServerComponentClient({ cookies })

    const { data: dependencias, error } = await supabase.from('dependencias').select('*')
    return (
        <DashboardLayout>
            Dependencias
            <TableComponent data={dependencias} type={'dependencias'} columns={columns} initialValues={initialValues} statusOptions={statusOptions} />
        </DashboardLayout>
    )
}
