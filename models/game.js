import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema = new Schema({
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const gameSchema = new Schema({
  name: String,
  status: {
    type: String,
    enum: ['Interested', 'Currently Playing', 'Completed'],
    default: 'Currently Playing'
  },
  platform: {
    type: String,
    enum: ['Mobile', 'Nintendo', 'PC', 'Playstation', 'Xbox', 'Other'],
    default: 'PC'
  },
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  notes: [noteSchema],
  completedDate: Date
}, {
  timestamps: true,
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}