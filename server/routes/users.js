const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers')
const checkAuth = require('../middleware/checkAuth')

/* GET users listing. */
router.get('/', usersControllers.getAll);
router.get('/:id', checkAuth.isLogin, usersControllers.getOne);
router.post('/signup', usersControllers.signup);
router.put('/:id', checkAuth.isLogin, usersControllers.update);
router.delete('/:id', checkAuth.isLogin, usersControllers.remove);
router.post('/login', usersControllers.login);

module.exports = router;
