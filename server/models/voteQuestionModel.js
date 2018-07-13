const mongoose = require('mongoose');

var VoteQuestionSchema = mongoose.Schema({
  questionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},  
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  vote: Boolean,
  createdAt: {type: Date, default: Date.now}
})

VoteQuestionSchema.index({ questionId: 1, userId: 1}, { unique: true });

var VoteQuestion = mongoose.model('VoteQuestion', VoteQuestionSchema)

module.exports = VoteQuestion