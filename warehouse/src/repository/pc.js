const client = require("./database");
const ObjectId = require("mongodb").ObjectId;

const COLLECTION_NAME = "pcs";


// Find All PCs
async function findAll() {
  try{
    return await client.getDb().collection(COLLECTION_NAME).find().toArray();
  }catch(e){
    throw new Error('DB ERROR - Find All PCs')
  }
}

//Save PC
async function save(pc) {

  try{
  const res = await client
    .getDb()
    .collection(COLLECTION_NAME)
    .insertOne(pc);

  return res.insertedId.toString();
  }catch(e){
    throw new Error('DB ERROR - Save PC')
  }
}



module.exports = {
  findAll,
  save,
};