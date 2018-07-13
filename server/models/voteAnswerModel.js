const mongoose = require('mongoose');

var VoteAnswerSchema = mongoose.Schema({
  answerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer'},  
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  vote: Boolean,
  createdAt: {type: Date, default: Date.now}
})

VoteAnswerSchema.index({ answerId: 1, userId: 1}, { unique: true });

var VoteAnswer = mongoose.model('VoteAnswer', VoteAnswerSchema)

module.exports = VoteAnswer