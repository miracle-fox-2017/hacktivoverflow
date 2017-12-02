const mongoose = require('mongoose');

var AnswerSchema = mongoose.Schema({
  questionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  answer: String,
  createdAt: {type: Date, default: Date.now}
})

var Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer