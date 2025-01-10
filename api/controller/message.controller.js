const messageSchema = require("../schema/message.schema");

const addMessage = async (req, res) => {
  const newMessage = new messageSchema(req.body);
  try {
    const saver = await newMessage.save();

    res.json(saver);
  } catch (error) {
    console.log(error);
  }
};

const getMessage = async (req, res) => {
  try {
    const messages = await messageSchema.find({
      conversationId: req.params.conversationId,
    });
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addMessage,
  getMessage,
};
