const io = require("socket.io")(
  5000,

  {
    cors: {
      origin: "http://localhost:4000",
    },
  }
);

const addUser = (userID, socketId) => {
  !users.some((user) => user.userID === userID) &&
    users.push({ userID, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userID) => {
  return (users = users.find((user) => user.userID === userID));
};
let users = [];
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("addUser", (userID) => {
    addUser(userID, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
