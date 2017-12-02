const mongoose = require('mongoose');

var VoteSchema = mongoose.Schema({
  answerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer', unique: true},  
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  vote: Boolean,
  createdAt: {type: Date, default: Date.now}
})

var Vote = mongoose.model('Vote', VoteSchema)

module.exports = Vote