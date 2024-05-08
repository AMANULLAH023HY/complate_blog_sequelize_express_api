const express = require("express");
const { createCommentController, getCommentPIdController } = require("../controller/commentController");

const {validationToken} = require("../middleware/auth")

const router = express.Router();


router.post('/createComment',validationToken, createCommentController);
router.get('/getComment/:postId',validationToken, getCommentPIdController);


module.exports = router;