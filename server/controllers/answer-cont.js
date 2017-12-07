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


const findOne = (req, res) => {
  Answer.findOne({_id: req.params.id})
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
  Answer.findByIdAndUpdate({ _id: req.params.id }, { $addToSet: { votes: req.body.votes } },{new: true})
  .then(answer => {
    res.status(200).send(answer)
  })
  .catch(err => {
    console.log(err)
  })
}

const removeElVotesById = (req, res) => {
  Answer.findByIdAndUpdate({_id: req.params.id}, 
    { $pull: { votes: req.body.votes } }, { new: true }
  )
  .then(res => {
    console.log(res)
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
  findByIdAndUpdate,
  removeElVotesById,
  findOne
}