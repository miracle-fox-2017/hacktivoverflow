require('dotenv').config()
const jwt = require('jsonwebtoken');

isLogin = (req, res, next) => {
  if(req.headers.accesstoken) {
    jwt.verify(req.headers.accesstoken, process.env.JWT_SECRET, (err, decode) => {
      if(decode) {
        req.userLogin = decode
        next()
      } else {
        res.send({access: 'denied'})
      }
    })
  } else {
    res.send({access: 'denied'})
  }
}

module.exports = {
  isLogin
}