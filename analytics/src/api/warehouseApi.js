const axios = require("axios");

const WAREHOUSE_SERVICE_URI = process.env.WAREHOUSE_SERVICE_URI;

module.exports.getCameras = async () => {
  try {
    const data = await axios.get(WAREHOUSE_SERVICE_URI + "/cameras");
    return data.data;
  } catch (e) {
    throw e;
  }
};

module.exports.getPcs = async () => {
  try {
    const data = await axios.get(WAREHOUSE_SERVICE_URI + "/pcs");
    return data.data;
  } catch (e) {
    throw e;
  }
};
