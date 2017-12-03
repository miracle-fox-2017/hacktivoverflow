const route = require('express').Router()
const User  = require('../controllers/userCtrl')

route.get('/', User.getAllUser)
route.get('/:id', User.getUserById)
route.post('/loginfb', User.loginFB)
route.post('/loginuser', User.loginUser)
route.post('/', User.createUser)
route.put('/:id', User.updateUser)
route.delete('/:id', User.deleteUser)

module.exports = route