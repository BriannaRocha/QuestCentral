import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js'

const router = Router()

// GET localhost:3000/reviews/new
// router.get('/new', reviewsCtrl.new)
// POST localhost:3000/reviews
router.post('/', reviewsCtrl.create)

export {
  router
}