const express = require('express');
const {  createPostController, getPostController, getSinglePostController } = require('../controller/postContrller');

const router = express.Router();

router.post("/createPost", createPostController);
router.get("/getPost", getPostController);
router.get("/getSinglePost/:id", getSinglePostController);



module.exports = router;