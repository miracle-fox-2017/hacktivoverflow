const Question = require('../models/questionModel')

getAll = (req, res) => {

}

create = (req, res) => {
  Question.create(req.body)
  .then(question => {
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