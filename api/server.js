const app =require("./app.js");
const db = require('./models')


const PORT = process.env.PORT || 5000;


db.sequelize.sync().then(()=>{
    app.listen(PORT, async () => {
        console.log(`App is running at http:localhost:${PORT} `);
      });
})

