require("dotenv").config();
const express = require("express");
const analytics = require("./services/analytics");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome To Crowd Analytics");
});

app.get("/predicted-visitors", async (req, res) => {
  try {
    const date = req.query.data || new Date().toISOString()
    const pV = await analytics.getPredictedVisitors(date)
    res.send({pV, date});
  } catch (e) {
    e.status ? res.status(e.status).send(e.message) : res.status(500).send();
  }
});

app.get("/history-visitors", async (req, res) => {
  try {
    const date = req.query.data || new Date().toISOString()
    const history = await analytics.getHistoryVisitors(date)
    res.send({history,date});
  } catch (e) {
    e.status ? res.sendStatus(e.status).send(e.message) : res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
