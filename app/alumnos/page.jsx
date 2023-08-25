import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';

import { TableComponent } from "@/components/Table";
import { DashboardLayout } from '@/components/DashboardLayout'



export default async function Alumnos() {
  const supabase = createServerComponentClient({ cookies })

  const { data: alumnos, error } = await supabase.from('alumnos').select('*')
  return (
    <DashboardLayout>
      Alumnos
      <TableComponent data={alumnos} type={'alumnos'} />
    </DashboardLayout>
  )
}
