import {
  create,
  findOne,
  findeByIdAndEmail,
  getAll,
  getProfile,
  getByCompanyId,
  update,
  getAccountsByRoles
} from '@/controllers/account.controller'
import { validateAccount } from '@/utils/validations'
import type { NextFunction, Request, Response } from 'express'
import { Router } from 'express'
import { validateBody } from '../middlewares/validate.middleware'
import type { TypeRole } from '@/types/IAuthType'
import { authorize } from '@/middlewares/auth.middeware'
const router = Router()

const mapTypeRole =
  (typeRole: TypeRole) =>
  (req: Request, _res: Response, next: NextFunction) => {
    req.query['typeRole'] = typeRole
    next()
  }

router.get('/role', getAccountsByRoles)
router.get('/profile', authorize(), getProfile)
router.get('/findOne', authorize(), findeByIdAndEmail)
router.get('/company/:companyid', authorize(), getByCompanyId)

router.get('/:id', findOne)
router.get('/', authorize(['Sys.Admin']), getAll)

router.post(
  '/sys-admin',
  validateBody(validateAccount),
  authorize(['Sys.Admin']),
  mapTypeRole('Sys.Admin'),
  create
)

router.post(
  '/oper-admin',
  validateBody(validateAccount),
  authorize(['Sys.Admin']),
  mapTypeRole('Oper.Admin'),
  create
)

router.post(
  '/oper-manager',
  validateBody(validateAccount),
  authorize(['Sys.Admin', 'Sys.Admin']),
  mapTypeRole('Oper.Mamnager'),
  create
)

router.post(
  '/oper-sales',
  validateBody(validateAccount),
  authorize(['Oper.Mamnager', 'Sys.Admin']),
  mapTypeRole('Oper.Sales'),
  create
)

router.post(
  '/oper-tourMan',
  validateBody(validateAccount),
  authorize(['Oper.Mamnager', 'Sys.Admin']),
  mapTypeRole('Oper.TourMan'),
  create
)

router.post(
  '/client',
  validateBody(validateAccount),
  authorize(['Client', 'Sys.Admin']),
  mapTypeRole('Client'),
  create
)

//patch
router.patch(
  '/sys-admin/:id',
  validateBody(validateAccount),
  authorize(['Sys.Admin']),
  mapTypeRole('Sys.Admin'),
  update
)

router.patch(
  '/oper-admin/:id',
  validateBody(validateAccount),
  authorize(['Sys.Admin']),
  mapTypeRole('Oper.Admin'),
  update
)

router.patch(
  '/oper-manager/:id',
  validateBody(validateAccount),
  authorize(['Sys.Admin', 'Sys.Admin']),
  mapTypeRole('Oper.Mamnager'),
  update
)

router.patch(
  '/oper-sales/:id',
  validateBody(validateAccount),
  authorize(['Oper.Mamnager', 'Sys.Admin']),
  mapTypeRole('Oper.Sales'),
  update
)

router.patch(
  '/oper-tourMan/:id',
  validateBody(validateAccount),
  authorize(['Oper.Mamnager', 'Sys.Admin']),
  mapTypeRole('Oper.TourMan'),
  update
)

router.patch(
  '/client/:id',
  validateBody(validateAccount),
  authorize(['Client', 'Sys.Admin']),
  mapTypeRole('Client'),
  update
)

// router.delete('/:id', remove)

export default router
