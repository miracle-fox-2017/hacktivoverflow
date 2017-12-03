require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  question: String,
  image: String,
  vote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }, {
    type: Number,
    default: 0
  }],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question;