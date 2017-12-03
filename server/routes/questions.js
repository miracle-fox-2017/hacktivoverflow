const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/question')
const Middleware = require('../middleware/checklogin')

/* GET question*/
router.get('/', Controllers.findAll)
router.get('/:questionId', Controllers.findOne);

/* Post Question*/
router.post('/:userId', Middleware.isSignIn, Controllers.create)

/* Put Question / Edit Question*/
router.put('/:questionId', Middleware.isSignIn, Middleware.checkQuestionOwner,  Controllers.update)

/* Delete Question*/
router.delete('/:questionId', Middleware.isSignIn, Middleware.checkQuestionOwner, Controllers.remove)

/* Post Comment/answer*/
router.post('/:questionId/answer/:userId', Middleware.isSignIn,  Controllers.answer)

/* Delete Comment/answer*/
router.delete('/comment/:commentId', Middleware.isSignIn, Middleware.checkCommentOwner, Controllers.deleteCommend)

/* Vote question*/
router.put('/:questionId/vote/:userId', Middleware.isSignIn, Controllers.vote)

/* GET Comment*/
router.get('/comment/:questionId', Controllers.findComment)

router.put('/comment/:commentId/:userId', Middleware.isSignIn, Controllers.voteComment)

module.exports = router;


