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

usersRouter.put("/updateUser/:id", userUpdate);
usersRouter.delete("/deleteUser/:id", userDelete);
usersRouter.get("/getOneUser", getOneUser);
usersRouter.put("/updateFollow/:id", updateFollow);
usersRouter.put("/updateUnfollow/:id", updateUnfollow);
usersRouter.get("/getFriends/:userId", getFriend);

module.exports = usersRouter;
