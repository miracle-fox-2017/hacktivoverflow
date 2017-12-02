const mongoose = require('mongoose').connect('mongodb://localhost:27017/hacktiv8OF');
const Schema = mongoose.Schema


const commentSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	questionId: {
		type: Schema.Types.ObjectId,
		ref: 'question'
	},
	desc: String,
	commentLike: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	commentDate: {
		type: Date,
		default: Date.now()
	}	
})

const commentModel = mongoose.model('comment',commentSchema);

module.exports = commentModel