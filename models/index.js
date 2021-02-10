const Costumer = require("./Costumer.models");
const Owner = require("./Owner.model");
const { UserFbSchema, UserGoogleSchema } = require("./Oauth.models");
const Room = require('./Room.model.js');
const Comment = require("./Comment.models.js");
const Booking = require('./Booking.models.js')

module.exports = {
  Costumer,
  Owner,
  UserFbSchema,
  UserGoogleSchema,
  Room,
  Comment,
  Booking
};
