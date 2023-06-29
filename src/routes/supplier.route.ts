import {
  create,
  getAll,
  update
} from '@/controllers/supplier.controller'
import { authorize } from '@/middlewares/auth.middeware'
import { validateBody } from '@/middlewares/validate.middleware'
import type { ISupplier } from '@/models/supplier.model'
import { validateSupplier } from '@/utils/validations'
import { Router } from 'express'
const router = Router()

router.get('/', getAll)

router.post(
  '/',
  authorize(['Sys.Admin']),
  validateBody<ISupplier>(validateSupplier),
  create
)
router.patch(
  '/:id',
  authorize(['Sys.Admin']),
  validateBody<ISupplier>(validateSupplier),
  update
)

// router.patch('/:id', update)

// router.delete('/:id', remove)

export default router
