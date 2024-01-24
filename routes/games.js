import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

// GET localhost:3000/games
router.get('/', gamesCtrl.index)
// POST localhost:3000/games
router.post('/', isLoggedIn, gamesCtrl.create)
// GET localhost:3000/games
router.get('/:gameId', gamesCtrl.show)
// GET localhost:3000/games/:gameId/edit
router.get('/:gameId/edit', isLoggedIn, gamesCtrl.edit)
// PUT localhost:3000/games/:gameId
router.put('/:gameId', isLoggedIn, gamesCtrl.update)
// DELETE localhost:3000/games/:gameId
router.delete('/:gameId', isLoggedIn, gamesCtrl.delete)
// POST localhost:3000/games/:gameId/notes
router.post('/:gameId/notes', isLoggedIn, gamesCtrl.addNote)
// POST localhost:3000/games/:gameId/notes
router.get('/:gameId/notes/:noteId/edit', isLoggedIn, gamesCtrl.editNote)
// PUT localhost:3000/games/:gameId/notes/:noteId
router.put('/:gameId/ntoes/:noteId', isLoggedIn, gamesCtrl.updateNote)
// DELETE localhost:3000/games/:gameId/notes/:noteId
router.delete('/:gameId/notes/:noteId', isLoggedIn, gamesCtrl.deleteNote)

export {
  router
}