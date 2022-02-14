require("dotenv").config();
const express = require("express");
const monitoring = require("./services/monitoring");
const eureka = require("./eureka");

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

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);

  //Register
  const serviceName = process.env.SERVICE_NAME || "monitoring";
  eureka.registerWithEureka(serviceName, port);
});
