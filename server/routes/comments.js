const router = require('express').Router()
const controller = require('../controllers/comments') 

router.post('/add', controller.add)
router.get('/list/:id', controller.list)
router.delete('/destroy/:id', controller.destroy)
router.put('/like', controller.like)

module.exports = router