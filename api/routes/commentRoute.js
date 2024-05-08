const express = require("express");
const {
  createCommentController,
  getCommentPIdController,
  deleteCommentController,
} = require("../controller/commentController");

const { validationToken } = require("../middleware/auth");

const router = express.Router();

router.post("/createComment", validationToken, createCommentController);
router.get("/getComment/:postId", validationToken, getCommentPIdController);
router.delete(
  "/deleteComment/:commentId",
  validationToken,
  deleteCommentController
);

module.exports = router;
