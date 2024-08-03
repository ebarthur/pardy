export type AuthUser = {
  id: number
  username: string
  email: string
  emailVerified: boolean
  name: string
  image: string | null
  birthDate: Date | null
  registrationDate: Date
}
