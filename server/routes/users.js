var express = require('express');
var router = express.Router();
var user = require('../controllers/controllerUser')
/* GET users listing. */
router.get('/', user.getAllDataUser)
router.post('/signup', user.signUp);
router.post('/signin', user.signIn);


module.exports = router;
