const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title : {
    type : String,
    required : true,
    minlength : 1,
    trim : true
  },
  question_content : {
    type : String,
    required : true
  },
  create_at : {
    type : Date,
    default : Date.now
  },
  author : {
    type : Schema.Types.ObjectId,
    ref : 'Users'
  },
  vote : [{
    type : Schema.Types.ObjectId,
    ref : 'Users'
  }]
})

const questionModels = mongoose.model('questions', questionSchema)
module.exports = questionModels