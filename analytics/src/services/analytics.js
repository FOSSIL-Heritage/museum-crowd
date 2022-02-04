const axios = require("axios");

const WAREHOUSE_SERVICE_URI = process.env.WAREHOUSE_SERVICE_URI;

module.exports.getPredictedVisitors = async () => {
  try {
    const data = await axios.get(WAREHOUSE_SERVICE_URI);
    return calculatePredictedVisitors(data)
  } catch (e) {
    throw e;
  }
};

module.exports.getHistoryVisitors = async () => {
  try {
    const data = await axios.get(WAREHOUSE_SERVICE_URI);
    return calculateHistoryVisitors(data)
  } catch (e) {

    throw e;
  }
};


function calculateHistoryVisitors(data){
  // ML Algorithm - START
  return Math.floor(Math.random() * 10) + 1;
  // ML Algorithm - END
}

function calculatePredictedVisitors(data){
  // ML Algorithm - START
  return Math.floor(Math.random() * 10) + 1;
  // ML Algorithm - END
}