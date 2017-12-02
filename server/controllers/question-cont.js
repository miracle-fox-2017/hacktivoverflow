const Question = require('../models/question-schema')
let message = ''

const createQuest = (req, res) => {
  Question.create({
    question: req.body.question,
    userId: req.body.userId
  })
  .then(question => {
    res.status(200).send(question)
  })
  .catch(err => {
    console.log(err)
  })
}

const getAllQuest = (req, res) => {
  Question.find()
  .populate('userId')
  .then(questions => {
    res.status(200).send(questions)
  })
  .catch(err => {
    console.log(err)
  })
}

const findById = (req, res) => {
  Question.findById({_id: req.params.id})
  .populate('userId')
  .then(question => {
    res.status(200).send(question)
  })
  .catch(err => {
    console.log(err)
  })
}

const findByIdAndUpdate = (req, res) => {
  Question.findByIdAndUpdate({ _id: req.params.id }, {
    question: req.body.question
  })
    .then(question => {
      res.status(200).send(question)
    })
    .catch(err => {
      console.log(err)
    })
}

const findByIdAndRemove = (req, res) => {
  Question.findByIdAndRemove({ _id: req.params.id })
  .then(question => {
    res.status(200).send(question)
  })
  .catch(err => {
    console.log(err)
  })
}


module.exports = {
  createQuest,
  getAllQuest,
  findById,
  findByIdAndUpdate,
  findByIdAndRemove
}

