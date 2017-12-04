const bcrypt = require('bcrypt');
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
  console.log(password, hash)
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

module.exports = {
  encrypt,
  decrypt
}