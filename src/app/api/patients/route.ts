import User from '@/models/User'
import { dbConnect } from '@/utils/conection'
import { ResponseError } from '@/utils/errors'
import { validateBody } from '@/utils/validation'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import { schemaPOST } from './validation'

export const POST = async (req: Request) => {
  try{
    const body = await req.json()

    validateBody({ schema: schemaPOST, body })
  
    await dbConnect()
    const userFound = await User.findOne({ email: body.email })
  
    if (userFound) {
      throw new ResponseError('Email already in use')
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const user = new User({
      email: body.email,
      password: hashedPassword,
      names: body.names,
      dad_name: body.dad_name,
      mom_name: body.mom_name,
      role: 'patient',
    })

    await user.save()

    return NextResponse.json({ success: true, message: 'Patient created' })  
  }catch(e){
    if (
      e instanceof mongoose.Error.ValidationError ||
      e instanceof ResponseError
    ) {
      return NextResponse.json(
        { message: e.message },
        { status: 400 }
      )
    }
   
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
