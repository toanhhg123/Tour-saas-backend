import { create, findOne, getAll } from '@/controllers/account.controller'
import { validateAccount } from '@/utils/validations'
import type { NextFunction, Request, Response } from 'express'
import { Router } from 'express'
import { validateBody } from '../middlewares/validate.middleware'
import type { TypeRole } from '@/types/IAuthType'
import { authorize } from '@/middlewares/auth.middeware'
const router = Router()

const mapTypeRole = (typeRole: TypeRole) => (req: Request, _res: Response, next: NextFunction) => {
  req.query['typeRole'] = typeRole
  next()
}

router.get('/:id', findOne)

router.get('/', authorize(['Sys.Admin']), getAll)

router.post('/oper-admin', validateBody(validateAccount), mapTypeRole('Oper.Admin'), create)
router.post('/oper-sales', validateBody(validateAccount), mapTypeRole('Oper.Sales'), create)

// router.patch('/:id', update)

// router.delete('/:id', remove)

export default router
