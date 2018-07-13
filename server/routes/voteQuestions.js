const express = require('express');
const router = express.Router();
const voteQuestionControllers = require('../controllers/voteQuestionControllers')
const checkAuth = require('../middleware/checkAuth')

router.post('/', checkAuth.isLogin, voteQuestionControllers.create);
router.delete('/:id', checkAuth.isLogin, voteQuestionControllers.remove);
router.get('/questions/:questionId', voteQuestionControllers.getQuestions);

module.exports = router;