const pcRepository = require('../repository/pc')

module.exports.getAll = async () => {
    const pcs = await pcRepository.findAll();
    return pcs;
};

module.exports.save = async (pc) => {
    const id = await pcRepository.save(pc);
    return id;
};