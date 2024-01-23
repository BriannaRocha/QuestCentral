import mongoose from 'mongoose'

const Schema = mongoose.Schema

const gameSchema = new Schema({
  name: String,
  status: {
    type: String,
    enum: ['Interested', 'Currently Playing', 'Completed'],
    default: 'Currently Playing'
  },
  platform: {
    type: String,
    enum: ['Mobile','Nintendo','PC', 'Playstation', 'Xbox'],
    default: 'PC'
  },
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
  timestamps: true,
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}