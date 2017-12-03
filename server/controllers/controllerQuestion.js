const Question = require('../models/modelQuestion')
const Answer = require('../models/modelAnswer')

const createQuestion = (req, res) => {
  Question.create({
    title: req.body.title,
    question: req.body.question,
    author: req.body.author
  })
    .then((dataQuestion) => {
      res.send("Successfully added 1 question")
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
  Question.remove({
    _id: req.params.id
  }).then((response) => {
    Answer.remove({
      question: req.params.id
    }).then((response) => {
      res.send(response)
    }).catch((reason) => {
      res.send(reason)
    })
  }).catch((reason) => {
    res.send(reason)
  })
}

const editQuestion = (req, res) => {
  Question.update({
    _id: req.params.id
  }, {
      title: req.body.title,
      question: req.body.question
    }).then((dataQuestion) => {
      res.send(dataQuestion)
    }).catch((reason) => {
      res.send(reason)
    })
}

const likeQuestion = (req, res) => {
  Question.findById(req.params.id)
    .then((dataQuestion) => {
      if (dataQuestion.likes.indexOf(req.body.author) == -1) {
        dataQuestion.likes.push(req.body.author)
        dataQuestion.save(function (err) {
          if (err) {
            res.send(err)
          } else {
            res.send(dataQuestion)
          }
        })
      } else {
        res.send("You already like this question")
      }
    }).catch((reason) => {
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
  findQuestion
}