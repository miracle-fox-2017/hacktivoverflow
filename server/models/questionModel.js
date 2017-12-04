const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title : { type: String },
  body : String,
  like : {
    type: Schema.ObjectId,
    ref: 'User'
  },
  dislike : {
    type: Schema.ObjectId,
    ref: 'User'
  },
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  answers_id: [{
    type: Schema.ObjectId,
    ref: 'Answer'
  }],
  rating: {type: Number, default: 0},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
