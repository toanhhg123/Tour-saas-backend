import winstonLogger from '@/utils/logger.utils'
import { createClient } from 'redis'

export const client = createClient()

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
