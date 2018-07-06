const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController.js')

// Find all post
router.get('/', postController.findAllPost)

// Find post by id
router.get('/:idPost', postController.findPostById)

// Add new post
router.post('/', postController.postNewQuestion)

// Update post
router.put('/:idPost', postController.updatePost)

// Update answer
router.put('/addAnswer/:idPost', postController.updatePostAnswer)

// Update vote post
router.put('/addVotePost/:idPost', postController.updateVotePost)

// Delete post
router.delete('/:idPost', postController.removePost)

module.exports = router
