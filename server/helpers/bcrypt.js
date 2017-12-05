const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const encrypt = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, +process.env.SALT_ROUND, function(err, hash) {
      if(err){
        reject(err)
      }
      else {
        resolve(hash)
      }
    });
  })
}

const decrypt = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function(err, res) {
     if(err){
       reject(err)
     }
     else {
       resolve(res)
     }
    })
  })
}

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_JWT, function(err, decoded) {
      if(err){
        reject(err)
      }else {
        resolve(decoded)
      }
    });
  })
}

module.exports = {
  encrypt,
  decrypt,
  verify
}