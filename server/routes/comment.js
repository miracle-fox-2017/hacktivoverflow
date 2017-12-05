const router=require("express").Router();
const CommentControl=require("../controllers/comment-control");

// Get all comment based on post id
router.get("/all",CommentControl.all);

// Add new comment
router.post("/add",CommentControl.add);

// Delete comment
router.delete("/delete/:id",CommentControl.delete);

// Upvote comment
router.post("/upvote/:id",CommentControl.upvote);

// Downvote comment
router.post("/downvote/:id",CommentControl.downvote);

module.exports=router;
