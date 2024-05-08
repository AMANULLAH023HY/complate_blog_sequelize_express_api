const express = require('express');
const {  signupController, loginController, authController, logoutController, usernameController } = require('../controller/userController');
const { validationToken } = require('../middleware/auth');


const router = express.Router();


router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/auth',validationToken, authController);
router.get('/logout',validationToken, logoutController);
router.get('/username/:id',validationToken, usernameController);

module.exports = router;