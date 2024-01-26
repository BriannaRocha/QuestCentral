import mongoose from 'mongoose'

const Schema = mongoose.Schema

const gamertagSchema = new Schema({
  name: String,
  platform: {
    type: String,
    enum: ['Apple', 'Epic Games', 'Google', 'Nintendo', 'Playstation', 'Steam', 'Ubisoft', 'Xbox'],
    default: 'Steam'
  },
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  gamertags: [gamertagSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}