const bcrypt = require("bcrypt");
const authSchema = require("../schema/auth.schema");

const userUpdate = async (req, res, next) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
          console.log(error);
        }
      }

      try {
        const user = await authSchema.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.json("Account has been updated");
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.json("You can update only your account");
    }
  } catch (error) {
    next(error);
  }
};

const userDelete = async (req, res, next) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = await authSchema.findByIdAndDelete(req.params.id, {
          $set: req.body,
        });
        res.json("Account has been Deleted");
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.json("You can delete only your account");
    }
  } catch (error) {
    next(error);
  }
};

const getOneUser = async (req, res, next) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const foundedUser = userId
      ? await authSchema.findById(userId)
      : await authSchema.findOne({ username: username });

    if (!foundedUser) {
      return res.json("This user not found");
    }

    const { password, updatedAt, createdAt, __v, ...other } = foundedUser._doc;

    res.json(other);
  } catch (error) {
    next(error);
  }
};

const updateFollow = async (req, res, next) => {
  try {
    if (req.body.userId !== req.params.id) {
      try {
        const foundedUser = await authSchema.findById(req.params.id);
        const currentUser = await authSchema.findById(req.body.userId);
        if (!foundedUser.followers.includes(req.body.userId)) {
          await foundedUser.updateOne({
            $push: { followers: req.body.userId },
          });
          await currentUser.updateOne({
            $push: { followings: req.params.id },
          });
          res.json("User has been followed");
        } else {
          res.json("You already follow");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.json("You can follow yourself");
    }
  } catch (error) {
    next(error);
  }
};

const updateUnfollow = async (req, res, next) => {
  try {
    if (req.body.userId !== req.params.id) {
      try {
        const foundedUser = await authSchema.findById(req.params.id);
        const currentUser = await authSchema.findById(req.body.userId);
        if (foundedUser.followers.includes(req.body.userId)) {
          await foundedUser.updateOne({
            $pull: { followers: req.body.userId },
          });
          await currentUser.updateOne({
            $pull: { followings: req.params.id },
          });
          res.json("User has been unfollowed");
        } else {
          res.json("You already unfollow");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.json("You can unfollow yourself");
    }
  } catch (error) {
    next(error);
  }
};

const getFriend = async (req, res) => {
  try {
    const user = await authSchema.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return authSchema.findById(friendId);
      })
    );

    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push(_id, username, profilePicture);
    });

    res.json({
      _id: friendList[0],
      username: friendList[1],
      profilePicture: friendList[2],
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userUpdate,
  userDelete,
  getOneUser,
  updateFollow,
  updateUnfollow,
  getFriend,
};
