require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports = function(user, cb) {
  let payload = {
    id: user._id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  }
  jwt.sign(payload, process.env.JWT_SECRET, function(err, token) {
    cb({accesstoken: token})
  })
}