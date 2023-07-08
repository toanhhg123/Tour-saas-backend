import { Router } from 'express'
import { authorize } from '@/middlewares/auth.middeware'
import otherServiceBookingController from '@/controllers/otherServiceBooking.controller'
import { asyncHandler } from '@/middlewares/error.middleware'

const { getAll, create, update, remove } =
  otherServiceBookingController

const router = Router()

router.get(
  '/otherService/:id',
  authorize(),
  asyncHandler(getAll)
)
router.post('/', authorize(), asyncHandler(create))
router.patch('/', authorize(), asyncHandler(update))
router.delete('/:id', authorize(), asyncHandler(remove))

export default router
