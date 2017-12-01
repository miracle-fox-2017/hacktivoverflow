const User = require('../models/userModel')

getAll = (req, res) => {
  User.find()
  .then(users => {
    res.send(users)
  })
  .catch(err => res.status(500).send(err))
}

getOne = (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    res.send(user)
  })
  .catch(err => res.status(500).send(err))
}

signup = (req, res) => {
  User.create(req.body)
  .then(newUser => {
    res.send(newUser)
  })
  .catch(err => res.status(500).send(err))
}

login = (req, res) => {
  res.send('test')
}

update = (req, res) => {
  User.findById(req.params.id)
  .then(user => {

  })
  .catch(err => res.status(500).send(err))
}

remove = (req, res) => {
  User.remove({id: req.params.id})
  .then(userDeleted => {
    res.send(userDeleted)
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  getAll,
  getOne,
  signup,
  login,
  update,
  remove
}