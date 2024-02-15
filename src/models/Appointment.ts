import { Schema, model, models } from 'mongoose'
import { slugUser } from './User'

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: [true, 'El campo fecha es requerido']
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: slugUser,
    required: [true, 'El campo paciente es requerido']
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: slugUser,
    required: [true, 'El campo doctor es requerido']
  },
  reason: {
    type: String,
    trim: true,
    required: [true, 'El campo motivo es requerido']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    required: [true, 'El campo estado es requerido']
  },
}, {
  timestamps: true
})

export const slugAppointment = 'Appointment'
export default models.Appointment || model('Appointment', appointmentSchema)