require("dotenv").config();

const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const { Server } = require("socket.io");
const { createServer } = require("http");

app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
    console.log(socket.id)

    let currentRoom = null;

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.io)
    })

    socket.on("joinRoom", (roomID) => {
      if (currentRoom) {
        socket.leave(currentRoom);
        console.log(`User ${socket.id} left room ${currentRoom}`);
      }

      console.log("join room", roomID)
      currentRoom = roomID
      socket.join(roomID)
    })
    
    socket.on("send_message", (message) => {
      console.log("send_message", message)
      socket.to(message.room).emit("receive_message", message)
    })
})

const userRoute = require("./routes/User.js");
app.use("/user", userRoute);

const tokenRoute = require("./routes/Token.js");
app.use("/token", tokenRoute);

const chatRoute = require("./routes/Chat.js");
app.use("/chat", chatRoute);

httpServer.listen(3000, () => {
  console.log("Listening at port 3000");
});