const passport = require("passport");
const { isAuth, isAdmin, isCostumer, isOwner } = require("./ensureAuthenticated");
const avatarCostumer = require("../configurations/upload-avatar-costumer");
const avatarOwner = require("../configurations/upload-avatar-owner");
const uploadImageRoom = require('../configurations/upload-image-rooms.js')

module.exports = {
  middlewares: require("./middlewares"),
  sessions: require("./sessions"),
  authPassport: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    require("../configurations/passport-auth");
  },
  isAuth,
  isAdmin,
  isOwner,
  isCostumer,
  avatarCostumer,
  avatarOwner,
  uploadImageRoom
};
