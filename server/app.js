const app=require("express")();
const env=require("dotenv").config();
const mongoose=require("mongoose");
const parser=require("body-parser");
const cors=require("cors");

mongoose.connect(process.env.DB_URL);
app.use(parser.urlencoded({extended:false}));
app.use(parser.json());
app.use(cors());

const user=require("./routes/user");
app.use("/user",user);

const post=require("./routes/post");
app.use("/post",post);

const comment=require("./routes/comment");
app.use("/comment",comment);

app.listen(process.env.SERVER_PORT,()=>{
  console.log(`Server Started! Listenning on port ${process.env.SERVER_PORT}`);
});
