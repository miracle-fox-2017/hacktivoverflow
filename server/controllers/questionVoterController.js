const ObjectId = require('mongodb').ObjectId
const QuestionVoterModel = require('../models/questionVoterModel')

class QuestionVoter {
  static create (req, res) {
    let newQuestionVoter = new QuestionVoterModel({
      question: req.body.question,
      voter: req.verifyUser.id,
    })

    newQuestionVoter.save()
    .then(questionVoter => res.send(questionVoter))
    .catch(err => res.status(500).send(err))
  }

  static getAll (req, res) {
    QuestionVoterModel.find()
    .then(questionsVoters => res.send(questionsVoters))
    .catch(err => res.status(500).send(err))
  }

  static getByQuestionId (req, res) {
    QuestionVoterModel.find({question: req.body.question})
    .then(questionsVoters => {
      res.send(questionsVoters)
    })
    .catch(err => res.status(500).send(err))
  }

  static remove (req, res) {
    QuestionVoterModel.findOneAndRemove({ voter: req.body.voter})
    .then(answerVoter => res.send(answerVoter))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = QuestionVoter
