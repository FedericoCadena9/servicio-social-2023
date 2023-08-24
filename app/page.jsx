import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import SignOutButton from '@/components/SignOutButton'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // console.log('session', session);

  return (
    <div>
      Home

      <SignOutButton />
    </div>
  )
}

