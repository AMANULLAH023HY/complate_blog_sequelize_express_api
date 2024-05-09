const express = require("express");
const {
  signupController,
  loginController,
  authController,
  logoutController,
  usernameController,

  changePasswordController,
} = require("../controller/userController");
const { validationToken } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/auth", validationToken, authController);
router.get("/username/:id", validationToken, usernameController);
router.put("/changePassword", validationToken, changePasswordController);
router.get("/logout", validationToken, logoutController);

module.exports = router;
