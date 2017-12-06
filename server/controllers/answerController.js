const answerModel = require('../models/answerModel');
const questionModel = require('../models/questionModel');
const ObjectId = require('mongodb').ObjectID;
const helper = require('../helpers/helper');

const create = (req, res) => {
	let questionId = req.params.questionId;

	let newAnswer = new answerModel({
		owner: req.body.owner || null,
		username: req.body.username || null,
		content: req.body.content || null,
		uservoteList:  req.body.uservoteList || [],
		question: questionId || null,
		createdAt: new Date()
	})

	newAnswer.save()
		.then(newAnswer => {
			questionModel.findOne({ _id: questionId })
				.then(dataQuestion => {
					if (dataQuestion) {
						dataQuestion.answerList.push(newAnswer._id);

						dataQuestion.save()
							.then(updatedQuestion => {
								res.status(200).send({
									message: "Answer Added",
									answer: newAnswer,
									question: updatedQuestion
								});

							}).catch(err => res.status(500).send({message:'Something Wrong in updating question', error: err.message}));

					} else {
						res.status(401).send({ message: 'No question found to be added for this answer'})
					}

				}).catch(err => res.status(500).send({message:'Something Wrong', error: err.message}));


		}).catch(err => res.status(500).send({
			message: "Error creating Answer",
			error: err.message
		}));
}

const findAll = (req, res) => {
	answerModel.find().sort({createdAt: 'desc'}).exec()
		.then(answers => {
			res.status(200).send(answers);

		}).catch(err => res.status(500).send({
			message: "Error getting Answer",
			error: err.message
		}));
}

const update = (req, res) => {
	answerModel.findOne({ _id: req.params.answerId})
		.then(answer => {
			if (answer) {
				answer.owner = req.body.owner || answer.owner;
				answer.content = req.body.content || answer.content;
				answer.question = req.body.question || answer.question;

				if (typeof req.body.uservoteList !== 'undefined') {
					if (Array.isArray(req.body.uservoteList)) {
						let newVote = helper.findDeselectedItem(answer.uservoteList, req.body.uservoteList);

						if (newVote !== null) {
							answer.uservoteList = answer.uservoteList.concat(newVote);
						}

					} else {
						if (answer.uservoteList.indexOf(req.body.uservoteList) < 0){
							answer.uservoteList = answer.uservoteList.concat(req.body.uservoteList)
						}
					}
				} else {
					answer.uservoteList = answer.uservoteList;
				}

				answer.save()
					.then(answer => {
						res.status(200).send({ message: 'Answer updated', data: answer})

					}).catch(err => res.status(500).send({message:'Something Wrong on update Answer', error: err.message}));

			} else {
				res.status(500).send({ message: 'Update answer Failed. Answer not found'})
			}

		}).catch(err => res.status(500).send(err.message));
}

const destroy = (req, res) => {
	let answerId = req.params.answerId;
	let questionId = req.params.questionId;
	let ownerId = req.verifiedUser._id;

	answerModel.findOne({ _id: answerId, owner: ownerId})
		.then(answer => {
			if (answer) {
				answer.remove()
					.then(answer => {
						questionModel.findOne({ _id: questionId })
						.then(dataQuestion => {
							if (dataQuestion) {
								let targetAnswerIndex = dataQuestion.answerList.indexOf(answerId);
								dataQuestion.answerList.splice(targetAnswerIndex, 1);

								dataQuestion.save()
								.then(updatedQuestion => {
									res.status(200).send({
										message: "Answer deleted, Answerlist spliced",
										answer: answer,
										question: updatedQuestion
									});

								}).catch(err => res.status(500).send({message:'Something Wrong in updating question', error: err.message}));

							} else {
								res.status(401).send({ message: 'No question found to be added for this answer'})
							}

						}).catch(err => res.status(500).send({message:'Something Wrong', error: err.message}));
						// res.status(200).send({ message: 'Delete Answer Success', data: answer})

					}).catch(err => res.status(500).send({message:'Something Wrong', error: err.message}));

			} else {
				res.status(500).send({ message: 'Delete answer Failed. Answer not found'})
			}

		}).catch(err => res.status(500).send({message:'Something Wrong in delete', error: err.message}));
}

const vote = (req, res) => {
	answerModel.findOne({ _id: req.params.answerId})
		.then(answer => {
			if (answer) {
				let accountId =  req.params.accountId;

				if (typeof accountId !== 'undefined') {
					if (answer.uservoteList !== null){
						let indexFound = answer.uservoteList.indexOf(accountId);

						if (indexFound < 0 && accountId !== null) {
							answer.uservoteList = answer.uservoteList.concat(accountId)
						} else {
							answer.uservoteList.splice(indexFound, 1);
						}

					} else {
						answer.uservoteList = accountId;
					}
				}

				answer.save()
					.then(answer => {
						res.status(200).send({ message: 'Answer updated', data: answer})

					}).catch(err => res.status(500).send({message:'Something Wrong on update Answer', error: err.message}));

			} else {
				res.status(500).send({ message: 'Update answer Failed. Answer not found'})
			}

		}).catch(err => res.status(500).send(err.message));
}

const unvote = (req, res) => {
	answerModel.findOne({ _id: req.params.answerId})
		.then(answer => {
			if (answer) {
				let accountId =  req.params.accountId;

				if (typeof accountId !== 'undefined') {
					if (answer.uservoteList !== null){
						if (answer.uservoteList.indexOf(accountId) >= 0 && accountId !== null) {
							let indexFound = answer.uservoteList.indexOf(accountId);
							answer.uservoteList.splice(indexFound, 1);
						}
					}
				}

				answer.save()
					.then(answer => {
						res.status(200).send({ message: 'Vote removed', data: answer})

					}).catch(err => res.status(500).send({message:'Something Wrong on remove Vote', error: err.message}));

			} else {
				res.status(500).send({ message: 'Unvote answer Failed. Answer not found'})
			}

		}).catch(err => res.status(500).send(err.message));
}


module.exports = {
	create,
	findAll,
	update,
	vote,
	unvote,
	destroy
}
