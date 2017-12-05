const Questions = require('../models/question')
const bcrypt = require('../helpers/bcrypt');

const create = (req, res) => {
  bcrypt.verify(req.body.token)
  .then(result => {
    let obj = {
      users: result.id,
      title: req.body.title,
      content: req.body.content
    }
    Questions.create(obj)
    .then( response => {
      Questions.find({_id: response._id})
      .populate('users')
      .then(hasil => res.status(200).json(hasil))
    })
    .catch( err => { res.status(500).json(err) })
  })
  .catch( err => { res.status(500).json(err) })
  
}

const list = (req, res) => {
    Questions.find()
    .populate('users')
    .then( response => res.status(200).json(response) )
    .catch( err => { res.status(500).json(err) })
}

const getById = (req, res) => {
    Questions.find({_id: req.params.id})
    .populate('users')
    .then( response => res.status(200).json(response) )
    .catch( err => { res.status(500).json(err) })
}

const destroy = (req, res) => {
  Questions.deleteOne({_id: req.params.id})
  .then( response => res.status(200).json(response) )
  .catch( err => { res.status(500).json(err) })
}

module.exports = {
    create,
    list,
    getById,
    destroy
}