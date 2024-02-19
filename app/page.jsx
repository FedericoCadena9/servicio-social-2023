import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { DashboardLayout } from '../components/DashboardLayout'
import { TextBlock } from "../components/TextBlock";
import { ServicePeriodForm } from "../components/ServicePeriodForm";
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
        <TextBlock type={'Dashboard'} text={'Bienvenido al dashboard. Usted ha iniciado sesión como ' + session.user.email} />
        <ServicePeriodForm />
        <Charts />
      </DashboardLayout>
    </div>
  )
}

