const Costumer = require("./Costumer.models");
const Owner = require("./Owner.model");
const { UserFbSchema, UserGoogleSchema } = require("./Oauth.models");

module.exports = {
  Costumer,
  Owner,
  UserFbSchema,
  UserGoogleSchema,
};
