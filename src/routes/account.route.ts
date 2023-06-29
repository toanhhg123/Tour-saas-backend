import {
  create,
  findOne,
  findeByIdAndEmail,
  getAll,
  getProfile,
  getByCompanyId,
  update,
  getAccountsByRoles,
  searchEmail
} from '@/controllers/account.controller'
import { validateAccount } from '@/utils/validations'
import type {
  NextFunction,
  Request,
  Response
} from 'express'
import { Router } from 'express'
import { validateBody } from '../middlewares/validate.middleware'
import type { TypeRole } from '@/types/IAuthType'
import { authorize } from '@/middlewares/auth.middeware'
import { asyncHandler } from '@/middlewares/error.middleware'
const router = Router()

const mapTypeRole =
  (typeRole: TypeRole) =>
  (req: Request, _res: Response, next: NextFunction) => {
    req.query.typeRole = typeRole
    next()
  }

router.get('/search', asyncHandler(searchEmail))
router.get('/role', asyncHandler(getAccountsByRoles))
router.get(
  '/profile',
  authorize(),
  asyncHandler(getProfile)
)
router.get(
  '/findOne',
  authorize(),
  asyncHandler(findeByIdAndEmail)
)
router.get(
  '/company/:companyid',
  authorize(),
  asyncHandler(getByCompanyId)
)

router.get('/:id', findOne)
router.get(
  '/',
  authorize(['Sys.Admin']),
  asyncHandler(getAll)
)

router.post(
  '/sys-admin',
  validateBody(validateAccount),
  authorize(['Sys.Admin']),
  mapTypeRole('Sys.Admin'),
  asyncHandler(create)
)

router.post(
  '/oper-admin',
  validateBody(validateAccount),
  authorize(['Sys.Admin']),
  mapTypeRole('Oper.Admin'),
  asyncHandler(create)
)

router.post(
  '/oper-manager',
  validateBody(validateAccount),
  authorize(['Sys.Admin', 'Sys.Admin']),
  mapTypeRole('Oper.Mamnager'),
  asyncHandler(create)
)

router.post(
  '/oper-sales',
  validateBody(validateAccount),
  authorize(['Oper.Mamnager', 'Sys.Admin']),
  mapTypeRole('Oper.Sales'),
  asyncHandler(create)
)

router.post(
  '/oper-tourMan',
  validateBody(validateAccount),
  authorize(['Oper.Mamnager', 'Sys.Admin']),
  mapTypeRole('Oper.TourMan'),
  asyncHandler(create)
)

router.post(
  '/client',
  validateBody(validateAccount),
  authorize(['Client', 'Sys.Admin']),
  mapTypeRole('Client'),
  asyncHandler(create)
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
  asyncHandler(update)
)

router.patch(
  '/oper-sales/:id',
  validateBody(validateAccount),
  authorize(['Oper.Mamnager', 'Sys.Admin']),
  mapTypeRole('Oper.Sales'),
  asyncHandler(update)
)

router.patch(
  '/oper-tourMan/:id',
  validateBody(validateAccount),
  authorize(['Oper.Mamnager', 'Sys.Admin']),
  mapTypeRole('Oper.TourMan'),
  asyncHandler(update)
)

router.patch(
  '/client/:id',
  validateBody(validateAccount),
  authorize(['Client', 'Sys.Admin']),
  mapTypeRole('Client'),
  asyncHandler(update)
)

// router.delete('/:id', remove)

export default router
