var jwt = require('jsonwebtoken');
require('dotenv').config();

class CheckAuth {
  static isLogin (req, res, next) {
    // console.log('--> masuk check auth');
    // console.log(req.headers);
    jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY, function(err, decoded) {
      if(err) {
        res.status(401).send(err)
      } else {
        req.verifyUser = decoded
        // console.log(req.verifyUser);
        next()
      }
    })
  }
}

module.exports = CheckAuth;
