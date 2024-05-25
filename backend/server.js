require("dotenv").config();

const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const userRoute = require("./routes/User.js");
app.use("/user", userRoute);

const tokenRoute = require("./routes/Token.js");
app.use("/token", tokenRoute);

const chatRoute = require("./routes/Chat.js");
app.use("/chat", chatRoute);

app.listen(3000, () => {
  console.log("Listening at port 3000");
});