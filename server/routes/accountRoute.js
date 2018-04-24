const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const middleware = require('../helpers/middleware');

/* GET users listing. */
router.get('/', accountController.findAll);
router.get('/user', middleware.isSignIn, accountController.findAllLimited);
router.post('/create', accountController.create);
router.put('/update/:accountId', middleware.isSignIn, accountController.update);
router.delete('/delete/:accountId', middleware.isSignIn, accountController.destroy);

module.exports = router;