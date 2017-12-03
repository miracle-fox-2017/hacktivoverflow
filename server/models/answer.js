require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  answer: String,
  image: String,
  vote: [],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer;