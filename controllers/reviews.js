import { Review } from "../models/review.js"
import { Game } from "../models/game.js"

function newReview(req, res) {
  Game.findById(req.params.gameId)
  .populate('owner')
  .then(game => {
    const isSelf = game.owner._id.equals(req.user.profile._id)
    res.render('reviews/new', {
      game,
      title: "Add Game Review",
      isSelf
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function index(req, res) {
  Review.find({})
  .populate('owner')
  .populate('game')
  .then(reviews => {
    res.render('reviews/index', {
      reviews,
      title: 'Video Game Reviews'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.recommended = !!req.body.recommended
  Review.create(req.body)
  .then(review => {
    res.redirect('/reviews')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/reviews')
  })
}

function edit(req, res) {
  Review.findById(req.params.reviewId)
  .populate('owner')
  .populate('game')
  .then(review => {
    const isSelf = review.owner._id.equals(req.user.profile._id)
    res.render('reviews/edit', {
      review,
      title: 'Edit Review',
      isSelf
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/reviews')
  })
}

function update(req, res) {
  Review.findById(req.params.reviewId)
  .then(review => {
    if (review.owner.equals(req.user.profile._id)) {
      req.body.recommended = !!req.body.recommended
      review.updateOne(req.body)
      .then(() => {
        res.redirect('/reviews')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/reviews')
  })
}

function deleteReview(req, res) {
  Review.findById(req.params.reviewId)
  .then(review => {
    if (review.owner.equals(req.user.profile._id)) {
      review.deleteOne()
      .then(() => {
        res.redirect('/reviews')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect('/reviews')
  })
}

export {
  newReview as new,
  index,
  create,
  edit,
  update,
  deleteReview as delete
}