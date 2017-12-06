// const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/todo?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
const mongoose = require('mongoose').connect('mongodb://localhost/hacktivoverflow');
const User = require('../models/userModel')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const allUsers = (req, res) => {
  User.find()
  .then(users => res.send(users))
  .catch(err => res.status(500).send(err))
}

const createUser = (req, res) => {
  const saltRounds = 10;
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',req.body);
  let input = req.body
  console.log('INPUT', input)
  User.findOne({
      username: input.username
  })
  .then(user => {
    // console.log('STATUS', user);
    if(!user){
      bcrypt.hash(input.password, saltRounds).then(function(hash) {
        let obj = {
          gender: input.gender,
          picture: input.picture,
          name: input.name,
          username: input.username,
          password: hash,
          email : input.email
        }
        User.create(obj)
        .then( user => {
          res.send(
          {
            msg: 'Success created account',
            data: user
          })
        })
      });
    } else {
      res.send(
      {
        msg: 'Username already exists !!'
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err)
  })
}

const deleteUser = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}
  User.deleteOne(id)
  .then(user => res.send(
  {
    msg : 'Your account user has been removed'
  })
  )
  .catch(err => res.status(500).send(err))
}

const signinUser = (req, res) => {
  console.log('MASUK LOGIN', req.body);
  let signin = req.body
  User.findOne(
  {
    username: signin.username
  })
  .then(user => {
    if(user){
      bcrypt.compare(signin.password, user.password)
      .then( result => {
        if(result){
          jwt.sign(
          {
            id: user._id,
            name : user.name,
            username : user.username,
            email : user.email,
            picture : user.picture
          },
           ' process.env.SECRET_KEY',
            (err, token) => {
              // console.log('TOKEN', token);
              if(!err){
                console.log(
                  token, `Welcome ${user.name}`, user._id
                );
                res.send(
                {
                  token: token,
                  name : user.name,
                  user_id: user._id,
                  email : user.email,
                  picture : user.picture
                })
              } else {
                res.status(400).send(err)
              }
            })
        } else {
          res.send({msg: 'Wrong Password or username'})
        }
      });
    } else {
      res.send({msg: 'Wrong Password or username'})
    }
  })
  .catch(err => {
    res.status(500).send({msg: 'Wrong Password or username'})
  })
}

const editUser = (req , res) =>{
  let id = ObjectId(req.params.id)
  let input = req.body
  const saltRounds = 10;
  console.log(input)
  User.findById(id)
  .then(dataUser => {
    console.log(dataUser)
    bcrypt.hash(input.password, saltRounds).then(function(hash) {
      dataUser.name = input.name,
      dataUser.username = input.username,
      dataUser.password = hash,
      dataUser.email = input.email
      dataUser.save(function(err, data) {
        if (err) throw err;
        res.send(
        {
          data : data,
          msg: 'User successfully updated!'
        });
      });
    })
  })
  .catch(err => res.status(500).send(err))
}

const detailUser = (req, res) => {
  let id = ObjectId(req.params.id)
  // console.log('MASUK')
  User.findOne({
    _id: id
  })
  .then(dataUser => {
    res.send(dataUser)
  })
  .catch(err => {
    res.status(500).send(err) 
    console.log(err)
  })
}

module.exports = {
  allUsers,
  createUser,
  editUser,
  signinUser,
  deleteUser,
  detailUser
};