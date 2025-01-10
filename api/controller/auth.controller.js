const authSchema = require("../schema/auth.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const foundedUser = await authSchema.findOne({ username });

    if (foundedUser) {
      return res.json({
        message: "This user already exist",
      });
    }

    const hash = await bcrypt.hash(password, 12);

    const newUser = await authSchema.create({
      username,
      email,
      password: hash,
    });

    res.json({
      message: "Successfully registered",
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundedUser = await authSchema.findOne({ email });

    if (!foundedUser) {
      return res.json({
        message: "User not found",
      });
    }

    const checker = await bcrypt.compare(password, foundedUser.password);

    console.log(password, foundedUser.password);

    if (!checker) {
      return res.json({
        message: "Password is wrong",
      });
    }

    res.json(foundedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
