import { Router } from 'express'
import * as pedalboardCtrl from '../controllers/pedals.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()


/*---------- Public Routes ----------*/
router.get('/', pedalboardCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, pedalboardCtrl.create)
router.delete('/:id', checkAuth, pedalboardCtrl.delete)
router.put('/:id', checkAuth, pedalboardCtrl.update)



export{
  router
}