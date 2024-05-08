const { Likes } = require("../models");

const createLikeController = async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;
  try {
    const found = await Likes.findOne({
      where: { PostId: PostId, UserId: UserId },
    });

    if (!found) {
      const newLike = await Likes.create({ PostId: PostId, UserId: UserId });
      // Like this post
      if (newLike) {
        res.status(200).json({
          message: "Like this post successfully!",
          like: newLike,
        });
      } else {
        res.status(404).json({
          message: "Doesn't like this post!",
        });
      }
    } else {
      // UnLike this post

      const UnLike = await Likes.destroy({
        where: { PostId: PostId, UserId: UserId },
      });

      if (UnLike) {
        res.status(200).json({
          message: "Unlike the post!",
        });
      } else {
        res.status(404).json({
          message: "Dont't Unlike this post!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

module.exports = { createLikeController };
