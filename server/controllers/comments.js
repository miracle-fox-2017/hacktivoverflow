const Comments = require('../models/comment')
const bcrypt = require('../helpers/bcrypt');

const add = (req, res) => {
  bcrypt.verify(req.body.token)
  .then(result => {
    let obj = {
      users: result.id,
      comment: req.body.comment,
      questions: req.body.questions
    }
    Comments.create(obj)
    .then(response => {
      Comments.find({_id: response._id})
      .populate('users')
      .populate('questions')
      .then(hasil => res.status(200).json(hasil))
      .catch( err => { res.status(500).json(err) })
    })
    .catch( err => { res.status(500).json(err) })
  })
  .catch( err => { res.status(500).json(err) })
}

const list = (req, res) => {
  console.log(req.params.id)
  Comments.find({questions: req.params.id})
  .populate('users')
  .populate('questions')
  .then(response => res.status(200).json(response))
  .catch( err => { res.status(500).json(err) })
}

const destroy = (req, res) => {
  Comments.destroy({_id: req.params.id})
  .then(response => res.status(200).json(response))
  .catch( err => { res.status(500).json(err) })
}

module.exports = {
    add,
    list,
    destroy
}