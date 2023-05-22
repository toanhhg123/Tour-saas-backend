import connectDb from '@/config/db/mysql.db'
import useMiddlewares from '@/middlewares/index.middleware'
import useRoutes from '@/routes'
import type { Express } from 'express'
import express from 'express'

const createApp = async () => {
  try {
    const app: Express = express()

    await useMiddlewares(app)
    await connectDb()
    await useRoutes(app)
    return app
  } catch (error) {
    throw error
  }
}

export default createApp
