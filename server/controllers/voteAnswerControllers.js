const VoteAnswer = require('../models/voteAnswerModel')

getAnswers = (req, res) => {
  VoteAnswer.find({answerId: req.params.answerId})
  .then(votes => {
    res.send(votes)
  })
  .catch(err => res.status(500).send(err))
}

create = (req, res) => {
  req.body.userId = req.userLogin.id
  VoteAnswer.create(req.body)
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
  VoteAnswer.remove({userId: req.userLogin.id, _id: req.params.id})
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
  create,
  update,
  remove
}