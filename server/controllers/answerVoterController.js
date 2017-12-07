const ObjectId = require('mongodb').ObjectId
const AnswerVoterModel = require('../models/answerVoterModel')

class AnswerVoter {
  static create (req, res) {
    console.log(req.body)
    let newAnswerVoter = new AnswerVoterModel({
      answer: req.body.answer,
      voter: req.verifyUser.id,
    })

    newAnswerVoter.save()
    .then(answerVoter => res.send(answerVoter))
    .catch(err => res.status(500).send(err))
  }

  static getAll (req, res) {
    AnswerVoterModel.find()
    .then(answers => res.send(answers))
    .catch(err => res.status(500).send(err))
  }

  static getByQuestionId (req, res) {
    // console.log('--> masuk getByQuestionId', req.body);
    AnswerVoterModel.find({answer: req.body.answer}) //.populate('answerer')
    .then(answersVoters => {
      res.send(answersVoters)
    })
    .catch(err => res.status(500).send(err))
  }

  static remove (req, res) {
    let id = {_id: ObjectId(req.params.id)}

    AnswerVoterModel.findByIdAndRemove(id)
    .then(answerVoter => res.send(answerVoter))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = AnswerVoter
