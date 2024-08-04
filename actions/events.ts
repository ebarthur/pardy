'use server'

import { getEventsById } from '@/server/events'
import { Event } from '@/types/event'
import { COOKIE_NAME } from '@/utils/constants'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { memoize } from 'nextjs-better-unstable-cache'

export const getEventsForDashboard = async (userId: number) => {
  try {
    const token = cookies().get(COOKIE_NAME)

    const events = await getEventsById(userId, token)

    revalidatePath('s')
    return events
  } catch (error) {}
}
// {
//   persist: true,
//   revalidateTags: (userId: number) => [`events:${userId}`],
// },
