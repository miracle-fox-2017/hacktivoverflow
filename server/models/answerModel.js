const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  body : String,
  like : { type: Number, default: 0 },
  dislike : { type: Number, default: 0 },
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  answer_id: {
    type: Schema.ObjectId,
    ref: 'Answer'
  }
});

module.exports = mongoose.model('Answer', answerSchema);
