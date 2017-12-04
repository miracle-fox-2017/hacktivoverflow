const Vote = require('../models/voteModel')

getAnswers = (req, res) => {
  Vote.find({answerId: req.params.answerId})
  .then(votes => {
    res.send(votes)
  })
  .catch(err => res.status(500).send(err))
}

getQuestions = (req, res) => {
  Vote.find({questionId: req.params.questionId})
  .then(votes => {
    res.send(votes)
  })
  .catch(err => res.status(500).send(err))
}

create = (req, res) => {
  console.log(req.userLogin.id)
  req.body.userId = req.userLogin.id
  Vote.create(req.body)
  .then(vote => {
    res.send(vote)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
}

update = (req, res) => {
  
}

remove = (req, res) => {
  Vote.remove({userId: req.userLogin.id, _id: req.params.id})
  .then(voteDeleted => {
    let vote = {
      status: 'deleted',
      data: voteDeleted
    }
    res.send(vote)
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  getAnswers,
  getQuestions,
  create,
  update,
  remove
}