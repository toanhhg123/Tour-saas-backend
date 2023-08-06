import {
  create,
  findOne,
  getAll,
  update,
  getTourByManager,
  remove,
  getByListId,
  getToursByManager
} from '@/controllers/tour.controller'
import { authorize } from '@/middlewares/auth.middeware'
import { asyncHandler } from '@/middlewares/error.middleware'
import { validateBody } from '@/middlewares/validate.middleware'
import type { ITour } from '@/models/tour.model'
import { validateTour } from '@/utils/validations'
import { Router } from 'express'

const router = Router()

router.get('/withTourMan', getTourByManager)

router.get(
  '/withOperManager',
  authorize(['Oper.Mamnager']),
  asyncHandler(getToursByManager)
)

router.get('/listid', asyncHandler(getByListId))

router.get(
  '/:id',
  authorize(['Oper.TourMan', 'Oper.Mamnager']),
  findOne
)

router.get('/', authorize(), asyncHandler(getAll))
router.post(
  '/',
  authorize(['Sys.Admin', 'Oper.Mamnager']),
  validateBody<ITour>(validateTour),
  create
)

router.patch(
  '/:id',
  validateBody<ITour>(validateTour),
  update
)

router.delete('/:id', asyncHandler(remove))

export default router
