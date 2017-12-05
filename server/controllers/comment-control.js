const Comment=require("../models/comment-model");
const User=require("../models/user-model");
const ObjectId=require("mongodb").ObjectID;
const jwt=require("jsonwebtoken");

module.exports={
  all:(req,res)=>{
    Comment.find({
      "PostId":req.headers.postid
    }).sort({"_id":-1}).populate("UserId","email").then((response)=>{
      res.send({status:true,msg:response});
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  },
  add:(req,res)=>{
    const userId=jwt.verify(req.headers.token,process.env.SECRET_TOKEN).id;
    User.count({
      "_id":ObjectId(userId)
    }).then((count)=>{
      if(count == 1){
        req.body.UserId=userId;
        req.body.PostId=req.headers.postid;
        new Comment(req.body).save().then((response)=>{
          res.send({status:true,msg:response});
        });
      }else{
        res.send({status:false,msg:"User not found!"});
      }
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  },
  delete:(req,res)=>{
    if(req.headers.token == null){
      res.send({status:false,msg:"You don't have permission!"});
    }else{
      const userId=jwt.verify(req.headers.token,process.env.SECRET_TOKEN).id;
      Comment.findOne({
        "_id":req.params.id
      }).then((response)=>{
        if(response.UserId == userId){
          Comment.deleteOne({
            "_id":req.params.id
          }).then((deleted)=>{
            res.send({status:true,msg:deleted});
          });
        }else{
          res.send({status:false,msg:"You don't have permission!"});
        }
      }).catch((err)=>{
        res.send({status:false,msg:err});
      });
    }
  },
  upvote:(req,res)=>{
    const userId=jwt.verify(req.headers.token,process.env.SECRET_TOKEN).id;
    Comment.findOne({
      "_id":ObjectId(req.params.id)
    }).then(({vote,downvote})=>{
      if(downvote.indexOf(userId) != -1){
        downvote.splice(downvote.indexOf(userId),1);
      }
      if(vote.indexOf(userId) == -1){
        vote.push(userId);
        Comment.updateOne({"_id":ObjectId(req.params.id)},{
          vote:vote,
          downvote:downvote
        }).then((response)=>{
          res.send({status:true,msg:response});
        });
      }
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  },
  downvote:(req,res)=>{
    const userId=jwt.verify(req.headers.token,process.env.SECRET_TOKEN).id;
    Comment.findOne({
      "_id":ObjectId(req.params.id)
    }).then(({vote,downvote})=>{
      if(vote.indexOf(userId) != -1){
        vote.splice(vote.indexOf(userId),1);
      }
      if(downvote.indexOf(userId) == -1){
        downvote.push(userId);
        Comment.updateOne({"_id":ObjectId(req.params.id)},{
          vote:vote,
          downvote:downvote
        }).then((response)=>{
          res.send({status:true,msg:response});
        });
      }
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  }
};
