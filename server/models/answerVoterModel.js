// require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/hacktivoverflow')
const Schema = mongoose.Schema

const answerVoterSchema = new Schema({
  answer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  },
  voter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  votedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  }
})

const AnswerVoter = mongoose.model('AnswerVoter', answerVoterSchema);
module.exports = AnswerVoter
