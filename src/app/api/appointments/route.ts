import Appointment from '@/models/Appointment'
import { dbConnect } from '@/utils/conection'
import { ResponseError } from '@/utils/errors'
import { validateBody } from '@/utils/validation'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import { schemaPOST } from './validation'

export const POST = async (req: Request) => {
  try{
    const body = await req.json()

    validateBody({ schema: schemaPOST, body })

    await dbConnect()

    const appointment = new Appointment({
      date: body.date,
      patient: body.patient,
      doctor: body.doctor,
      reason: body.reason,
      status: 'pending'
    })

    await appointment.save()
    
    return NextResponse.json({ success: true, message: 'Appointment created' })
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

export const GET = async (req: Request) => {
  try{
    const { searchParams } = new URL(req.url)

    const pageParam = searchParams.get('page')
    const limitParam = searchParams.get('limit')

    const page = pageParam ? parseInt(pageParam) : 1
    const limit = limitParam ? parseInt(limitParam) : 10

    await dbConnect()

    const appointments = await Appointment.find()
      .populate('doctor')
      .skip((page - 1) * limit)
      .sort({ date: -1 })
      .limit(limit)
      .exec()

    const total = await Appointment.countDocuments()
    
    return NextResponse.json({
      success: true,
      message: 'List patients',
      data: {
        appointments,
        limit,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      }
    })  
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
  console.log(e)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}