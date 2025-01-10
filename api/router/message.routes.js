const { Router } = require("express");
const { addMessage, getMessage } = require("../controller/message.controller");

const messageRouter = Router();

messageRouter.post("/", addMessage);
messageRouter.get("/:conversationId", getMessage);

module.exports = messageRouter;
