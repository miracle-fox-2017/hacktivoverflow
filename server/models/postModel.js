const mongoose = require('mongoose')
const Schema = mongoose.Schema

let postSchema = new Schema(
  {
    title: String,
    content: String,
    userPost: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    answer: [{
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }],
    votePost: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    voteCount: Number,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }
)

let Post = mongoose.model('Post', postSchema)
module.exports = Post
