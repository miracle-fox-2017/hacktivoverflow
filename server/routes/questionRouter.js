const router = require('express').Router()

//require controllers
const questionController = require('../controllers/questionController')

//require helper
const hashPassword = require('../helpers/hashPassword')
const verifyToken  = require('../middlewares/verifyToken')
const checkStatus  = require('../middlewares/checkStatus')

//route
router.get('/', questionController.welcomePage)

// | /api/signfb | POST | token(fb) | get token & store to database |
router.post('/signfb/', checkStatus, questionController.signfb)

// | /api/question | POST | tokenjwt, title, question, image(link) | post new question |
router.post('/question/', verifyToken.loginState, questionController.postQuestion)

// | /api/question/ | GET | (public) | get all question |
router.get('/question/', questionController.getQuestions)

// | /api/question/:id | GET | (public), params.id(question) | get specific question |
router.get('/question/:id', questionController.getQuestion)

// | /api/question/:id | PUT | tokenjwt, title, question, image(link) | edit specific question |
router.put('/question/:id', verifyToken.loginState, questionController.editQuestion)

// | /api/question/:id | DELETE | tokenjwt, params.id(question) | delete specific question |
router.delete('/question/:id', verifyToken.loginState, questionController.delQuestion)

//==========================question end

// | /api/question/:id/answer | POST | answer, image(link) | answer specific question |
// router.post('/question/:id/answer', verifyToken.loginState, questionController.postBlog)

// | /api/question/:id/answer/:answerid | DELETE | tokenjwt, params.id(question & answer) | delete answer |
// router.post('/question/:id/answer', verifyToken.loginState, questionController.postBlog)

// | /api/question/:id/vote/ | POST | tokenjwt, value | give vote specific question |
// router.post('/question/:id/vote', verifyToken.loginState, questionController.postBlog)

// | /api/question/:id/answer/:answerid/vote | POST | tokenjwt, value | give vote specific answer |
// router.post('/question/:id/answer/:answerid/vote', verifyToken.loginState, questionController.postBlog)

//other routes
// router.post('/signin', hashPassword.reHashed, questionController.signin)
// router.post('/signup', hashPassword.hashed, questionController.signup)

//export
module.exports = router;