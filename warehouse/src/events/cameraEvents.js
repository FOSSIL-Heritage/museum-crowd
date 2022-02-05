const Consumer = require("./messages/Consumer");
const cameraSchema = require("./messages/schemas/cameraSchema");
const cameraService = require("../services/camera");
const log = require("npmlog");

const CONSUMER_TOPIC = "CameraData";

//Save message to database
const processMessage = async (msg) => {
  log.info("CameraData read", msg);

  try {
    const cameraId = await cameraService.save(msg);
    log.info("Camera saved as: ", cameraId);
  } catch (e) {
    log.error("CameraData", "Camera not saved!",e);
  }
};

exports.subscribe = async () => {
  //Subscribe to message broker
  consumer = new Consumer(CONSUMER_TOPIC, cameraSchema);
  log.info("CameraPC", "Connecting...");
  await consumer.connect();
  log.info("CameraPC", "Connected");
  consumer.subscribe(processMessage);
};
