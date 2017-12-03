require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

let User = mongoose.model('User', userSchema);

module.exports = User;