const { Router } = require("express");
const {
  addConver,
  getConver,
  getConverInclude,
} = require("../controller/conversation.controller");

const conversationRouter = Router();

conversationRouter.post("/", addConver);
conversationRouter.get("/:userId", getConver);
conversationRouter.get("/find/:firstUserID/:secondUserId", getConverInclude);

module.exports = conversationRouter;
