const { Comments } = require("../models");

// create commment by Post 
const createCommentController = async (req, res) => {
  try {
    const comment = req.body;

    const username = req.user.username;
    comment.username = username;

    const newComment = await Comments.create(comment);

    if (comment) {
      res.status(200).json({
        message: "Comment Created successfully!",
        comment: newComment,
      });
    } else {
      res.status(404).json({
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

// Get commment by Post Id

const getCommentPIdController = async (req, res) => {
  try {
    const postId = req.params.postId;

    const getComment = await Comments.findAll({ where: { postId: postId } });
    if (getComment) {
      res.status(200).json({
        message: "get Comment successfully!",
        comment: getComment,
      });
    } else {
      res.status(404).json({
        message: "Comments not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

// delete single comment 
const deleteCommentController = async(req,res)=>{
  const commentId = req.params.commentId;
  try {
const deleteComment = await Comments.destroy({where:{id:commentId}});
if(deleteComment){
  res.status(200).json({
    message:"Delete comment successfully!"
  });
}else{
  res.status(404).json({
    message:"Comments not found!"
  });
}

    
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
}

module.exports = { createCommentController, getCommentPIdController,deleteCommentController };
