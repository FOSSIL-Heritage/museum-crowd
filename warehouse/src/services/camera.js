const cameraRepository = require('../repository/camera')

module.exports.getAll = async () => {
  try {
    const cameras = await cameraRepository.findAll();
    return cameras;
  } catch (e) {
    throw e;
  }
};

module.exports.save = async (camera) => {
  try {
    const id = await cameraRepository.save(camera);
    return id;
  } catch (e) {
    throw e;
  }
};
