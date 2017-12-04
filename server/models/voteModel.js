const mongoose = require('mongoose');

var VoteSchema = mongoose.Schema({
  answerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer'},  
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  vote: Boolean,
  createdAt: {type: Date, default: Date.now}
})

VoteSchema.index({ answerId: 1, userId: 1}, { unique: true });

var Vote = mongoose.model('Vote', VoteSchema)

module.exports = Vote