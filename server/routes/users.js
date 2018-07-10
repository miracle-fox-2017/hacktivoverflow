var router = require('express').Router()
const controller = require('../controllers/users')

/* GET users listing. */
router.post('/signup', controller.signup)
router.post('/login', controller.login)

module.exports = router;
