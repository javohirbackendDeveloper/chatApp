const { Router } = require("express");
const {
  addPost,
  updatePost,
  deletePost,
  putLike,
  getPost,
  getPosts,
  getUsername,
  getUserId,
} = require("../controller/post.controller");

const postRouter = Router();

postRouter.post("/", addPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);
postRouter.put("/:id/like", putLike);
postRouter.get("/:id", getPost);
postRouter.get("/timeline/:userId", getPosts);
postRouter.get("/profile/:username", getUsername);
postRouter.get("/getUserId/:username", getUserId);
module.exports = postRouter;
