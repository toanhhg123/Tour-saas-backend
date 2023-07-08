import { Router } from 'express'
import { authorize } from '@/middlewares/auth.middeware'
import otherServiceController from '@/controllers/otherService.controller'
import { asyncHandler } from '@/middlewares/error.middleware'

const { getAll, create, update, remove } =
  otherServiceController

const router = Router()

router.get('/', authorize(), asyncHandler(getAll))
router.post('/', authorize(), asyncHandler(create))
router.patch('/:id', authorize(), asyncHandler(update))
router.delete('/:id', authorize(), asyncHandler(remove))

export default router
