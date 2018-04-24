const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	title: String,
	owner:  {
		type: Schema.Types.ObjectId,
		ref: 'Account',
	},
	content: String,
	tagList: [],
	uservoteList: [{
		type: Schema.Types.ObjectId,
		ref: 'Account',
	}],
	answerList: [{
		type: Schema.Types.ObjectId,
		ref: 'Answer',
	}],
	createdAt: { type: Date, default: Date.now }
});

const QuestionModel = mongoose.model('Question', questionSchema);

module.exports = QuestionModel;