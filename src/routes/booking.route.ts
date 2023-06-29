import {
  create,
  remove,
  update,
  getByTourId
} from '@/controllers/booking.controller'
import { authorize } from '@/middlewares/auth.middeware'
import { validateBody } from '@/middlewares/validate.middleware'
import type { IBooking } from '@/models/booking.model'
import { validateBooking } from '@/utils/validations'
import { Router } from 'express'

const router = Router()

router.post(
  '/',
  validateBody<IBooking>(validateBooking),
  authorize(['Sys.Admin']),
  create
)
router.get(
  '/tour/:tourId',
  authorize(['Sys.Admin']),
  getByTourId
)
router.patch(
  '/:id',
  validateBody<IBooking>(validateBooking),
  authorize(['Sys.Admin']),
  update
)
router.delete('/:id', authorize(['Sys.Admin']), remove)

export default router
