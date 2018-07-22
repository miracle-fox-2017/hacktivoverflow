// require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/hacktivoverflow')
const Schema = mongoose.Schema

const questionVoterSchema = new Schema({
  question: {
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

questionVoterSchema.index({ question: 1, voter: 1 }, { unique: true })

const QuestionVoter = mongoose.model('QuestionVoter', questionVoterSchema)
module.exports = QuestionVoter
