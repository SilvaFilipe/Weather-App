const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

//Initialize app
const app = express();

//Connect database
connectDB();

//Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => res.send("API running"));

//Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/places", require("./routes/api/places"));
app.use("/api/searches", require("./routes/api/searches"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

//Socket.io
var socketio = require("socket.io").listen(server);
socketio.on("connection", (socket) => {
  socket.emit("connectionEstablished");
});

module.exports = socketio;
