const { Posts } = require("../models"); 

// Posts created controller
const createPostController = async (req, res) => {
  try {
    const post = req.body;

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
    console.error("Error creating post:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message, 
    });
  }
};

// Get All posts
const getPostController = async(req,res)=>{
    try {
        const getPost = await Posts.findAll({});
        

        if (getPost) {
            res.status(201).json({
              message: "Get Post successfully!",
              post: getPost,
            });
          } else {
            res.status(404).json({
              message: "Post not found!",
            });
          }
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
          message: "Internal server error",
          error: error.message, 
        }); 
    }


}


// Get single posts by ID

const getSinglePostController = async(req,res)=>{
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
        console.error("Error creating post:", error);
        res.status(500).json({
          message: "Internal server error",
          error: error.message, 
        }); 
    }


}

module.exports = { createPostController,getPostController,getSinglePostController };