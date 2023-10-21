import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DashboardLayout } from '../components/DashboardLayout'
import { Charts } from '../components/Charts'

export const metadata = {
  title: 'Home | Departamento de Convenios',
  description: '...'
}

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>
      <DashboardLayout>
        {/* <Charts /> */}
        Home
      </DashboardLayout>
    </div>
  )
}

