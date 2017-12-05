const Comments = require('../models/comment')

const add = (req, res) => {
    Comments.create(req.body)
    .then(response => console.log(response))
    .catch( err => { res.status(500).json(err) })
}

const list = (req, res) => {
  Comments.find()
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