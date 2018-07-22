const jwt = require('jsonwebtoken');
require('dotenv').config()

var isLogin = (req, res, next) => {
  jwt.verify(req.headers.access_token, process.env.jwtsecret, function(err, decoded) {
    if(decoded) {
      req.header.decoded = decoded
      console.log(decoded);
      next()
    }
    else {
      res.status(401).send({
        error: 'you have to login'
      })
    }
  })
}

module.exports = {
  isLogin
};
