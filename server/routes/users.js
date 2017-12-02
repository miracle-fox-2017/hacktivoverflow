const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/user.js')

/* GET users id. */
router.get('/:id', Controllers.find);

//create user
router.post('/signup', Controllers.signUp)
router.post('/signin', Controllers.signIn)

module.exports = router;
