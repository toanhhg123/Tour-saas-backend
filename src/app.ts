import connectDb from '@/config/db/mysql.db'
import useMiddlewares from '@/middlewares/index.middleware'
import useRoutes from '@/routes'
import type { Express } from 'express'
import express from 'express'
const app: Express = express()

useMiddlewares(app)

connectDb()
  .then()
  .catch((e) => {
    console.log({ errorDataConnect: e })
  })

useRoutes(app)
export default app
