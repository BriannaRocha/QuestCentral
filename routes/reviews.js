import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js'
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()

// GET http://localhost:3000/reviews/new
router.get('/new', reviewsCtrl.new)
// POST localhost:3000/reviews
router.post('/', isLoggedIn, reviewsCtrl.create)
// GET localhost:3000/reviews
router.get('/', reviewsCtrl.index)
// GET localhost:3000/reviews/:reviewId/edit
router.get('/:reviewId/edit', isLoggedIn, reviewsCtrl.edit)
// PUT localhost:3000/reviews/:reviewId
router.put('/:reviewId', isLoggedIn, reviewsCtrl.update)
// DELETE localhost:3000/reviews/:reviewId
router.delete('/:reviewId', isLoggedIn, reviewsCtrl.delete)

export {
  router
}