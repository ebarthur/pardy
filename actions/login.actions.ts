'use server'

import { signIn } from '@/server/auth.server'
import { COOKIE_NAME } from '@/utils/constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const authSchema = z.object({
  identifier: z.string(),
  password: z.string(),
})
export const login = async (_: unknown, formData: FormData) => {
  const data = authSchema.parse({
    identifier: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token } = await signIn(data)
    cookies().set(COOKIE_NAME, token)
  } catch (e) {
    console.error(e)
    return { message: 'Failed to sign you in' }
  }
  redirect('/s')
}
