import {
  create,
  getAll,
  remove,
  update
} from '@/controllers/visaGroup.controller'
import { authorize } from '@/middlewares/auth.middeware'

import { Router } from 'express'

const router = Router()

router.get('/', authorize(), getAll)

router.post('/', authorize(), create)

router.patch('/:id', authorize(), update)

router.delete('/:id', authorize(), remove)

export default router
