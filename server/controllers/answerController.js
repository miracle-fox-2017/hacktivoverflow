const ObjectId = require('mongodb').ObjectId
const AnswerModel = require('../models/answerModel')

class Answer {
  static create (req, res) {
    let newAnswer = new AnswerModel({
      question: req.body.id,
      answerer: req.verifyUser.id,
      content: req.body.content
    })

    newAnswer.save()
    .then(answer => res.send(answer))
    .catch(err => res.status(500).send(err))
  }

  static getAll (req, res) {
    AnswerModel.find()
    .then(answers => res.send(answers))
    .catch(err => res.status(500).send(err))
  }

  static getByQuestionId (req, res) {
    AnswerModel.find({question: req.body.question}).populate('answerer')
    .then(answer => {
      res.send(answer)
    })
    .catch(err => res.status(500).send(err))
  }

  static update (req, res) {
    let id = {_id: ObjectId(req.params.id)}

    AnswerModel.findById(id)
    .then(answer => {
      answer.content = req.body.content || answer.question
      answer.updatedAt = new Date()

      answer.save()
      .then(answer => res.send(answer))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static remove (req, res) {
    let id = {_id: ObjectId(req.params.id)}

    AnswerModel.findByIdAndRemove(id)
    .then(answer => res.send(answer))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = Answer;
