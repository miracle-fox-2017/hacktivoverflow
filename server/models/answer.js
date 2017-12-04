require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
  name: String,
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
  upVote: [],
  downVote: [],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer;