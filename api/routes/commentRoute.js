const express = require("express");
const { createCommentController, getCommentPIdController } = require("../controller/commentController");

const router = express.Router();


router.post('/createComment', createCommentController);
router.get('/getComment/:postId', getCommentPIdController);


module.exports = router;