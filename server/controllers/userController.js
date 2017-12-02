const ObjectId = require('mongodb').ObjectID
const UserModel = require('../models/userModel')
const jwt = require('../helpers/jwt')

class User {
  static create (req, res) {
    // console.log(req.body);
    UserModel.findOne({facebookId: req.body.id})
    .then(user => {
      if(user) {
        // console.log('-------------> gerbang tol jwt');
        jwt.sign(user)
        .then(token => {
          console.log('ini token -->', {token: token})
          res.send({token: token})
        })
        .catch(err => res.status(500).send(err))
      } else {
        // console.log('-------------> masuk create');
        let user = new UserModel({
          facebookId: req.body.id,
          name: req.body.name,
          gender: req.body.gender,
          picture: req.body.picture.data.url,
          email: req.body.email,
          isAdmin: req.body.isAdmin
        })
        // console.log(user)
        user.save()
        .then(user => {
          // console.log('-----> masuk ga?');
          jwt.sign(user)
          .then(token => {
            res.send({token: token})
          })
          .catch(err => {
            console.log(err)
          })
        })
        .catch(err => {
          // console.log(err);
          res.status(500).send(err)
        })
      }
    })
    .catch(err => {
      console.log('masuk error', err)
    })
  }

  static getAll (req, res) {
    UserModel.find()
    .then(users => {
      // console.log(users);
      res.send(users)
    })
    .catch(err => res.status(500).send(err))
  }

  static getById (req, res) {
    let id = {_id: ObjectId(req.params.id)}

    UserModel.findById(id)
    .then(user => {
      // console.log(user);
      res.send(user)
    })
    .catch(err => res.status(500).send(err))
  }

  static getOne (req, res) {
    UserModel.findOne({name: req.body.name})
    .then(user => {
      // console.log(user);
      res.send(user)
    })
    .catch(err => res.status(500).send(err))
  }

  static update (req, res) {
    let id = {_id: ObjectId(req.params.id)}

    UserModel.findById(id)
    .then(user => {
      // console.log(user);
      user.name = req.body.name || user.name,
      user.gender = req.body.gender || user.gender,
      user.picture = req.body.picture || user.picture,
      user.email = req.body.email || user.email,
      user.isAdmin = req.body.isAdmin || user.isAdmin
      user.updatedAt = new Date()

      user.save()
      .then(user => res.send(user))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  }

  static remove (req, res) {
    let id = {_id: ObjectId(req.params.id)}

    UserModel.findByIdAndRemove(id)
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = User
