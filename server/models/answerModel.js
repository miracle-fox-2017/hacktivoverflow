const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = Schema(
  {
    title: String,
    content: String,
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    userAnswer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    voteAnswer: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    voteCount: Number,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }
)

let Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer
