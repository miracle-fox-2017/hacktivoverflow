require('dotenv').config()
const jwt = require('jsonwebtoken');

isLogin = (req, res, next) => {
  if(req.headers.accesstoken) {
    jwt.verify(req.headers.accesstoken, process.env.JWT_SECRET, (err, decode) => {
      req.userLogin = decode
      next()
    })
  } else {
    res.status(401).send('Permission denied..!!')
  }
}

module.exports = {
  isLogin
}