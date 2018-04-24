const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const middleware = require('../helpers/middleware');

/* GET questions listing. */
router.get('/', questionController.findAll);
router.get('/:questionId', questionController.findById);
router.post('/create', middleware.isSignIn,questionController.create);
router.put('/update/:questionId', middleware.isSignIn, questionController.update);
router.put('/update/:questionId/vote/:accountId', middleware.isSignIn, questionController.vote);
router.delete('/delete/:questionId', middleware.isSignIn, questionController.destroy);

module.exports = router;