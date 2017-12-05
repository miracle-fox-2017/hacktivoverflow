var jwt = require('jsonwebtoken');

let isLogin = (req, res, next) =>{
  // console.log('MASUK CHECK LOGIn')
  // console.log('body ', req.body)
  // console.log('headerrrss ', req.headers)
  let token = JSON.parse(req.headers.token)
  // console.log(token)
  // verify a token symmetric
  // console.log('INI TOKEN',token.token)
  jwt.verify(token.token, ' process.env.SECRET_KEY', function(err, decoded) {
    if(!err){
      // console.log('DI VERIVY', decoded)
      req.decoded = decoded
      next()
    } else {
      console.log(err)
      res.send(err)
    }
  });
}

module.exports = {
  isLogin
}