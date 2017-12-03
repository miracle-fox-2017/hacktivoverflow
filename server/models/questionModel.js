const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title : { type: String },
  body : String,
  like : { type: Number, default: 0 },
  dislike : { type: Number, default: 0 },
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  answers_id: [{
    type: Schema.ObjectId,
    ref: 'Answer'
  }]
});

module.exports = mongoose.model('Question', questionSchema);
