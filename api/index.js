const express = require("express");
const http = require("http"); // HTTP server yaratish uchun
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/config.js");
const helmet = require("helmet");
const morgan = require("morgan");
const usersRouter = require("./router/users.routes.js");
const authRouter = require("./router/auth.routes.js");
const postRouter = require("./router/post.routes.js");
const multer = require("multer");
const path = require("path");
const conversationRouter = require("./router/conversation.routes.js");
const messageRouter = require("./router/message.routes.js");

dotenv.config();
const app = express();

app.use("/image", express.static(path.join(__dirname, "public/image")));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Multer sozlamalari
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

// Routers
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/messages", messageRouter);

connectDB();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
