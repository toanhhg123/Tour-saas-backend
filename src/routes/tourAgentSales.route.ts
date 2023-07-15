import tourAgentSalesController from '@/controllers/tourAgentSales.controller'
import { authorize } from '@/middlewares/auth.middeware'
import { asyncHandler } from '@/middlewares/error.middleware'
import { validateBody } from '@/middlewares/validate.middleware'
import { validateTourAgentSales } from '@/utils/validations'

import { Router } from 'express'

const router = Router()

const { create, remove, getByTourId, getBySaleId } =
  tourAgentSalesController

router.use(
  authorize([
    'Oper.TourMan',
    'Sys.Admin',
    'Agent.Sales',
    'Oper.Sales'
  ])
)

router.get('/tour/:id', asyncHandler(getByTourId))
router.get('/sales', asyncHandler(getBySaleId))

router.post(
  '/',
  validateBody(validateTourAgentSales),
  asyncHandler(create)
)

router.delete('/:id', asyncHandler(remove))

export default router
