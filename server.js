const express = require("express");
const { request } = require("http");
const { Socket } = require("socket.io");

const app = express();

const httpServer = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Set public folder path here
app.use(express.static(__dirname + "/public"));

// Route sends index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket.io
const io = require("socket.io")(httpServer);
io.on("connection", (socket) => {
  console.log("Socket.io connected....");

  // Listen the msg from Client
  socket.on("message", (msg) => {
    // Now broadcast the msg to everyone in chat
    socket.broadcast.emit("message", msg);
  });
});
