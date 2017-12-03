const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');
const middleware = require('../helpers/middleware');

/* GET answers listing. */
router.get('/', answerController.findAll);
router.post('/question/:questionId', middleware.isSignIn,answerController.create);
router.put('/update/:answerId', middleware.isSignIn, answerController.update);
router.put('/update/:answerId/vote/:accountId', middleware.isSignIn, answerController.vote);
router.delete('/delete/:answerId', middleware.isSignIn, answerController.destroy);

module.exports = router;