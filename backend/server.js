require("dotenv").config();

const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const userRoute = require("./routes/User.js");
app.use("/user", userRoute);

const tokenRoute = require("./routes/Token.js");
app.use("/token", tokenRoute);

app.listen(3000, () => {
  console.log(" " + process.env.MONGO_DB_SRV);
});