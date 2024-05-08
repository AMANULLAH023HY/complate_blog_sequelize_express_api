const { Posts, Likes } = require("../models");

// Posts created controller
const createPostController = async (req, res) => {
  try {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id

    // create new Post
    const newPost = await Posts.create(post);
    if (newPost) {
      res.status(201).json({
        message: "Post created successfully!",
        post: newPost,
      });
    } else {
      res.status(404).json({
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get All posts
const getPostController = async (req, res) => {
  try {
    const getPost = await Posts.findAll({include: [Likes]});
    const getLikePost = await Posts.findAll({where:{UserId:req.user.id}});


    if (getPost || getLikePost) {
      res.status(201).json({
        message: "Get Post successfully!",
        allPost: getPost,
        likePost: getLikePost
      });
    } else {
      res.status(404).json({
        message: "Post not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get single posts by ID

const getSinglePostController = async (req, res) => {
  try {
    const id = req.params.id;
    const getPost = await Posts.findByPk(id);

    if (getPost) {
      res.status(200).json({
        message: "Get Post successfully!",
        post: getPost,
      });
    } else {
      res.status(404).json({
        message: "Post not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Get single posts by User ID

const getSinglePostByUserIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const getPost = await Posts.findAll({where:{UserId:id}});

    if (getPost) {
      res.status(200).json({
        message: "Get Post successfully!",
        post: getPost,
      });
    } else {
      res.status(404).json({
        message: "Post not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Delete Post by id

const deletePostController = async (req, res) => {
  const postId = req.params.postId;
  try {
    const deletePost = await Posts.destroy({ where: { id: postId } });

    if (deletePost) {
      res.status(204).json({
       message:"Post deleted successfully"
      });
    } else {
      res.status(404).json({
        message: "Post not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createPostController,
  getPostController,
  getSinglePostController,
  deletePostController,
  getSinglePostByUserIdController
};
