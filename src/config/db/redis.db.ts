import winstonLogger from '@/utils/logger.utils'
import { createClient } from 'redis'
import env from '../env'

const url = `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`
export const client = createClient({
  url,
  password: '30122002'
})

export default async function ConnectRedis() {
  try {
    client.on('error', (err) => console.log('Redis Client Error', err))

    await client.connect()
    winstonLogger.info('connect redis success')
    return true
  } catch (error) {
    console.log({ redisError: error })

    throw error
  }
}
