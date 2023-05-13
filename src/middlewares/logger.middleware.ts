import logger from '@/utils/logger.utils'
import morgan, { type StreamOptions } from 'morgan'

const env = process.env.NODE_ENV || 'development'
const isDevelopment = env === 'development'

const loggerStream: StreamOptions = {
  write: (message) => logger.http(message.substring(0, message.lastIndexOf('\n')))
}

const morganMiddleware = morgan(':method :url :status :res[content-length]- :response-time ms - API Server', {
  stream: loggerStream,
  skip: () => !isDevelopment
})

export default morganMiddleware
