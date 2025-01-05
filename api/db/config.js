const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectDB() {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;
    if (!MONGODB_URL) {
      console.log("Sizning urlda muammo bor");
    }
    await mongoose.connect(MONGODB_URL);
    console.log("connected");
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectDB;
