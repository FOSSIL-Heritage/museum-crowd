const Consumer = require("./messages/Consumer");
const pcSchema = require("./messages/schemas/pcSchema");
const pcService = require("../services/pc");
const log = require("npmlog");

const CONSUMER_TOPIC = "PCData";

//Save message to database
const processMessage = async (msg) => {
  log.info("PCData read", msg);

  try {
    const pcId = await pcService.save(msg);
    log.info("PC saved as: " + pcId);
  } catch (e) {
    log.error("PCData", "PC not saved!",e);
  }
};

exports.subscribe = async () => {
  //Subscribe to message broker
  consumer = new Consumer(CONSUMER_TOPIC, pcSchema);
  log.info("RawPC", "Connecting...");
  await consumer.connect();
  log.info("RawPC", "Connected");
  consumer.subscribe(processMessage);
};
