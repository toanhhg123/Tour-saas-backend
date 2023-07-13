import visaBookingController from '@/controllers/visaBooking.controller'
import { authorize } from '@/middlewares/auth.middeware'
import { asyncHandler } from '@/middlewares/error.middleware'
import { Router } from 'express'

const router = Router()

const { getByVisaGrId, update, remove, create } =
  visaBookingController

router.get(
  '/visa/:id',
  authorize(),
  asyncHandler(getByVisaGrId)
)

router.post('/', authorize(), asyncHandler(create))

router.get('/:id', authorize(), asyncHandler(update))

router.delete('/:id', authorize(), asyncHandler(remove))

export default router
