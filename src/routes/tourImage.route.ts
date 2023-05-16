import { Router } from 'express'
import { create, remove } from '@/controllers/tourImage.controller'
import multer from 'multer'
import { validateBody } from '@/middlewares/validate.middleware'
import type { ITourImage } from '@/models/tourImage.model'
import { validateTourImage } from '@/utils/validations'

const router = Router()

// router.get('/:id', findOne)
const upload = multer()

router.post('/', upload.single('imageTour'), validateBody<ITourImage>(validateTourImage), create)

// router.patch('/:id', update)

router.delete('/:id/:idImageGoogle', remove)

export default router
