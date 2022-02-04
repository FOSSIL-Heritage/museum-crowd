const cameraService = require("./services/camera");

exports.welcome = (req, res) => {
  res.send("Welcome To Crowd Warehouse");
};

exports.getCameras = async (req, res) => {
  try {
    const cameras = await cameraService.getAll();
    res.send(cameras);
  } catch (e) {
    e.status ? res.status(e.status).send(e.message) : res.status(500).send();
  }
};

exports.getPcs = async (req, res) => {
  try {
    const pcs = await cameraService.getAll();
    res.send(pcs);
  } catch (e) {
    e.status ? res.status(e.status).send(e.message) : res.status(500).send();
  }
};
