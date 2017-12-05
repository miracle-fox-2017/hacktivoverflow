const Post=require("../models/post-model");
const User=require("../models/user-model");
const ObjectId=require("mongodb").ObjectID;
const jwt=require("jsonwebtoken");

module.exports={
  all:(req,res)=>{
    Post.find().sort({"_id":-1}).then((response)=>{
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
      if(count == 0){
        res.send({status:false,msg:"Please login first!"});
      }else{
        req.body.UserId=userId;
        new Post(req.body).save().then((response)=>{
          res.send({status:true,msg:response});
        });
      }
    }).catch((err)=>{
      res.send({status:false,msg:err});
    })
  },
  edit:(req,res)=>{
    const userId=jwt.verify(req.headers.token,process.env.SECRET_TOKEN).id;
    Post.findOne({
      "_id":ObjectId(req.params.id)
    }).then((response)=>{
      if(response == null){
        res.send({status:false,msg:"Post not found!"});
      }
      if(response.UserId == userId){
        Post.updateOne({"_id":ObjectId(req.params.id)},req.body).then((updated)=>{
          res.send({status:true,msg:updated});
        });
      }else{
        res.send({status:false,msg:"Token not match!"});
      }
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  },
  upvote:(req,res)=>{
    const userId=jwt.verify(req.headers.token,process.env.SECRET_TOKEN).id;
    Post.findOne({
      "_id":ObjectId(req.params.id)
    }).then(({vote,downvote})=>{
      if(downvote.indexOf(userId) != -1){
        downvote.splice(downvote.indexOf(userId),1);
      }
      if(vote.indexOf(userId) == -1){
        vote.push(userId);
        Post.updateOne({"_id":ObjectId(req.params.id)},{
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
    Post.findOne({
      "_id":ObjectId(req.params.id)
    }).then(({vote,downvote})=>{
      if(vote.indexOf(userId) != -1){
        vote.splice(vote.indexOf(userId),1);
      }
      if(downvote.indexOf(userId) == -1){
        downvote.push(userId);
        Post.updateOne({"_id":ObjectId(req.params.id)},{
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
  delete:(req,res)=>{
    const userId=jwt.verify(req.headers.token,process.env.SECRET_TOKEN).id;
    Post.findOne({
      "_id":ObjectId(req.params.id)
    }).then((response)=>{
      if(response == null){
        res.send({status:false,msg:"Post not found!"});
      }
      if(response.UserId == userId){
        Post.deleteOne({
          "_id":ObjectId(req.params.id)
        }).then((deleted)=>{
          res.send({status:true,msg:deleted});
        });
      }else{
        res.send({status:false,msg:"Token not match!"});
      }
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  }
};
