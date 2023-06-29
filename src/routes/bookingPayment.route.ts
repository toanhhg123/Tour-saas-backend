import {
  create,
  getByBookingId,
  remove,
  update
} from '@/controllers/bookingPayment.controller'
import { authorize } from '@/middlewares/auth.middeware'
import { validateBody } from '@/middlewares/validate.middleware'
import type { IBookingPayment } from '@/models/bookingPayment.model'
import { validateBookingPayment } from '@/utils/validations'
import { Router } from 'express'

const router = Router()

router.get('/booking/:id', authorize(), getByBookingId)

router.post(
  '/',
  validateBody<IBookingPayment>(validateBookingPayment),
  authorize(),
  create
)

router.patch(
  '/:id',
  validateBody<IBookingPayment>(validateBookingPayment),
  authorize(),
  update
)

router.delete('/:id', authorize(), remove)

export default router
