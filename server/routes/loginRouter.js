const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

// Get login
router.post('/', loginController.getLogin, loginController.verifyLogin)

module.exports = router
