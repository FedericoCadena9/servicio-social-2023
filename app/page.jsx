import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import SignOutButton from '@/components/SignOutButton'
import { DashboardLayout } from '@/components/DashboardLayout'


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
        Home
      </DashboardLayout>
    </div>
  )
}

