import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.findById(req.user.profile._id)
    .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profiles/index', {
      title: `${profile.name}'s profile`,
      profile,
      isSelf,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createGamertag(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.gamertags.push(req.body)
    profile.save()
    .then(() => {
      res.redirect('/profiles')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

function deleteGamertag(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.gamertags.remove({_id: req.params.gamertagId})
    profile.save()
    .then(() => {
      res.redirect('/profiles')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

export {
  index,
  createGamertag,
  deleteGamertag
}