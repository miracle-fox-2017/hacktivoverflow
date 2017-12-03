const jwt = require('jsonwebtoken');

module.exports = function (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}