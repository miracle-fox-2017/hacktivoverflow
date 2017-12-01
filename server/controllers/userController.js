const ObjectId = require('mongodb').ObjectID
const userModel = require('../models/userModel')

class User {
  static create (req, res) {
    // console.log(req.body);
      let user = new userModel({
          name: req.body.name,
          gender: req.body.gender,
          picture: req.body.picture.data.url,
          email: req.body.email,
          isAdmin: req.body.isAdmin
      })
      // console.log(user)
      user.save()
      .then(user => {
        // console.log(user);
        res.send(user)
      })
      .catch(err => {
        // console.log(err);
        res.status(500).send(err)
      })
  }

  static getAll (req, res) {
    userModel.find()
    .then(users => {
      // console.log(users);
      res.send(users)
    })
    .catch(err => res.status(500).send(err))
  }

  static getById (req, res) {
    let id = {_id: ObjectId(req.params.id)}

    userModel.findById(id)
    .then(user => {
      // console.log(user);
      res.send(user)
    })
    .catch(err => res.status(500).send(err))
  }

  static getOne (req, res) {
    userModel.findOne({name: req.body.name})
    .then(user => {
      // console.log(user);
      res.send(user)
    })
    .catch(err => res.status(500).send(err))
  }

  static update (req, res) {
    let id = {_id: ObjectId(req.params.id)}

    userModel.findById(id)
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

    userModel.findByIdAndRemove(id)
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = User
