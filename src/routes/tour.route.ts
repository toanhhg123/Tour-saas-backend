import { create, findOne, getAll, getTourByManager } from '@/controllers/tour.controller'
import { authorize } from '@/middlewares/auth.middeware'
import { validateBody } from '@/middlewares/validate.middleware'
import type { ITour } from '@/models/tour.model'
import { validateTour } from '@/utils/validations'
import { Router } from 'express'
const router = Router()

router.get('/:id', findOne)

router.get('/', getAll)
router.get('/withTourMan', getTourByManager)

router.post('/', authorize(['Sys.Admin', 'Oper.Mamnager']), validateBody<ITour>(validateTour), create)

// router.patch('/:id', update)

// router.delete('/:id', remove)

export default router
