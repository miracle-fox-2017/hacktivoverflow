const mongoose = require('mongoose');

var QuestionSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: String,
  question: String,
  createdAt: {type: Date, default: Date.now}
})

var Question = mongoose.model('Question', QuestionSchema)

module.exports = Question