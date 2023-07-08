import { Router } from 'express'
import { authorize } from '@/middlewares/auth.middeware'
import otherServiceBookingController from '@/controllers/otherServiceBookingPayment.controller'

const { getAll, create, update, remove } =
  otherServiceBookingController

const router = Router()

router.get('/otherServiceBooking/:id', authorize(), getAll)
router.post('/', authorize(), create)
router.patch('/:id', authorize(), update)
router.delete('/:id', authorize(), remove)

export default router
