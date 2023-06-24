import { handleError, notFound } from '@/middlewares/error.middleware'
import accountRoute from '@/routes/account.route'
import authRoute from '@/routes/auth.route'
import { type Express } from 'express'
import tourRoute from '@/routes/tour.route'
import supplierRoute from '@/routes/supplier.route'
import tourServiceRoute from '@/routes/tourService.route'
import bookingRoute from '@/routes/booking.route'
import companyRoute from '@/routes/company.route'
import bookingPaymentRoute from '@/routes/bookingPayment.route'

const useRoutes = async (app: Express): Promise<void> => {
  app.use('/api/v1/account', accountRoute)
  app.use('/api/v1/auth', authRoute)
  app.use('/api/v1/tour', tourRoute)
  app.use('/api/v1/supplier', supplierRoute)
  app.use('/api/v1/tourService', tourServiceRoute)
  app.use('/api/v1/booking', bookingRoute)
  app.use('/api/v1/company', companyRoute)
  app.use('/api/v1/bookingPayment', bookingPaymentRoute)
  app.use(notFound)
  app.use(handleError)
}

export default useRoutes
