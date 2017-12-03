const Question = require('../models/questionModel')

getAll = (req, res) => {
  Question.find().populate('userId')
  .then(questions => {
    res.send(questions)
  })
  .catch(err => res.status(500).send(err))
}

create = (req, res) => {
  req.body.userId = req.userLogin.id
  Question.create(req.body)
  .then(question => {
    console.log(question)
    res.send(question)
  })
  .catch(err => res.status(500).send(err))
}

update = (req, res) => {
  
}

remove = (req, res) => {
  
}

module.exports = {
  getAll,
  create,
  update,
  remove
}