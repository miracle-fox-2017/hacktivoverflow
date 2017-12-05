const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  body : String,
  like : [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  dislike : [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  question_id: {
    type: Schema.ObjectId,
    ref: 'Answer'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Answer', answerSchema);
