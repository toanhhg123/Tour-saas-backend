import {
  create,
  getByBookingId,
  remove,
  update
} from '@/controllers/bookingPayment.controller'
import { authorize } from '@/middlewares/auth.middeware'
import { validateBody } from '@/middlewares/validate.middleware'
import { IBookingPayment } from '@/models/bookingPayment.model'
import { validateBookingPayment } from '@/utils/validations'
import { Router } from 'express'

const router = Router()

router.get('/booking/:id', authorize(['Sys.Admin']), getByBookingId)

router.post(
  '/',
  validateBody<IBookingPayment>(validateBookingPayment),
  authorize(['Sys.Admin']),
  create
)

router.patch(
  '/:id',
  validateBody<IBookingPayment>(validateBookingPayment),
  authorize(['Sys.Admin']),
  update
)

router.delete('/:id', authorize(['Sys.Admin']), remove)

export default router
