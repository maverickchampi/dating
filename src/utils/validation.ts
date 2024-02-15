import { ResponseError } from '@/utils/errors'
import Joi from 'joi'

interface IValidateBody {
  schema: Joi.ObjectSchema
  body: Object
}

export const validateBody = ({
  schema,
  body,
}: IValidateBody) => {
  const { error } = schema.validate(body)

  if (error) {
    console.error('Validation error:', error.details[0].message)
    throw new ResponseError(error.details[0].message, 400)
  }
}