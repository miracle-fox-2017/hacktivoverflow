const mongoose = require('mongoose')
const Schema   = mongoose.Schema

var questionSchema = new Schema({
  title: String,
  text: String, 
	category: String,
	createdAt: Date,
	updatedAt: Date,
  user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User'
  },
  voter_id: [{
    type: Schema.Types.ObjectId,
		ref: 'User'
  }]
})

var Question = mongoose.model('Question', questionSchema)

module.exports = Question