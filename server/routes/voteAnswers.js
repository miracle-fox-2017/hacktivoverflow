const express = require('express');
const router = express.Router();
const voteAnswerControllers = require('../controllers/voteAnswerControllers')
const checkAuth = require('../middleware/checkAuth')

router.post('/', checkAuth.isLogin, voteAnswerControllers.create);
router.delete('/:id', checkAuth.isLogin, voteAnswerControllers.remove);
router.get('/answers/:answerId', voteAnswerControllers.getAnswers);

module.exports = router;