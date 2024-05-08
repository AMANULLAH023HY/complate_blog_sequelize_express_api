const express = require('express');
const { validationToken } = require('../middleware/auth');
const { createLikeController } = require('../controller/likeController');

const router = express.Router();


router.post('/createLike', validationToken, createLikeController)


module.exports = router;