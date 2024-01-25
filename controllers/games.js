import { Game } from "../models/game.js"
import { Review } from "../models/review.js"

function newGame(req, res) {
  res.render('games/new', {
    title: 'Add Game'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Game.create(req.body)
  .then(game => {
    res.redirect('/games')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function index(req, res) {
  Game.find({owner: req.user.profile._id})
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

function show(req, res) {
  Game.findById(req.params.gameId)
  .populate('owner')
  .then(game => {
    res.render('games/show', {
      game,
      title: "Game show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function edit(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    res.render('games/edit', {
      game,
      title: "edit game"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function update(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    if (game.owner.equals(req.user.profile._id)) {
      game.updateOne(req.body)
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function deleteGame(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    if (game.owner.equals(req.user.profile._id)) {
      game.deleteOne()
      .then(() => {
        res.redirect('/games')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function addNote(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    req.body.author = req.user.profile._id
    game.notes.push(req.body)
    game.save()
    .then(()=> {
      res.redirect(`/games/${game._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/games')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function editNote(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    const note = game.notes.id(req.params.noteId)
    if (note.author.equals(req.user.profile._id)) {
      res.render('games/editNote',{
        game,
        note,
        title: 'Update Note'
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function updateNote(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    const note = game.notes.id(req.params.noteId)
    if (note.author.equals(req.user.profile._id)) {
      note.set(req.body)
      game.save()
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/games')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function deleteNote(req, res) {
  Game.findById(req.params.gameId)
  .then(game => {
    const note = game.notes.id(req.params.noteId)
    if (note.author.equals(req.user.profile._id)) {
      game.notes.remove(note)
      game.save()
      .then(() => {
        res.redirect(`/games/${game._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/games')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

export {
  newGame as new,
  create,
  index,
  show,
  edit,
  update,
  deleteGame as delete,
  addNote,
  editNote,
  updateNote,
  deleteNote
}