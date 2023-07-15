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
import express from 'express'

const router = express.Router()

router.use(authorize(['Sys.Admin', 'Agent.Sales']))

router.post(
  '/',
  validateBody<IBooking>(validateBooking),
  create
)

router.get('/tour/:tourId', getByTourId)

router.patch(
  '/:id',
  validateBody<IBooking>(validateBooking),
  update
)

router.delete('/:id', remove)

export default router
