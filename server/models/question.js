const mongoose = require('mongoose')
const Schema = mongoose.Schema

var questionSchema = new Schema({

  title: {
    type: String,
    required: [true, 'title is required']
  },

  content: {
    type: String,
    required: [true, 'content is required']
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  voters: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]

})

var question = mongoose.model('questions', questionSchema)

module.exports = question;
