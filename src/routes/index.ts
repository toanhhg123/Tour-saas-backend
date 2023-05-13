import { type Express } from 'express'
import locationRoute from '@/routes/location.route'
import { notFound, handleError } from '@/middlewares/error.middleware'

const useRoutes = (app: Express): void => {
  app.use('/api/v1/location', locationRoute)

  app.use(notFound)
  app.use(handleError)
}

export default useRoutes
