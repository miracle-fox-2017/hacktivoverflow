const ObjectId = require('mongodb').ObjectId
const QuestionModel = require('../models/questionModel')

class Question {
  static create (req, res) {
    let question = new QuestionModel({
      questioner: req.verifyUser.id,
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags
    })

    question.save()
    .then(question => res.send(question))
    .catch(err => res.status(500).send(err))
  }

  static getAll (req, res) {
    QuestionModel.find().populate('questioner')
    .then(questions => res.send(questions))
    .catch(err => res.status(500).send(err))
  }

  static getById (req, res) {
    let id = {_id: ObjectId(req.params.id)}

    QuestionModel.findById(id).populate('questioner')
    .then(question => {
      res.send(question)
    })
    .catch(err => res.status(500).send(err))
  }

  static getByUserId (req, res) {
    QuestionModel.find({questioner: req.verifyUser.id}).populate('questioner')
    .then(questions => {
      res.send(questions)
    })
    .catch(err => res.status(500).send(err))
  }

  static update (req, res) {
    let id = {_id: ObjectId(req.params.id)}

    QuestionModel.findById(id)
    .then(question => {
      question.title = req.body.title || question.title,
      question.content = req.body.content || question.content,
      question.tags = req.body.tags || question.tags,
      question.updatedAt = new Date()

      question.save()
      .then(question => res.send(question))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static remove (req, res) {
    let id = {_id: ObjectId(req.params.id)}

    QuestionModel.findByIdAndRemove(id)
    .then(question => res.send(question))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = Question;
