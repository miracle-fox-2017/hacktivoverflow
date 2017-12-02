const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

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
  bcrypt.hash(req.body.password, 10, function(error, hash) {
    if(!error) {
      req.body.password = hash
      User.create(req.body)
      .then(newUser => {
        res.send(newUser)
      })
      .catch(err => res.status(500).send(err))
    } else {
      res.status(500).send(error)
    }
  });
}

login = (req, res) => {
  User.findOne({username: req.body.username})
  .then(user => {
    bcrypt.compare(req.body.password, user.password, function(err, response) {
      if(!err) {
        let payload = {
          id: user._id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }
        jwt.sign(payload, process.env.JWT_SECRET, function(err, token) {
          res.send({accesstoken: token})
        })
      } else {
        res.status(401).send(err)
      }
    })
  })
  .catch(err => res.status(401).send(err))
}

update = (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    user.first_name = req.body.fisrt_name || user.first_name
    user.last_name = req.body.last_name || user.last_name
    user.email = req.body.email || user.email

    user.save()
    .then(userUpdated => {
      res.send(userUpdated)
    })
    .catch(err => res.status(500).send(err))
  })
  .catch(err => res.status(500).send(err))
}

remove = (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then(userDeleted => {
    let user = {
      status: 'deleted',
      data: userDeleted
    }
    res.send(user)
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