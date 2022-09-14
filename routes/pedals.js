import { Router } from 'express'
import * as pedalsCtrl from '../controllers/pedals.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, pedalsCtrl.create)

export {
  router
}