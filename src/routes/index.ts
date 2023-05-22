import { handleError, notFound } from '@/middlewares/error.middleware'
import accountRoute from '@/routes/account.route'
import authRoute from '@/routes/auth.route'
import { type Express } from 'express'

const useRoutes = async (app: Express): Promise<void> => {
  app.use('/api/v1/account', accountRoute)

  app.use('/api/v1/auth', authRoute)
  // app.use('/api/v1/tourImage', tourImageRoute)
  // app.use('/api/v1/tourService', tourServiceRoute)

  app.use(notFound)
  app.use(handleError)
}

export default useRoutes
