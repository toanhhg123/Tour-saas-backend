import bodyParser from 'body-parser'
import type { Express } from 'express'
import morganMiddleware from '@/middlewares/logger.middleware'
import cors from 'cors'
import session from 'express-session'
import env from '@/config/env'
import ConnectRedis from '@/config/db/redis.db'
import RedisStore from 'connect-redis'
import helmet from 'helmet'
import { client } from '@/config/db/redis.db'
const useMiddlewares = async (app: Express) => {
  await ConnectRedis()
  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000']
    })
  )
  app.use(helmet())
  app.use(
    session({
      store: new RedisStore({
        client: client
      }),
      name: 'SAAS_TRAVEL_',
      secret: env.KEY_SESSION,
      resave: true,
      saveUninitialized: false,
      cookie: {
        secure: env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 3600 * 24 * 7 * 1000
      }
    })
  )
  app.use(bodyParser.json())
  app.use(morganMiddleware)

  return app
}

export default useMiddlewares
