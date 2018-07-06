const FB         = require('fb')
const fb         = new FB.Facebook({version: 'v2.8'})
const bcrypt     = require('bcrypt')
const saltRounds = 10
const User       = require('../models/userModel')
const jwt        = require('jsonwebtoken')

class UserCtrl {

  static createUser (req, res) {
    bcrypt.hash(req.body.password, saltRounds).then(hash => {
      // Store hash in your password DB.
      User.create({
        name     : req.body.name,
        memberid : null,
        email    : req.body.email,
        password : hash, 
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .then(newUserData => res.status(200).send(newUserData))
      .catch(err => res.status(500).send(err))
    })
  }
  
  static getAllUser (req, res) {
    User.find()
    .then(usersData => res.status(200).send(usersData))
    .catch(err => res.status(500).send(err))
  }

  static getUserById (req, res) {
    User.findById(req.params.id)
    .then(userData => res.status(200).send(userData))
    .catch(err => res.status(500).send(err))
  }

  static updateUser (req, res) {
    User.findById(req.params.id)
    .then(userData => {
      userData.name = req.body.name || userData.name,
      userData.email = req.body.email || userData.email,
      userData.password = req.body.password || userData.password,
      userData.updatedAt = new Date()

      userData.save()
      .then(newUserData => res.status(200).send(newUserData))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static deleteUser (req, res) {
    User.findByIdAndRemove(req.params.id)
    .then(deletedUser => res.status(500).send(deletedUser))
    .catch(err => res.status(500).send(err))
  }

  static loginUser (req, res) {
    User.findOne({
      email: req.body.email
    })
    .then(userData => {
      if (userData === null) {
        res.status(403).send('invalid')
      } else {
        bcrypt.compare(req.body.password, userData.password).then(response => {
          console.log('ini response', response)
          // res == true
          if (!response) {
            res.status(403).send('invalid')
          } else {
            var token = jwt.sign({ 
              userID: userData._id,
              isLogin: true  
            }, 'shhhhh')
            res.status(200).send(token)
          }
        })
      }
    })
    .catch(err => res.status(500).send(err))
  }

  static loginFB (req, res) {
    User.findOne({
      memberid: req.body.userID
    })
    .then(userData => {
      if (userData === null) {
        FB.setAccessToken(req.headers.accesstoken)
        FB.api(req.body.userID, { fields: ['id', 'name', 'email'] }, function (response) {
          if(!response || response.error) {
            console.log(!response ? 'error occurred' : response.error)
            res.status(500).send(response.error)
          }

          User.create({
            name     : response.name,
            memberid : response.id,
            email    : response.email,
            password : null, 
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .then(newUserData => {
            var token = jwt.sign({ 
              userID: newUserData._id,
              isLogin: true  
            }, 'shhhhh')

            res.status(200).send(token)
          })
          .catch(err => res.status(500).send(err))          
        })
      } else {
        var token = jwt.sign({ 
          userID: userData._id,
          isLogin: true  
        }, 'shhhhh')
        res.status(200).send(token)
      }
    })
    .catch(err => res.status(500).send(err))
  }
}

module.exports = UserCtrl