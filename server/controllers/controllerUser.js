const User = require('../models/modelUser')
const Encrypt = require('../helpers/encrypt')
const Decrypt = require('../helpers/decrypt')
const jwt = require('jsonwebtoken')

let signUp = (req, res) => {
  Encrypt(req.body.password).then((newPassword) => {
    User.create({
      username: req.body.username,
      password: newPassword
    }).then((dataUser) => {
      res.send(dataUser)
    }).catch((reason) => {
      res.send(reason)
    })
  })
}

let signIn = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .then((dataUser) => {
      Decrypt(req.body.password, dataUser.password)
        .then((result) => {
          if (!result) {
            res.send("Authentication failed. User not found")
          } else {
            const payload = {
              id: dataUser._id,
              username: dataUser.username,
              isLogin: true
            }
            jwt.sign(payload, process.env.SECRET, function (err, token) {
              if (err) {
                throw err
              } else {
                res.send({
                  message: "Berhasil login",
                  token: token,
                  data: payload
                })
              }
            })
          }
        })
        .catch((reason) => {
          res.send(reason)
        })
    })
    .catch((reason) => {
      res.send(reason)
    })
}

const getAllDataUser = (req, res) => {
  User.find()
    .then((dataUsers) => {
      res.send(dataUsers)
    })
    .catch((reason) => {
      res.send(reason)
    })
}

module.exports = {
  signUp,
  signIn,
  getAllDataUser
}