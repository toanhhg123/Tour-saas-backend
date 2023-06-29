import airbookingController from '@/controllers/airbooking.controller'
import { authorize } from '@/middlewares/auth.middeware'
import { asyncHandler } from '@/middlewares/error.middleware'
import { Router } from 'express'

const router = Router()

const { create, remove, update, getByTourId } =
  airbookingController

router.use(authorize())

router.get('/tour/:id', asyncHandler(getByTourId))
router.post('/', asyncHandler(create))
router.patch('/:id', asyncHandler(update))
router.delete('/:id', asyncHandler(remove))

export default router
