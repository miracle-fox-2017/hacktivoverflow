const mongoose = require('mongoose')
const Schema   = mongoose.Schema

var questionSchema = new Schema({
  title: String,
  text: String, 
	category: String,
	complete_status: Boolean,
	createdAt: Date,
	updatedAt: Date,
  completedAt: Date,
  user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User'
  },
  voter_id: [{
    type: Schema.Types.ObjectId,
		ref: 'User'
  }],
  user_comment: [{
    _id : {
      type: Schema.Types.ObjectId, 
      ref: 'User'
    },
    comment_text : String,
  }]
})

var Question = mongoose.model('Question', questionSchema)

module.exports = Question