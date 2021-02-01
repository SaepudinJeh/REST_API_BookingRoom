const { costumerLogin, costumerRegister, logout } = require("./costumer.auth");
const { ownerLogin, ownerRegister } = require("./owner.auth");

module.exports = {
  costumerLogin,
  costumerRegister,
  ownerLogin,
  ownerRegister,
  logout,
};
