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

    await authSchema.create({ username, email, password: hash });

    res.json({
      message: "Successfully registered",
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

    const checker = bcrypt.compare(password, foundedUser.password);

    if (!checker) {
      return res.json({
        message: "Password is wrong",
      });
    }

    res.json({ message: "Successfully logged in" });
    // const token = await jwt.sign(
    //   foundedUser.password,
    //   foundedUser.id,
    //   process.env.JWT_KEY ,
    // );
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
