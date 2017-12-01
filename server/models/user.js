const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

var userSchema = new Schema({


  name: {
    type: String,
    required: [true, 'Name is required']
  },

  email: {
    type: String,
    unique: true,
    validate: {
      validator: function(str) {
        return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(str);
      }
    },

    required: [true, 'Email is required']
  },

  password: {
    type: String,
    required: [true, 'Password is required']
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

userSchema.pre('save', function(next) {
  const saltRounds = 8;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  next()

})

var user = mongoose.model('users', userSchema)

module.exports = user;
