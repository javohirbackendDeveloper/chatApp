const { Router } = require("express");
const {
  addPost,
  updatePost,
  deletePost,
  putLike,
  getPost,
  getPosts,
  getUsername,
} = require("../controller/post.controller");

const postRouter = Router();

postRouter.post("/addPost", addPost);
postRouter.put("/updatePost/:id", updatePost);
postRouter.delete("/deletePost/:id", deletePost);
postRouter.put("/putLike/:id", putLike);
postRouter.get("/getPost/:id", getPost);
postRouter.get("/getPosts/:userId", getPosts);
postRouter.get("/getPosts/profile/:username", getUsername);
module.exports = postRouter;
