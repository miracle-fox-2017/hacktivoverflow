const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


let userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
})

let User = mongoose.model('users', userSchema)

module.exports = User