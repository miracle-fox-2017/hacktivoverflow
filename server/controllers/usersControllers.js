const User = require('../models/userModel')
const tokenGenerate = require('../helper/tokenGenerate')
const bcrypt = require('bcrypt');
const axios = require('axios');

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
  if(req.headers.google_token){
    axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.headers.google_token}`)
    .then(({data}) => {
      User.findOne({google_id: data.sub})
      .then(user => {
        tokenGenerate(user, function(token) {
          res.send(token)
        })
      })
      .catch(err => {
        let userGoogle = {
          username: data.email,
          password: data.email,
          first_name: data.given_name,
          last_name: data.family_name,
          email: data.email,
          google_id: data.sub
        }

        User.create(userGoogle)
        .then(newUser => {
          tokenGenerate(newUser, function(token) {
            res.send(token)
          })
        })
        .catch(err => res.status(500).send(err))
      })
    })
  } else {
    User.findOne({username: req.body.username})
    .then(user => {
      bcrypt.compare(req.body.password, user.password, function(err, response) {
        if(!err) {
          tokenGenerate(user, function(token) {
            res.send(token)
          })
        } else {
          res.status(401).send(err)
        }
      })
    })
    .catch(err => res.status(401).send(err))
  }
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