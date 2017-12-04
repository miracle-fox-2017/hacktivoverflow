require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
  name: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  question: String,
  image: String,
  upVote: [],
  downVote: [],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question;