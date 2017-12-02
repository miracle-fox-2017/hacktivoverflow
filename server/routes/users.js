const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers')

/* GET users listing. */
router.get('/', usersControllers.getAll);
router.get('/:id', usersControllers.getOne);
router.post('/signup', usersControllers.signup);
router.put('/:id', usersControllers.update);
router.delete('/:id', usersControllers.remove);
router.post('/login', usersControllers.login);

module.exports = router;
