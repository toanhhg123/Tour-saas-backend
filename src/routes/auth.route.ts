import {
  createRole,
  getAllRole,
  createPremisstion,
  finOneRole,
  login,
  refreshToken,
  logout
} from '@/controllers/auth.controller'
import { validateBody } from '@/middlewares/validate.middleware'
import { validatePermission, validateRole } from '@/utils/validations'
import { Router } from 'express'
import { validateAuthRequest } from '../utils/validations'
import { authorize } from '@/middlewares/auth.middeware'
const router = Router()

// router.get('/:id', findOne)

router.get('/roles', getAllRole)
router.get('/role/:id', finOneRole)

router.post('/refreshToken', refreshToken)
router.post('/logout', authorize(), logout)

router.post('/role', validateBody(validateRole), createRole)

router.post('/login', validateBody(validateAuthRequest), login)

router.post('/permission', validateBody(validatePermission), createPremisstion)

// router.patch('/:id', update)

// router.delete('/:id', remove)

export default router
