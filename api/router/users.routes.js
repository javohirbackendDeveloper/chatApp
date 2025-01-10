const { Router } = require("express");
const {
  userUpdate,
  userDelete,
  getOneUser,
  updateFollow,
  updateUnfollow,
  getFriend,
} = require("../controller/user.controller");

const usersRouter = Router();

usersRouter.put("/:id", userUpdate);
usersRouter.delete("/:id", userDelete);
usersRouter.get("/", getOneUser);
usersRouter.put("/:id/follow", updateFollow);
usersRouter.put("/:id/unfollow", updateUnfollow);
usersRouter.get("/:userId", getFriend);

module.exports = usersRouter;
