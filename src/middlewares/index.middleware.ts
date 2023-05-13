import bodyParser from 'body-parser'
import type { Express } from 'express'
import morganMiddleware from '@/middlewares/logger.middleware'

const useMiddlewares = (app: Express) => {
  app.use(bodyParser.json())
  app.use(morganMiddleware)
}

export default useMiddlewares
