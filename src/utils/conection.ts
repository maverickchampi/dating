import { envs } from '@/constants/envs'
import { connect, connection } from 'mongoose'

const conn = {
  isConnected: 0,
}

export async function dbConnect() {
  if (conn.isConnected) {
    return
  }

  if(!envs.mongoUri) {
    throw new Error('MongoUri must be defined')
  }

  const db = await connect(envs.mongoUri)
  conn.isConnected = db.connections[0].readyState
}

connection.on('connected', () => console.log('Mongodb connected to db'))
connection.on('error', (err) => console.error('Mongodb Errro:', err.message))