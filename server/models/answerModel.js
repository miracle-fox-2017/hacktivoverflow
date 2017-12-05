// require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/hacktivoverflow')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  answerer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
      type: String
  },
  // vote: [{
  //     voter: [{
  //       type: Schema.Types.ObjectId,
  //       ref: 'User'
  //     }]
  // }],
  answerAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
      type: Date,
      default: null
  }
})

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer
