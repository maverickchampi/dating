import { regexs } from '@/constants/regexs'
import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  names: {
    type: String,
    trim: true,
    required: [true, 'El campo nombres es requerido']
  },
  dad_name: {
    type: String,
    trim: true,
    required: [true, 'El campo apellido paterno es requerido']
  },
  mom_name: {
    type: String,
    trim: true,
    required: [true, 'El campo apellido materno es requerido']
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    match: [regexs.email, 'El campo email no es válido'],
    required: [true, 'El campo email es requerido']
  },
  password: {
    type: String,
    trim: true,
    select: false,
    required: [true, 'El campo contraseña es requerido'],
    minlength: [8, 'El campo contraseña debe tener al menos 8 caracteres']
  },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'patient'],
    required: [true, 'El campo rol es requerido']
  },
  cmp:{
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    required: function () { return this.role === 'doctor' },
    match: [regexs.cmp, 'El CMP debe tener entre 5 y 6 dígitos'],
  },
  phone: {
    type: String,
    trim: true,
  },
  date_of_birth: {
    type: Date,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  blood_type: {
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
}, {
  timestamps: true
})

export const slugUser = 'User'
export default models.User || model('User', userSchema)