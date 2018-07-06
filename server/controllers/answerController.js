const Answer = require('../models/answerModel.js')

// Find all answer
let findAllAnswer = function (req, res) {
  Answer.find()
  .populate('question')
  .populate('userAnswer')
  .populate('voteAnswer')
  .exec()
  .then(function (dataAnswer) {
    res.status(200).send(dataAnswer)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Find answer by id
let findAnswerById = function (req, res) {
  Answer.find(
    {
      question: req.params.idQuestion
    }
  )
  .populate('question')
  .populate('userAnswer')
  .populate('voteAnswer')
  .exec()
  .then(function (dataAnswer) {
    res.status(200).send(dataAnswer)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Adding new answer
let postNewAnswer = function (req, res) {
  let newAnswer = Answer(
    {
      title: req.body.title,
      content: req.body.content,
      question: req.body.question,
      userAnswer: req.body.userAnswer,
      voteAnswer: req.body.voteAnswer,
      voteCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  )
  newAnswer.save().then(function (dataAnswer) {
    res.status(200).send(dataAnswer)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Update answer
let updateAnswer = function (req, res) {
  Answer.findOneAndUpdate(
    {
      _id: req.params.idAnswer
    },
    {
      title: req.body.title,
      content: req.body.content,
      updatedAt: new Date()
    }
  )
  .populate('question')
  .populate('userAnswer')
  .populate('voteAnswer')
  .exec()
  .then(function (dataAnswer) {
    res.status(200).send(dataAnswer)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Update voteAnswer
let updateVoteAnswer = function (req, res) {
  Answer.findOneAndUpdate(
    {
      _id: req.params.idAnswer
    },
    {
      voteAnswer: req.body.voteAnswer,
      voteCount: req.body.voteCount
    }
  )
  .populate('question')
  .populate('userAnswer')
  .populate('voteAnswer')
  .exec()
  .then(function (dataAnswer) {
    res.status(200).send(dataAnswer)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Deleting answer
let removeAnswer = function (req, res) {
  Answer.findOneAndRemove(
    {
      _id: req.params.idUAnswer
    }
  ).then(function (dataAnswer) {
    res.status(200).send(dataAnswer)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

module.exports = {
  findAllAnswer,
  findAnswerById,
  postNewAnswer,
  updateAnswer,
  updateVoteAnswer,
  removeAnswer
}
