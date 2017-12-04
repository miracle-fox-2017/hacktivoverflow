const mongoose = require('mongoose').connect('mongodb://localhost:27017/hacktiv8OF');
const Schema = mongoose.Schema


const questionSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	title : String,
	desc: String,
	like: [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}],
	comment: [{
		type: Schema.Types.ObjectId,
		ref: 'comment'
	}],
    createdAt: {
    	type: Date,
    	default: Date.now()
    },
    userName: String	
})

const questionModel = mongoose.model('question',questionSchema);

module.exports = questionModel