const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


let questionSchema = new Schema({
  title: {
    type: String
  },
  question: {
    type: String,
    required: true
  },
  answer: [{
    type: String,
    ref: 'answers'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  unlikes: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]

})

let Question = mongoose.model('questions', questionSchema)
module.exports = Question