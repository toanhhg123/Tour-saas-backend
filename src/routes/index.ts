import {
  handleError,
  notFound
} from '@/middlewares/error.middleware'
import accountRoute from '@/routes/account.route'
import authRoute from '@/routes/auth.route'
import { type Express } from 'express'
import tourRoute from '@/routes/tour.route'
import supplierRoute from '@/routes/supplier.route'
import tourServiceRoute from '@/routes/tourService.route'
import bookingRoute from '@/routes/booking.route'
import companyRoute from '@/routes/company.route'
import bookingPaymentRoute from '@/routes/bookingPayment.route'
import visaGroupRoute from '@/routes/visaGroup.route'
import airBookingRoute from '@/routes/airBooking.route'
import otherServiceRoute from '@/routes/otherService.route'
import otherServiceBookingRoute from '@/routes/otherServiceBooking.route'
import otherServiceBookingPaymentRoute from '@/routes/otherServiceBookingPayment.route'
import visaBookingRoute from '@/routes/visaBooking.route'
import tourAgentSalesRoute from '@/routes/tourAgentSales.route'

const useRoutes = async (app: Express): Promise<void> => {
  app.use('/api/v1/account', accountRoute)
  app.use('/api/v1/auth', authRoute)
  app.use('/api/v1/tour', tourRoute)
  app.use('/api/v1/supplier', supplierRoute)
  app.use('/api/v1/tourService', tourServiceRoute)
  app.use('/api/v1/booking', bookingRoute)
  app.use('/api/v1/company', companyRoute)
  app.use('/api/v1/bookingPayment', bookingPaymentRoute)
  app.use('/api/v1/VisaGroup', visaGroupRoute)
  app.use('/api/v1/airBooking', airBookingRoute)
  app.use('/api/v1/otherService', otherServiceRoute)
  app.use(
    '/api/v1/otherServiceBooking',
    otherServiceBookingRoute
  )
  app.use(
    '/api/v1/otherServiceBookingPayment',
    otherServiceBookingPaymentRoute
  )
  app.use('/api/v1/visaBooking', visaBookingRoute)
  app.use('/api/v1/TourAgentSales', tourAgentSalesRoute)

  app.use(notFound)
  app.use(handleError)
}

export default useRoutes
