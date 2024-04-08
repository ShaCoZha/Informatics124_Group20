require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());


const userRoute = require("./backend/routes/User.js");
app.use("/user", userRoute);

const tokenRoute = require("./backend/routes/Token.js");
app.use("/token", tokenRoute);

app.listen(3000, () => {
  console.log(" " + process.env.MONGO_DB_SRV);
});