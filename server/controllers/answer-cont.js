const Answer = require('../models/answer-schema')

const createAnswer = (req, res) => {
  Answer.create({
    userId: req.body.userId,
    questionId: req.body.questionId,
    answer: req.body.answer,
    votes: req.body.userId
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
    .where({ questionId: req.params.id})
  .populate('userId')
  .populate('votes')
  .then(answers => {
    res.status(200).send(answers)
  })
  .catch(err => {
    console.log(err)
  })
}


const findById = (req, res) => {
  Answer.find()
  .populate('questionId')
  .then(answer => {
    res.status(200).send(answer)
  })
  .catch(err => {
    console.log(err)
  })
}

const findByIdAndUpdate = (req, res) => {
  Answer.findByIdAndUpdate({ _id: req.params.id },{$push: {votes: req.body.votes }})
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