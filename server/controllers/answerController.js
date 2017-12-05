const ObjectId = require('mongodb').ObjectId
const AnswerModel = require('../models/answerModel')

class Answer {
  static create (req, res) {
    // console.log(req.verifyUser);
    let newAnswer = new AnswerModel({
      question: req.body.question,
      answerer: req.verifyUser.id,
      content: req.body.content
      // ,answerVoter: req.body.answerVoter
    })
    // console.log(newAnswer);
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
    // console.log(req.body);
    AnswerModel.find({question: req.body.question})
    .then(answer => {
      // console.log('--> masuk', answer);
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
      // ,answer.answerVoter: req.body.answerVoter || answer.answerVoter
      console.log(answer);
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
