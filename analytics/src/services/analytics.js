const warehouseApi = require('../api/warehouseApi')

module.exports.getPredictedVisitors = async () => {

  try {
    const data = await warehouseApi.getCameras()
    return calculatePredictedVisitors(data)
  } catch (e) {
    throw e;
  }
};

module.exports.getHistoryVisitors = async () => {
  try {
    const data = await warehouseApi.getPcs()
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