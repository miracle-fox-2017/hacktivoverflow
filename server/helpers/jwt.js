var jwt = require('jsonwebtoken');
require('dotenv').config();

class Jwt {
  static sign (req, res) {
    return new Promise((resolve, reject) => {
      // console.log('-------------> masuk jwt');
      // console.log(req);
      let payload = {
        id: req.id,
        username: req.name,
        email: req.email,
        isLogin: true,
        isAdmin: req.isAdmin
      }
      // console.log(payload);
      jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'}, function(err, token) {
        if(err) {
          reject(err)
        } else {
          resolve(token)
        }
      })
    })
  }
}

module.exports = Jwt;
