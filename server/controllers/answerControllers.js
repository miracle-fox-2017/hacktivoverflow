const Answer = require('../models/answerModel')

getAll = (req, res) => {

}

create = (req, res) => {
  Answer.create(req.body)
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