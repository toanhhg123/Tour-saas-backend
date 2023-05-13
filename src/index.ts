import 'module-alias/register' // 👈 add this one
import errorMiddleware, { notFound } from '@/middlewares/error.middleware'
import type { Express } from 'express'
import express from 'express'
import useMiddlewares from '@/middlewares/index.middleware'
import useRoutes from '@/routes'
import connectDb from '@/config/db/mysql.db'
import env from '@/config/env'
const app: Express = express()

useMiddlewares(app)

connectDb()
  .then()
  .catch((e) => {
    console.log({ error: e })
  })

useRoutes(app)

app.use(notFound)
app.use(errorMiddleware)

const port = env.PORT

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`)
})
