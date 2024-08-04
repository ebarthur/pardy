'use server'

import { getUserFromToken } from '@/server/auth'
import { AuthUser } from '@/types/user'
import { COOKIE_NAME } from '@/utils/constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const getCurrentUser = cache(async (): Promise<AuthUser> => {
  const token = cookies().get(COOKIE_NAME)
  if (!token) redirect('/sign-in')

  const user = await getUserFromToken(token)
  // if (!user) redirect('/sign-in')

  return user
})
