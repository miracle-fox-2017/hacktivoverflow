require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  article: String
});

let Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;