import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'
const router = Router()

// GET http://localhost:3000/profiles
router.get('/', isLoggedIn, profilesCtrl.index)
// GET http://localhost:3000/profiles/:profileId
router.get('/:profileId', isLoggedIn, profilesCtrl.show)
// POST http://localhost:3000/profiles/gamertags
router.post('/gamertags', isLoggedIn, profilesCtrl.createGamertag)
// DELETE http://localhost:3000/profiles/gamertags/:gamertagId
router.delete('/gamertags/:gamertagId', isLoggedIn, profilesCtrl.deleteGamertag)

export {
  router
}