export class User {
  id: string | number
  name: string
  date_of_birth: Date
  email: string
  password_hash: string
  role: 'user' | 'admin'
  password_reset_token: string | null
  password_reset_expires: Date | null
  created_at: Date
  updated_at: Date
}
