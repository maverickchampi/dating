import Joi from 'joi'

export const schemaPOST = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).trim().required(),
  names: Joi.string().trim().required(),
  dad_name: Joi.string().trim().required(),
  mom_name: Joi.string().trim().required(),
})
