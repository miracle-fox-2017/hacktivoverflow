const Answer = require('../models/answer-schema')

const createAnswer = (req, res) => {
  Answer.create({
    userId: req.body.userId,
    questionId: req.body.questionId,
    answer: req.body.answer
  })
  .then(answer => {
    res.status(200).send(answer)
  })
  .catch(err => {
    console.log(err)
  })
}

const getAllAnswers = (req, res) => {
  Answer.find()
  .populate('userId')
  .populate('questionId')
  .then(answers => {
    res.status(200).send(answers)
  })
  .catch(err => {
    console.log(err)
  })
}


const findById = (req, res) => {
  Answer.findById({ _id: req.params.id })
    .populate('userId')
    .populate('questionId')
    .then(answer => {
      res.status(200).send(answer)
    })
    .catch(err => {
      console.log(err)
    })
}

const findByIdAndUpdate = (req, res) => {
  Answer.findByIdAndUpdate({ _id: req.params.id }, {
    answer: req.body.answer,
    userId: req.body.userId,
    questionId: req.body.questionId
  })
    .then(answer => {
      res.status(200).send(answer)
    })
    .catch(err => {
      console.log(err)
    })
}

const findByIdAndRemove = (req, res) => {
  Answer.findByIdAndRemove({ _id: req.params.id })
    .then(answer => {
      res.status(200).send(answer)
    })
    .catch(err => {
      console.log(err)
    })
}


module.exports = {
  createAnswer,
  getAllAnswers,
  findById,
  findByIdAndRemove,
  findByIdAndUpdate
}