// require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/hacktivoverflow')
const Schema = mongoose.Schema

const userSchema = new Schema({
  facebookId: String,
  name: {
      type: String
  },
  gender: {
      type: String,
      enum: ['male', 'female']
  },
  picture: {
      type: String
  },
  email: {
      type: String
  },
  isAdmin: {
      type: Boolean,
      default: false
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  updatedAt: {
      type: Date,
      default: null
  },
})

const User = mongoose.model('User', userSchema);
module.exports = User
