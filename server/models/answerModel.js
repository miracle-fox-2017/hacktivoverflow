const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  answer_content : {
    type : String,
    required : true
  },
  by : {
    type : Schema.Types.ObjectId,
    ref : 'Users',
    required: true
  },
  question : {
    type : Schema.Types.ObjectId,
    ref : 'questions',
    required : true
  },
  vote : [{
    type : Schema.Types.ObjectId,
    ref : 'Users'
  }],
  create_at : {
    type : Date,
    default : Date.now
  },
})

const answerModels = mongoose.model('answers', answerSchema)
module.exports = answerModels