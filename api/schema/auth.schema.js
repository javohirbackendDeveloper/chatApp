const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      // required: true,
      max: 50,
      min: 3,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 100,
      min: 6,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 100,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
      default: "",
    },
    city: {
      type: String,
      max: 50,
      default: "",
    },
    from: {
      type: String,
      max: 50,
      default: "",
    },
    relationship: {
      type: String,
      enum: [1, 2, 3],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Users", userSchema);
