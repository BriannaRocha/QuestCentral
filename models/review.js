import mongoose from "mongoose"

const Schema = mongoose.Schema


const reviewSchema = new Schema({
  name: {type: String, required: true}
},{
  timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

export {
  Review
}