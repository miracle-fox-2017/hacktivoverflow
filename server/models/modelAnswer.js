const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let answerSchema = new Schema({
  answer: {
    type: String
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'questions'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  unlikes: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]
})

let Answer = mongoose.model('answers', answerSchema)
module.exports = Answer