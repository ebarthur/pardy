import 'server-only'

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`

export async function getEventsById(
  id: number,
  token: { name: string; value: string },
) {
  try {
    const url = new URL(`${BASE_URL}/events/all`)

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    return data as Event[]
  } catch (error) {}
}
