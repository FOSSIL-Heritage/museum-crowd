require("dotenv").config();
const express = require("express");
const mongoClient = require("./repository/database");
const controller = require("./controller");
const PCEvents = require("./events/pcEvents");
const CameraEvents = require("./events/cameraEvents");
const eureka = require("./eureka");

//Express
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", controller.welcome);
app.get("/cameras", controller.getCameras);
app.get("/pcs", controller.getPcs);

// perform a database connection when the server starts
mongoClient.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(port, async () => {
    console.log(`Server is running on port: ${port}`);

    //Register
    const serviceName = process.env.SERVICE_NAME || "crowd-warehouse";
    eureka.registerWithEureka(serviceName, port);

    await PCEvents.subscribe();
    await CameraEvents.subscribe();
  });
});
