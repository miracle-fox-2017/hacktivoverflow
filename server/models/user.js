const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
	name: String,
    email: String,
    password: String
});

var Users = mongoose.model('Users', userSchema);

module.exports = Users