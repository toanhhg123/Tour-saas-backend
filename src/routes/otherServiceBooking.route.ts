import { Router } from 'express'
import { authorize } from '@/middlewares/auth.middeware'
import otherServiceBookingController from '@/controllers/otherServiceBooking.controller'

const { getAll, create, update, remove } =
  otherServiceBookingController

const router = Router()

router.get('/otherService/:id', authorize(), getAll)
router.post('/', authorize(), create)
router.patch('/', authorize(), update)
router.delete('/:id', authorize(), remove)

export default router
