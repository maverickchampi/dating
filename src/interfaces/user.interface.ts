type IUser = {
  _id: string
  names: string
  dad_name: string
  mom_name: string
  email: string
  password: string
  phone?: string
  date_of_birth?: Date
  weight?: number
  height?: number
  blood_type?: string
  createdAt: Date
  updatedAt: Date
} & (
  | { role: 'admin', cmp?: never }
  | { role: 'doctor', cmp: string }
  | { role: 'patient', cmp?: never }
)