const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const commentSchema=new Schema({
  UserId:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  PostId:{
    type:Schema.Types.ObjectId,
    ref:"Post"
  },
  comment:String,
  vote:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  downvote:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],
  createdAt:{
    type:Date,
    default:new Date()
  }
});
const Comment=mongoose.model("Comment",commentSchema);

module.exports=Comment;
