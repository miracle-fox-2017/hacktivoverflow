const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret_key = process.env.secretKey

var isLogin = (req, res, next) => {
  jwt.verify(req.body.token, secret_key, function(err, decoded) {
    // console.log(decoded)
    if(decoded) {
      req.header.decoded = decoded
      console.log('decoded>',decoded ,'<decoded');
      next()
    }
    else {
      res.status(401).send({
        error: 'please login first'
      })
    }
  })
}

module.exports = {
  isLogin
};