import { getAll, create, update } from '@/controllers/company.controller'
import { authorize } from '@/middlewares/auth.middeware'
import { validateBody } from '@/middlewares/validate.middleware'
import { ICompany } from '@/models/company.model'
import { validateCompany } from '@/utils/validations'
import { Router } from 'express'
const router = Router()

router.get('/', authorize(), getAll)

router.post(
  '/',
  authorize(['Oper.Mamnager', 'Sys.Admin']),
  validateBody<ICompany>(validateCompany),
  create
)

router.patch('/:id', authorize(['Oper.Mamnager', 'Sys.Admin']), update)

// router.delete('/:id', remove)

export default router
