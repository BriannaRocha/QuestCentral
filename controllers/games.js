import { Game } from "../models/game.js"
import { Review } from "../models/review.js"

function index(req, res) {
  Game.find({})
  .then(games => {
    res.render('games/index', {
      games,
      title: "Game"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}







export {
  index,
}