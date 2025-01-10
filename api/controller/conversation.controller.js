const conversationSchema = require("../schema/conversation.schema");

const addConver = async (req, res) => {
  const newConversation = new conversationSchema({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    console.log(req.body.senderId);

    const saver = await newConversation.save();
    res.json(saver);
  } catch (error) {
    console.log(error);
  }
};

const getConver = async (req, res) => {
  try {
    const conver = await conversationSchema.find({
      members: { $in: [req.params.userId] },
    });
    res.json(conver);
  } catch (error) {
    console.log(error);
  }
};

const getConverInclude = async (req, res) => {
  try {
    const conversation = await conversationSchema.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.json(conversation);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addConver,
  getConver,
  getConverInclude,
};
