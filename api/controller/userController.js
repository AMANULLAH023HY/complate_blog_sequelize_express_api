const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { get } = require("../routes/userRoute");

// User Registration
const signupController = async (req, res) => {
  try {
    const { username, password } = req.body;

    bcrypt.hash(password, 10).then(async (hash) => {
      const newUser = await Users.create({
        username: username,
        password: hash,
      });

      if (newUser) {
        res.status(200).json({
          message: "User created successfully!",
          user: newUser,
        });
      } else {
        res.status(404).json({
          message: "Something went wrong",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

// User Login
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });
    if (user) {
      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          const accessToken = jwt.sign(
            { username: user.username, id: user.id },
            process.env.JWT_SECRET
          );
          res.status(200).json({
            message: "user Login successfully!",
            id: user.id,
            username: username,
            token: accessToken,
          });
        } else {
          res.status(401).json({
            message: "Wrong username or password combination!",
          });
        }
      });
    } else {
      res.status(401).json({
        message: "User doesn't Exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

// User login get infomation
const authController = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

// Get username by primary key

const usernameController = async (req, res) => {
  const id = req.params.id;

  try {
    const getUser = await Users.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (getUser) {
      res.status(200).json({
        message: "Get username",
        user: getUser,
      });
    } else {
      res.status(404).json({
        message: "Username doesn't exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Chnage password controller

const changePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({where:{ username: req.user.username }});
    
      bcrypt.compare(oldPassword, user.password).then((match) => {
        if(!match){
          res.status(401).json({
            message:"Password doesn't match!"
          })
        }
        bcrypt.hash(newPassword,10).then(async(hash)=>{
          await Users.update({password:hash},{where:{ username: req.user.username }});
          res.status(200).json({
            message:"Passowrd change successfully!",  
          })
        })
      })
   
        
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};





// logout user controller

const logoutController = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

module.exports = {
  signupController,
  loginController,
  authController,
  logoutController,
  usernameController,
  changePasswordController,
};
