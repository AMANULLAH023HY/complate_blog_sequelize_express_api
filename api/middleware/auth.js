const jwt = require("jsonwebtoken");

const validationToken = (req, res, next) => {
  const accessToken = req.header("authorization");

  try {
    if (!accessToken) {
      return res.status(401).json({
        message: "User not logged in!",
      });
    }

    const tokenParts = accessToken.split(" ");
    const token = tokenParts[1];

    const validToken = jwt.verify(token, process.env.JWT_SECRET);

    if (validToken) {
      return next();
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { validationToken };
