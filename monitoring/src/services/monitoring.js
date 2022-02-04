const axios = require("axios");

const WAREHOUSE_SERVICE_URI = process.env.WAREHOUSE_SERVICE_URI;

module.exports.getLiveCrowding = async () => {
  try {
    const data = await axios.get(WAREHOUSE_SERVICE_URI);
    return calculateCrowding(data)
  } catch (e) {
    throw e;
  }
};

function calculateCrowding(data){
  // ML Algorithm - START
  return Math.floor(Math.random() * 10) + 1;
  // ML Algorithm - END
}