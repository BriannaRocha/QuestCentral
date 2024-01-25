import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  name: String,
  avatar: String,
  content: {type: String, required: true},
  rating: {
    type: Number,
    min: 1,
    max: 10
  }, 
  recommended: Boolean,
  game: {type: Schema.Types.ObjectId, ref: "Game"},
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true,
})

const Review = mongoose.model('Review', reviewSchema)

export {
  Review
}