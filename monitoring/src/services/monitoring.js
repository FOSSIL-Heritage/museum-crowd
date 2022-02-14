const axios = require("axios");

const WAREHOUSE_SERVICE_URI = process.env.WAREHOUSE_SERVICE_URI;

module.exports.getLiveCrowding = async () => {
  try {
    const data = await axios.get(WAREHOUSE_SERVICE_URI);
    return calculateCrowding(data);
  } catch (e) {
    throw e;
  }
};

module.exports.getLiveCrowdingByAreas = async (areas) => {
  try {
    //const data = await axios.get(WAREHOUSE_SERVICE_URI);
    //return calculateCrowding(data)
    return randomCrowding();
  } catch (e) {
    throw e;
  }
};

function calculateCrowding(data) {
  // ML Algorithm - START
  return Math.floor(Math.random() * 10) + 1;
  // ML Algorithm - END
}

const randomCrowding = () => {
  return [
    {
      area: {
        id: "001",
        name: "Area 1",
      },
      crowd: parseInt(Math.random() * 10 + 100),
    },
    {
      area: {
        id: "002",
        name: "Area 2",
      },
      crowd: parseInt(Math.random() * 10 + 100),
    },
    {
      area: {
        id: "003",
        name: "Area 3",
      },
      crowd: parseInt(Math.random() * 10 + 10),
    },
    {
      area: {
        id: "004",
        name: "Area 4",
      },
      crowd: parseInt(Math.random() * 10 + 70),
    },
    {
      area: {
        id: "005",
        name: "Area 5",
      },
      crowd: parseInt(Math.random() * 10 + 50),
    },
    {
      area: {
        id: "006",
        name: "Area 6",
      },
      crowd: parseInt(Math.random() * 10 + 30),
    },
  ];
};
