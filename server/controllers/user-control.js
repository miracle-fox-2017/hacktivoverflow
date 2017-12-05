const User=require("../models/user-model");
const ObjectId=require("mongodb").ObjectID;
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

module.exports={
  signup:(req,res)=>{
    User.count({
      email:req.body.email
    }).then((result)=>{
      if(result == 0){
        bcrypt.hash(req.body.password,10).then((hash)=>{
          new User({
            email:req.body.email,
            password:hash
          }).save().then((response)=>{
            res.send({status:true,msg:response});
          });
        });
      }else{
        res.send({status:false,msg:"Email telah digunakan!"});
      }
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  },
  signin:(req,res)=>{
    User.find({
      email:req.body.email
    }).then((response)=>{
      if(response.length == 1){
        bcrypt.compare(req.body.password,response[0].password).then((compare)=>{
          if(compare){
            const token=jwt.sign({id:response[0]._id},process.env.SECRET_TOKEN);
            res.send({status:true,msg:token});
          }else{
            res.send({status:false,msg:"Pastikan email & password yang dimasukan benar!"});
          }
        });
      }else{
        res.send({status:false,msg:"Pastikan email & password yang dimasukan benar!"});
      }
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  },
  userid:(req,res)=>{
    const userId=jwt.verify(req.headers.token,process.env.SECRET_TOKEN).id;
    User.count({
      "_id":ObjectId(userId)
    }).then((count)=>{
      if(count == 1){
        res.send({status:true,msg:userId});
      }else{
        res.send({status:false,msg:"User not found!"});
      }
    }).catch((err)=>{
      res.send({status:false,msg:err});
    });
  }
};
