'use server'

import { COOKIE_NAME } from '@/utils/constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function SignOut() {
  cookies().delete(COOKIE_NAME)
  redirect('/')
}
