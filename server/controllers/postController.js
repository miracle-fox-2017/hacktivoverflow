const Post = require('../models/postModel.js')

// Find all post
let findAllPost = function (req, res) {
  Post.find()
  .populate('answer')
  .populate('userPost')
  .populate('votePost')
  .exec()
  .then(function(dataPost){
    res.status(200).send(dataPost)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Find post by id
let findPostById = function (req, res) {
  Post.findOne(
    {
      _id: req.params.idPost
    }
  )
  .populate('answer')
  .populate('userPost')
  .populate('votePost')
  .exec()
  .then(function (dataPost) {
    res.status(200).send(dataPost)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Adding new post
let postNewQuestion = function (req, res) {
  let newPost = Post(
    {
      title: req.body.title,
      content: req.body.content,
      userPost: req.body.userPost,
      answer: req.body.idAnswer,
      votePost: req.body.votePost,
      voteCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  )
  newPost.save().then(function (dataPost) {
    res.status(200).send(dataPost)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Updating post
let updatePost = function (req, res) {
  Post.findOneAndUpdate(
    {
      _id: req.params.idPost
    },
    {
      title: req.body.title,
      content: req.body.content,
      updatedAt: new Date()
    }
  )
  .populate('answer')
  .populate('userPost')
  .populate('votePost')
  .exec()
  .then(function (dataPost) {
    res.status(200).send(dataPost)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Update answer
let updatePostAnswer = function (req, res) {
  Post.findOneAndUpdate(
    {
      _id: req.params.idPost
    },
    {
      answer: req.body.answer
    }
  )
  .populate('answer')
  .populate('userPost')
  .populate('votePost')
  .exec()
  .then(function (dataPost) {
    res.status(200).send(dataPost)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Update votePost
let updateVotePost = function (req, res) {
  Post.findOneAndUpdate(
    {
      _id: req.params.idPost
    },
    {
      votePost: req.body.votePost,
      voteCount: req.body.voteCount
    }
  )
  .populate('answer')
  .populate('userPost')
  .populate('votePost')
  .exec()
  .then(function (dataPost) {
    res.status(200).send(dataPost)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

// Deleting post
let removePost = function (req, res) {
  Post.findOneAndRemove(
    {
      _id: req.params.idPost
    }
  ).then(function (dataPost) {
    res.status(200).send(dataPost)
  }).catch(function (err) {
    res.status(500).send(err)
  })
}

module.exports = {
  findAllPost,
  findPostById,
  updatePost,
  updatePostAnswer,
  updateVotePost,
  postNewQuestion,
  removePost
}
