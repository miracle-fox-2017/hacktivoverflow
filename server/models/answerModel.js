const mongoose = require('mongoose')
const Schema   = mongoose.Schema

var answerSchema = new Schema({
  text: String,
	createdAt: Date,
  updatedAt: Date,
  user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User'
  },
  question_id: {
		type: Schema.Types.ObjectId,
		ref: 'Question'
  },
  voter_id: [{
    type: Schema.Types.ObjectId,
		ref: 'User'
  }]
})

var Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer
