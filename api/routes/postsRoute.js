const express = require('express');
const {  createPostController, getPostController, getSinglePostController, deletePostController } = require('../controller/postContrller');
const {validationToken} = require("../middleware/auth")

const router = express.Router();

router.post("/createPost",validationToken, createPostController);
router.get("/getPost", validationToken, getPostController);
router.get("/getSinglePost/:id",validationToken, getSinglePostController);
router.delete("/deletePost/:postId",validationToken, deletePostController);



module.exports = router;