const router=require("express").Router();
const PostControl=require("../controllers/post-control");

// Get all post
router.get("/all",PostControl.all);

// Add new post
router.post("/add",PostControl.add);

// Edit post
router.put("/edit/:id",PostControl.edit);

// Upvote
router.post("/upvote/:id",PostControl.upvote);

// Downvote
router.post("/downvote/:id",PostControl.downvote);

// Delete post
router.delete("/delete/:id",PostControl.delete);

module.exports=router;
