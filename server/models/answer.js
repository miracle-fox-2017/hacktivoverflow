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
  vote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },{
    type: Number,
    default: 0
  }],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer;