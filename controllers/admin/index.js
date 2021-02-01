const { getCostumers, deleteCostumer } = require("./costumer");
const { getCreators, deleteCreator } = require("./creator");
const { getOwners, deleteOwner } = require("./owner");

module.exports = {
  getCostumers,
  getCreators,
  getOwners,
  deleteCostumer,
  deleteCreator,
  deleteOwner,
};
