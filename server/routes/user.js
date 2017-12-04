const router=require("express").Router();
const UserControl=require("../controllers/user-control");

// SignUp User
router.post("/signup",UserControl.signup);

// SignIn User
router.post("/signin",UserControl.signin);

// Get user id from token
router.get("/userid",UserControl.userid);

module.exports=router;
