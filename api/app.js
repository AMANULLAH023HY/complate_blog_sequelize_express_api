const express =require(  "express");
const dotenv =require ("dotenv");
const bodyParser =require("body-parser");
const usersRoute = require('./routes/userRoute')
const postsRoute = require('./routes/postsRoute')
const commentsRoute = require('./routes/commentRoute')


// const cors = require('cors')
dotenv.config();

const app = express();
// Middleware 
app.use(express.json());
app.use(bodyParser.json());

// ROUTES

app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/comments', commentsRoute);





app.all("*", (req, res) => {
  res.status(404).send("OOPS! 404 page not found");
});

module.exports =  app;