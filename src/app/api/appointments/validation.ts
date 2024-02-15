import { regexs } from '@/constants/regexs'
import Joi from 'joi'

export const schemaPOST = Joi.object({
  date: Joi.date().iso().required(),
  patient: Joi.string().regex(regexs.objectId).required(),
  doctor: Joi.string().regex(regexs.objectId).required(),
  reason: Joi.string().trim().required(),
})
