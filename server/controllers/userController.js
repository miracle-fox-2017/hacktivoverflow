const User = require('../models/userModel.js')
const crypt = require('../helper/crypt.js')

// Finding all users
let findAllUsers = function (req, res) {
  User.find().then(function (dataUser) {
    res.status(200).send(dataUser)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Find user by id
let findUserById = function (req, res) {
  User.findOne(
    {
      _id: req.params.idUser
    }
  ).then(function (dataUser) {
    res.status(200).send(dataUser)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Adding new user
let addNewUser = function (req, res) {
  crypt(req.body.password).then(function (dataPassword) {
    let newUser = User(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: dataPassword,
        role: 'user'
      }
    )
    newUser.save().then(function (dataUser) {
      res.status(200).send(dataUser)
    }).catch(function (err) {
      res.status(500).send(err)
    })
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Updating user
let updateUser = function (req, res) {
  User.findOneAndUpdate(
    {
      _id: req.params.idUser
    },
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role: req.body.role
    }
  ).then(function (dataUser) {
    res.status(200).send(dataUser)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Deleting user
let removeUser = function (req, res) {
  User.findOneAndRemove(
    {
      _id: req.params.idUser
    },
  ).then(function (dataUser) {
    res.status(200).send(dataUser)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

module.exports = {
  findAllUsers,
  findUserById,
  addNewUser,
  updateUser,
  removeUser
}
