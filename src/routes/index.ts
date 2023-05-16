import { type Express } from 'express'
import locationRoute from '@/routes/location.route'
import tourRoute from '@/routes/tour.route'
import tourImageRoute from '@/routes/tourImage.route'
import { notFound, handleError } from '@/middlewares/error.middleware'

const useRoutes = (app: Express): void => {
  app.use('/api/v1/location', locationRoute)
  app.use('/api/v1/tour', tourRoute)
  app.use('/api/v1/tourImage', tourImageRoute)

  app.use(notFound)
  app.use(handleError)
}

export default useRoutes
