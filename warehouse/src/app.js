require("dotenv").config();
const express = require("express");
const { createConsumer, subscribe } = require("./messages/consumer");
const mongoClient = require("./repository/database");
const cameraService = require("./services/camera");
const pcService = require("./services/pc");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome To Crowd Warehouse");
});

app.get("/cameras", async (req, res) => {
  try {
    const cameras = await cameraService.getAll();
    res.send(cameras);
  } catch (e) {
    e.status ? res.status(e.status).send(e.message) : res.status(500).send();
  }
});

app.get("/pcs", async (req, res) => {
  try {
    const pcs = await cameraService.getAll();
    res.send(pcs);
  } catch (e) {
    e.status ? res.status(e.status).send(e.message) : res.status(500).send();
  }
});

async function saveMessages() {

    const consumer = await createConsumer();

    subscribe(consumer, async (msg) => {
      const messageId = await cameraService.save(msg.camera);
      console.log("Camera saved as: "+messageId)

      const pcId = await pcService.save(msg.pc);
      console.log("PC saved as: "+pcId)
    });
}

// perform a database connection when the server starts
mongoClient.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  // saveMessages();
  });
});

