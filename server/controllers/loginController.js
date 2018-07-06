const User = require('../models/userModel.js')
const compare = require('../helper/compare.js')
const jwt = require('jsonwebtoken')

// Check login credentials
let getLogin = function(req,res,next){
  console.log(req.body.password);
  User.findOne(
    {
      username: req.body.username
    },
    '_id username password role',
    function(err,dataUsers){
      if(err){
        res.status(500).send(err)
      }
      else{
        if(dataUsers !== null){
          compare(req.body.password,dataUsers.password).then(function(dataResponse){
            if(dataResponse){
              jwt.sign(
                {
                  id: dataUsers._id,
                  username: dataUsers.username,
                  role: dataUsers.role
                },
                'hahahaha',
                function(err,token){
                  if(err){
                    console.log(err);
                    res.status(500).send(err)
                  }
                  else{
                    req.isVerified = token
                    next()
                  }
                }
              )
            }
            else{
              res.status(401).send('not authorized')
            }
          }).catch(function(err){
            res.status(500).send(err)
          })
        }
        else{
          res.status(401).send('not authorized')
        }
      }
    }
  )
}

// Get verification
let verifyLogin = function(req,res,next){
  console.log(req.header.token);
  jwt.verify(
    req.isVerified,
    'hahahaha',
    function(err,decoded){
      if(err){
        res.send(err)
      }
      else{
        req.header.decode = decoded
        res.status(200).send(decoded)
      }
    }
  )
}

// Role verification (admin only)
let verifyAdmin = function(req,res,next){
  let dataDecoded = req.header.decode
  if(dataDecoded.role === 'admin'){
    next()
  }
  else{
    res.status(401).send('You are not supposed to see what in this page broh!')
  }
}

// Role verification (by id)
let verifyById = function(req,res,next){
  let dataDecoded = req.header.decode
  if(dataDecoded.id == req.params.idUser || dataDecoded.role === 'admin'){
    next()
  }
  else{
    res.status(401).send('You are not supposed to see what in this page broh!')
  }
}

module.exports = {
  getLogin,
  verifyLogin,
  verifyAdmin,
  verifyById
}
