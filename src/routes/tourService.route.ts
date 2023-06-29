import {
  create,
  remove,
  update,
  findOne
} from '@/controllers/tourService.controller'
import { validateBody } from '@/middlewares/validate.middleware'
import { type ITourService } from '@/models/tourService.model'
import { validateTourService } from '@/utils/validations'
import { Router } from 'express'

const router = Router()

router.post(
  '/',
  validateBody<ITourService>(validateTourService),
  create
)

router.get('/:id', findOne)
router.patch(
  '/:id',
  validateBody<ITourService>(validateTourService),
  update
)

router.delete('/:id', remove)

export default router
