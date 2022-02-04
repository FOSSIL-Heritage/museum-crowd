const client = require("./database");
const ObjectId = require("mongodb").ObjectId;

const COLLECTION_NAME = "cameras";


// Find All Cameras
async function findAll() {
  try{
    return await client.getDb().collection(COLLECTION_NAME).find().toArray();
  }catch(e){
    throw new Error('DB ERROR - Find All Cameras')
  }
}

// Find User by Id
async function findById(userId) {
  return await client
    .getDb()
    .collection(COLLECTION_NAME)
    .findOne(
      { _id: new ObjectId(userId) },
      {
        projection: { email: 1, _id: 0 },
      }
    );
}

//Save User
async function save(camera) {

  const res = await client
    .getDb()
    .collection(COLLECTION_NAME)
    .insertOne(camera);

  return res.insertedId.toString();
}



module.exports = {
  findAll,
  save,
  findById,
};