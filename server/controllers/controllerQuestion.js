const Question = require('../models/modelQuestion')
const Answer = require('../models/modelAnswer')

const createQuestion = (req, res) => {
  Question.create({
    title: req.body.title,
    question: req.body.question,
    author: req.body.author
  })
    .then((dataQuestion) => {
      res.send(dataQuestion)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const getAllDataQuestion = (req, res) => {
  Question.find()
    .populate('author')
    .populate('answer')
    .then((dataQuestion) => {
      res.send(dataQuestion)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const deleteQuestion = (req, res) => {
  Question.findByIdAndRemove(req.params.id).then((dataQuestion) => {
    Answer.remove({
      question: req.params.id
    }).then((response) => {
      res.send(dataQuestion)
    }).catch((reason) => {
      res.send(reason)
    })
  }).catch((reason) => {
    res.send(reason)
  })
}

const editQuestion = (req, res) => {
  Question.findById(req.params.id)
    .then((dataQuestion) => {
      dataQuestion.title = req.body.title
      dataQuestion.question = req.body.question,
        dataQuestion.author = req.body.author || dataQuestion.author,
        dataQuestion.likes = req.body.likes || dataQuestion.likes
      dataQuestion.save()
        .then((newDataQuestion) => {
          res.send(newDataQuestion)
        })
        .catch((reason) => {
          res.send(reason)
        })
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const likeQuestion = (req, res) => {
  Question.findByIdAndUpdate(req.params.id,
    { $push: { 'likes': req.body.userId }},
    { safe: true, upsert: true })
    .then((dataQuestion) => {
      res.send(dataQuestion)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const unlikeQuestion = (req, res) => {
  Question.findByIdAndUpdate(req.params.id,
    { $pull: { 'likes': req.body.userId } },
    { safe: true, upsert: true })
    .then((dataQuestion) => {
      res.send(dataQuestion)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const findQuestion = (req, res) => {
  Question.findById(req.params.id)
    .populate('author')
    .populate('answer')
    .then((dataQuestion) => {
      res.send(dataQuestion)
    })
    .catch((reason) => {
      res.send(reason)
    })

}

module.exports = {
  createQuestion,
  getAllDataQuestion,
  deleteQuestion,
  editQuestion,
  likeQuestion,
  unlikeQuestion,
  findQuestion
}