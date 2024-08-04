'use server'

import { signIn } from '@/server/auth'
import { COOKIE_NAME } from '@/utils/constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { signUp } from '@/server/auth'
import { toast } from 'sonner'

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

export async function SignOut() {
  cookies().delete(COOKIE_NAME)
  redirect('/')
}

const RegisterSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export const registerUser = async (_: unknown, formData: FormData) => {
  const data = RegisterSchema.parse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { message } = await signUp(data)
    toast.success(message)
  } catch (e) {
    console.error(e)
    return { message: 'Failed to sign you up' }
  }
  redirect('/sign-in')
}
