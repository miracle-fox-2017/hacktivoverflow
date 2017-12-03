const express = require('express');
const router = express.Router();
const answerControllers = require('../controllers/answerControllers')
const checkAuth = require('../middleware/checkAuth')

router.post('/', checkAuth.isLogin, answerControllers.create);
router.get('/:questionId', answerControllers.getAll);
router.delete('/:id', checkAuth.isLogin, answerControllers.remove);

module.exports = router;
