const questionModel = require('../models/questionModel');
const ObjectId = require('mongodb').ObjectID;
const helper = require('../helpers/helper');

const create = (req, res) => {
	let newQuestion = new questionModel({
		title: req.body.title || null,
		owner: req.body.owner || null,
		content: req.body.content || null,
		tagList: req.body.tagList || [],
		uservoteList:  req.body.uservoteList || [],
		answerList: req.body.answerList || [],
		createdAt: new Date()
	})

	newQuestion.save()
		.then(newQuestion => {
			res.status(200).send({
				message: "Question Added",
				data: newQuestion
			});

		}).catch(err => res.status(500).send({
			message: "Error creating Question",
			error: err.message
		}));
}

const findAll = (req, res) => {
	questionModel.find().sort({createdAt: 'desc'}).exec()
		.then(questions => {
			res.status(200).send(questions);

		}).catch(err => res.status(500).send({
			message: "Error getting Question",
			error: err.message
		}));
}

const findById = (req, res) => {
	questionModel.findOne({ _id: req.params.questionId })
		.populate('owner').populate('answerList').populate('uservoteList').exec()
		.then(questions => {
			res.status(200).send(questions);

		}).catch(err => res.status(500).send({
			message: "Error getting Question",
			error: err.message
		}));
}

const update = (req, res) => {
	questionModel.findOne({ _id: req.params.questionId})
		.then(question => {
			if (question) {

				question.title = req.body.title || question.title;
				question.owner = req.body.owner || question.owner;
				question.content = req.body.content || question.content;

				if (Array.isArray(req.body.tagList)) {
					let newTag = helper.findDeselectedItem(question.tagList, req.body.tagList);

					if (newTag !== null) {
						question.tagList = question.tagList.concat(newTag);
					}
				} else {
					question.tagList = req.body.tagList;
				}

				if (typeof req.body.uservoteList !== 'undefined' && req.body.uservoteList !== null) {
					if (Array.isArray(req.body.uservoteList)) {
						let newVote = helper.findDeselectedItem(question.uservoteList, req.body.uservoteList);

						if (newVote !== null) {
							question.uservoteList = question.uservoteList.concat(newVote);
						}

					} else {
						if (question.uservoteList.indexOf(req.body.uservoteList) < 0){
							question.uservoteList = question.uservoteList.concat(req.body.uservoteList)
						}
					}
				} else {
					question.uservoteList = req.body.uservoteList;
				}

				if (typeof req.body.answerList !== 'undefined' && req.body.answerList !== null) {
					question.answerList = question.answerList.concat(req.body.answerList)
				} else {
					question.answerList = req.body.answerList;
				}

				question.save()
					.then(question => {
						res.status(200).send({ message: 'Question updated', data: question})

					}).catch(err => res.status(500).send({message:'Something Wrong on update Question', error: err.message}));

			} else {
				res.status(500).send({ message: 'Update question Failed. Question not found'})
			}

		}).catch(err => res.status(500).send(err.message));
}

const destroy = (req, res) => {
	questionModel.findOne({ _id: req.params.questionId})
		.then(question => {
			if (question) {
				question.remove()
					.then(question => {
						res.status(200).send({ message: 'Delete Question Success', data: question})

					}).catch(err => res.status(500).send({message:'Something Wrong', error: err.message}));

			} else {
				res.status(500).send({ message: 'Delete question Failed. Question not found'})
			}

		}).catch(err => res.status(500).send({message:'Something Wrong in delete', error: err.message}));
}

const vote = (req, res) => {
	questionModel.findOne({ _id: req.params.questionId})
		.then(question => {
			if (question) {
				let accountId =  req.params.accountId;

				if (typeof accountId !== 'undefined') {
					if (question.uservoteList !== null){
						let indexFound = question.uservoteList.indexOf(accountId);

						if (indexFound < 0 && accountId !== null) {
							question.uservoteList = question.uservoteList.concat(accountId)
						} else {
							question.uservoteList.splice(indexFound, 1);
						}

					} else {
						question.uservoteList = accountId;
					}
				}

				question.save()
					.then(question => {
						res.status(200).send({ message: 'Question updated', data: question})

					}).catch(err => res.status(500).send({message:'Something Wrong on update Question', error: err.message}));

			} else {
				res.status(500).send({ message: 'Update question Failed. Question not found'})
			}

		}).catch(err => res.status(500).send(err.message));
}

/*const unvote = (req, res) => {
	questionModel.findOne({ _id: req.params.questionId})
		.then(question => {
			if (question) {
				let accountId =  req.params.accountId;

				if (typeof accountId !== 'undefined') {
					if (question.uservoteList !== null){
						if (question.uservoteList.indexOf(accountId) >= 0 && accountId !== null) {
							let indexFound = question.uservoteList.indexOf(accountId);
							question.uservoteList.splice(indexFound, 1);
						}
					}
				}

				question.save()
					.then(question => {
						res.status(200).send({ message: 'Vote removed', data: question})

					}).catch(err => res.status(500).send({message:'Something Wrong on remove Vote', error: err.message}));

			} else {
				res.status(500).send({ message: 'Unvote question Failed. Question not found'})
			}

		}).catch(err => res.status(500).send(err.message));
}*/


module.exports = {
	create,
	findAll,
	update,
	vote,
	destroy,
	findById
}
