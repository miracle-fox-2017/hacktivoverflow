const Answer = require('../models/modelAnswer')

const createAnswer = (req, res) => {
  Answer.create({
    question: req.body.question,
    answer: req.body.answer,
    author: req.body.author
  })
    .then((dataAnswer) => {
      res.send(dataAnswer)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const findAnswer = (req, res) => {
  Answer.find()
    .populate('question')
    .populate('author')
    .then((dataAnswer) => {
      res.send(dataAnswer)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const findAnswerByIdQuestion = (req, res) => {
  Answer.find({
    question: req.params.id
  })
    .populate('author')
    .then((dataAnswers) => {
      res.send(dataAnswers)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const removeAnswer = (req, res) => {
  Answer.remove({
    _id: req.params.id
  })
    .then((dataAnswer) => {
      res.send(dataAnswer)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

module.exports = {
  createAnswer,
  findAnswer,
  findAnswerByIdQuestion,
  removeAnswer
}