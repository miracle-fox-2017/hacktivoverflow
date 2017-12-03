const Question = require('../models/questionModel')

getAll = (req, res) => {
  Question.find().populate('userId').sort({createdAt: 'desc'})
  .then(questions => {
    res.send(questions)
  })
  .catch(err => res.status(500).send(err))
}

getOne = (req, res) => {
  Question.findById(req.params.id).populate('userId')
  .then(question => {
    res.send(question)
  })
  .catch(err => res.status(500).send(err))
}

getMy = (req, res) => {
  Question.find({userId: req.userLogin.id})
  .then(questions => {
    res.send(questions)
  })
  .catch(err => res.status(500).send(err))
}

create = (req, res) => {
  req.body.userId = req.userLogin.id
  Question.create(req.body)
  .then(question => {
    res.send(question)
  })
  .catch(err => res.status(500).send(err))
}

update = (req, res) => {
  
}

remove = (req, res) => {
  Question.findByIdAndRemove(req.params.id)
  .then(questionDeleted => {
    let question = {
      status: 'deleted',
      data: questionDeleted
    }
    res.send(question)
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  getAll,
  getOne,
  getMy,
  create,
  update,
  remove
}