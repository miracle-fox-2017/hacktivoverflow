const VoteQuestion = require('../models/voteQuestionModel')

getQuestions = (req, res) => {
  VoteQuestion.find(req.params)
  .then(votes => {
    res.send(votes)
  })
  .catch(err => res.status(500).send(err))
}

create = (req, res) => {
  req.body.userId = req.userLogin.id
  VoteQuestion.create(req.body)
  .then(vote => {
    res.send(vote)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

update = (req, res) => {
  
}

remove = (req, res) => {
  VoteQuestion.remove({userId: req.userLogin.id, _id: req.params.id})
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
  getQuestions,
  create,
  update,
  remove
}