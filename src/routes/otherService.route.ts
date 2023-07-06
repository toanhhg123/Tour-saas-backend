import { Router } from 'express'
import { authorize } from '@/middlewares/auth.middeware'
import otherServiceController from '@/controllers/otherService.controller'

const { getAll, create, update, remove } =
  otherServiceController

const router = Router()

router.get('/', authorize(), getAll)
router.post('/', authorize(), create)
router.patch('/', authorize(), update)
router.delete('/:id', authorize(), remove)

export default router
