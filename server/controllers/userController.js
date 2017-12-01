require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {

  static signUp(req, res) {

    User
        .create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        })
        .then((user) => {
          res.status(201).send(user)
        })
        .catch((err) => {
          res.status(400).send(err)
        })
  }

  static signIn(req, res) {

    User
        .findOne({
          email: req.body.email
        })
        .then((user) => {
          if(user) {
            var validpassword = bcrypt.compareSync(req.body.password, user.password)

            if(validpassword) {
              var payload = {
                _id: user._id,
                name: user.name,
                email: user.email
              }
              res.status(200).send({
                access_token: jwt.sign(payload, process.env.jwtsecret)
              })
            }
            else {
              res.status(403).send({
                message: 'email or password is wrong'
              })
            }
          }
        })
        .catch((err) => {
          res.status(400).send(err)
        })
  }

}

module.exports = UserController;
