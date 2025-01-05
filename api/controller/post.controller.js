const authSchema = require("../schema/auth.schema");
const postSchema = require("../schema/post.schema");

const addPost = async (req, res, next) => {
  try {
    const newPost = new postSchema(req.body);
    const savedPost = await newPost.save();

    res.json(savedPost);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const foundedPost = await postSchema.findById(req.params.id);
    if (foundedPost.userId === req.body.userId) {
      await foundedPost.updateOne({ $set: req.body });
      res.json("Successfully updated");
    } else {
      return res.json("You can update only your post");
    }
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const foundedPost = await postSchema.findById(req.params.id);
    if (foundedPost.userId === req.body.userId) {
      await foundedPost.deleteOne();
      res.json("Successfully deleted");
    } else {
      return res.json("You can update only your post");
    }
  } catch (error) {
    next(error);
  }
};

const putLike = async (req, res, next) => {
  try {
    const foundedPost = await postSchema.findById(req.params.id);

    if (!foundedPost.likes.includes(req.body.userId)) {
      await foundedPost.updateOne({ $push: { likes: req.body.userId } });

      res.json("Successfully liked");
    } else {
      await foundedPost.updateOne({ $pull: { likes: req.body.userId } });
      res.json("Post has been disliked");
    }
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const foundedPost = await postSchema.findById(req.params.id);
    if (!foundedPost) {
      return res.json("This post not found");
    }

    res.json(foundedPost);
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const currentUser = await authSchema.findById(req.params.userId);
    const userPosts = await postSchema.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUsername = async (req, res, next) => {
  try {
    const user = await authSchema.findOne({ username: req.params.username });
    const posts = await postSchema.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addPost,
  updatePost,
  deletePost,
  putLike,
  getPost,
  getPosts,
  getUsername,
};
