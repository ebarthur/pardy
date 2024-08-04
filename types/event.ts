export type Event = {
  id: string
  createdAt: Date
  name: string
  startOn: Date
  createdById: number
  description: string | null
  streetNumber: string | null
  street: string | null
  zip: string | null
  bldg: string | null
  isPrivate: boolean
  status: string
}
