import {
  create,
  findOne,
  findeByIdAndEmail,
  getAll,
  getProfile,
  getByCompanyId,
  getAccountsByRoles,
  searchEmail,
  countUser,
  remove,
  update
} from '@/controllers/account.controller'
import { validateAccount } from '@/utils/validations'
import { Router } from 'express'
import { validateBody } from '../middlewares/validate.middleware'
import { authorize } from '@/middlewares/auth.middeware'
import { asyncHandler } from '@/middlewares/error.middleware'
const router = Router()

router.get('/search', asyncHandler(searchEmail))

router.get('/role', asyncHandler(getAccountsByRoles))

router.get('/count', asyncHandler(countUser))

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

router.get('/', authorize(), asyncHandler(getAll))

router.post(
  '/',
  validateBody(validateAccount),
  authorize(),
  asyncHandler(create)
)

//patch

router.patch(
  '/:id',
  validateBody(validateAccount),
  authorize(),
  asyncHandler(update)
)

router.delete('/:id', remove)

export default router
