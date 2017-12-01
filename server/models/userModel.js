const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: {type: String, require: true},
  password: String,
  first_name: String,
  last_name: String,
  email: String,
  google_id: {type: String, default: ''},
  facebook_id: {type: String, default: ''},
})

var User = mongoose.model('User', UserSchema)

module.exports = User