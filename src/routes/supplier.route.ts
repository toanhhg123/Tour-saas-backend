import {
  create,
  getAll,
  update,
  getSupplierByOperator
} from '@/controllers/supplier.controller'
import { authorize } from '@/middlewares/auth.middeware'
import { validateBody } from '@/middlewares/validate.middleware'
import { validateSupplier } from '@/utils/validations'
import { Router } from 'express'

const router = Router()

router.get(
  '/oper',
  authorize(['Oper.Sales']),
  getSupplierByOperator
)

router.get('/', getAll)

router.post(
  '/',
  authorize(['Oper.Sales']),
  validateBody(validateSupplier),
  create
)

router.patch(
  '/:id',
  authorize(['Oper.Sales']),
  validateBody(validateSupplier),
  update
)

// router.delete('/:id', remove)

export default router
