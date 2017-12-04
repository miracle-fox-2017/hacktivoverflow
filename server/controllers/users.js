const Users = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('../helpers/bcrypt')
require('dotenv').config()

const signup = (req, res) => {
  bcrypt.encrypt(req.body.password)
  .then(hash => {
    let obj = {
      email: req.body.email,
      name: req.body.name,
      password: hash
    }
    Users.create(obj)
	  .then(response => { res.status(200).json(response) })
    .catch(err => { res.status(500).json(err) } )
  })
	.catch( err => { res.status(500).json(err) })
}

const login = (req, res) => {
	Users.find({ email: req.body.email })
	.then( response => { 
    if(response.length != 0){
      bcrypt.decrypt(req.body.password ,response[0].password)
      .then(result => {
        if(result){
          let token =
            jwt.sign({
            name: response.name,
            email: response.email
          }, process.env.TOKEN_JWT)
          res.status(200).json(token)
        }
        else {
          res.status(201).json('invalid email or password')
        }
      })
      .catch( err => { res.status(500).json(err) })
    }
    else {
      res.status(201).json('invalid email or password')
    }
	 })
	.catch( err => { res.status(500).json(err) })
}

module.exports = {
	signup,
	login
}