import {
  create,
  remove,
  update,
  getByTourId,
  getByTourMan,
  getBookingSalesWithTourMan
} from '@/controllers/booking.controller'
import { authorize } from '@/middlewares/auth.middeware'
import { asyncHandler } from '@/middlewares/error.middleware'
import { validateBody } from '@/middlewares/validate.middleware'
import type { IBooking } from '@/models/booking.model'
import { validateBooking } from '@/utils/validations'
import express from 'express'

const router = express.Router()

router.use(
  authorize([
    'Sys.Admin',
    'Agent.Sales',
    'Oper.TourMan',
    'Oper.Mamnager'
  ])
)

router.post(
  '/',
  validateBody<IBooking>(validateBooking),
  asyncHandler(create)
)

router.get('/tour/:tourId', asyncHandler(getByTourId))

router.get('/tourman/:tourId', asyncHandler(getByTourMan))

router.get(
  '/bookingsales/:tourId/:saleId',
  asyncHandler(getBookingSalesWithTourMan)
)

router.patch(
  '/:id',
  validateBody<IBooking>(validateBooking),
  asyncHandler(update)
)

router.delete('/:id', asyncHandler(remove))

export default router
