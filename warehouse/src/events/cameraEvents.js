const Consumer = require("./messages/Consumer");
const cameraSchema = require("./messages/schemas/cameraSchema");
const cameraService = require("../services/camera");
const log = require("npmlog");

const CONSUMER_TOPIC = "CameraData";

//Save message to database
const processMessage = async (msg) => {
  log.info("CameraData read", msg);

  const cameraId = await cameraService.save(msg.pc);
  log.info("Camera saved as: ", cameraId);
};

exports.subscribe = async () => {
  //Subscribe to message broker
  consumer = new Consumer(CONSUMER_TOPIC, cameraSchema);
  log.info("CameraPC", "Connecting...");
  await consumer.connect();
  log.info("CameraPC", "Connected");
  consumer.subscribe(processMessage);
};
