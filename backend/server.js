require("dotenv").config();

const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
app.use(cors(
  {
    origin: 'http://127.0.0.1:5501',
    origin: 'http://localhost:5501',
    credentials: true
  }
));
app.use(express.json());
app.use(cookieParser());

const userRoute = require("./routes/User.js");
app.use("/user", userRoute);

const tokenRoute = require("./routes/Token.js");
app.use("/token", tokenRoute);

app.listen(3000, () => {
  console.log("Listening at port 3000");
});