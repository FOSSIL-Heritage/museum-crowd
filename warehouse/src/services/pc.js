const pcRepository = require('../repository/pc')

module.exports.getAll = async () => {
  try {
    const pcs = await pcRepository.findAll();
    return pcs;
  } catch (e) {
    throw e;
  }
};

module.exports.save = async (pc) => {
  try {
    const id = await pcRepository.save(pc);
    return id;
  } catch (e) {
    throw e;
  }
};