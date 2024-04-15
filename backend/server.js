require("dotenv").config();

const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const userRoute = require("./routes/User.js");
app.use("/user", userRoute);

const tokenRoute = require("./routes/Token.js");
app.use("/token", tokenRoute);

app.listen(3000, () => {
  console.log(" " + process.env.MONGO_DB_SRV);
});