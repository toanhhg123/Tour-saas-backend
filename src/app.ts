import type { Express } from 'express'
import fs from 'fs'
import express from 'express'
import useMiddlewares from '@/middlewares/index.middleware'
import useRoutes from '@/routes'
import connectDb from '@/config/db/mysql.db'
import googleDriveService from './services/googleDrive.service'
const app: Express = express()

useMiddlewares(app)

connectDb()
  .then()
  .catch((e) => {
    console.log({ errorDataConnect: e })
  })

const upload = async () => {
  try {
    const finalPath = '/Users/toanle/Study/tourmanager__hufi/admin/public/img_tour_1.jpeg'

    const file = await googleDriveService.saveFile('toanhhg123', finalPath, 'image/jpg')
    console.log(file)

    console.info('File uploaded successfully!')
  } catch (error) {
    console.log(error)
  }
}

upload()

useRoutes(app)

export default app
