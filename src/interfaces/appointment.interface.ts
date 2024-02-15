interface IAppointment {
  _id: string
  date: Date
  patient: IUser
  doctor: IUser
  reason: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export default IAppointment
