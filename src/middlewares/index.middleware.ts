import bodyParser from 'body-parser'
import type { Express } from 'express'
import morganMiddleware from '@/middlewares/logger.middleware'
import cors from 'cors'
const useMiddlewares = (app: Express) => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(morganMiddleware)
}

export default useMiddlewares
