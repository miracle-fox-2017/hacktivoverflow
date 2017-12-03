const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
	username: String,
	owner:  {
		type: Schema.Types.ObjectId,
		ref: 'Account',
	},
	question:  {
		type: Schema.Types.ObjectId,
		ref: 'Question',
	},
	content: String,
	uservoteList: [{
		type: Schema.Types.ObjectId,
		ref: 'Account'
	}],
	createdAt: { type: Date, default: Date.now }
});

const AnswerModel = mongoose.model('Answer', answerSchema);

module.exports = AnswerModel;