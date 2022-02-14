require("dotenv").config();
const express = require("express");
const monitoring = require("./services/monitoring");
const eureka = require("./eureka");
const http = require("http");

// Express
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome To Crowd Analytics" + port);
});

app.get("/crowding", async (req, res) => {
  try {
    const area = req.query.area || "all";
    const date = req.query.area || "now";
    const crowd = await monitoring.getLiveCrowding(area);
    res.send({ crowd, area, date });
  } catch (e) {
    e.status ? res.status(e.status).send(e.message) : res.status(500).send();
  }
});

// Socket
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let interval = null;

const live = async (socketId) =>{
  const crowd = await monitoring.getLiveCrowdingByAreas();
  io.to(socketId).emit("liveCrowding", crowd);
}

io.on("connection", (socket) => {
  socket.on("liveCrowding", async (msg) => {

    await live(socket.id)
    interval = setInterval(()=>live(socket.id), 3000);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);

  //Register
  const serviceName = process.env.SERVICE_NAME || "crowd-monitoring";
  eureka.registerWithEureka(serviceName, port);
});
