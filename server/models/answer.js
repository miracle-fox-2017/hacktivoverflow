const mongoose = require('mongoose')
const Schema = mongoose.Schema

var answerSchema = new Schema({

  content: {
    type: String,
    required: [true, 'content is required']
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  by: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'Answer author is required']
  },

  question: {
    type: Schema.Types.ObjectId,
    ref: 'questions',
    required: [true, 'question id is required']
  },

  voters: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]

})

var answer = mongoose.model('answers', answerSchema)

module.exports = answer;
