const passport = require("passport");
const { isAuth, isAdmin } = require("./ensureAuthenticated");
const avatarCostumer = require("../configurations/upload-avatar-costumer");
const avatarOwner = require("../configurations/upload-avatar-owner");

module.exports = {
  middlewares: require("./middlewares"),
  sessions: require("./sessions"),
  authPassport: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    require("../configurations/passport-auth");
  },
  isAuth,
  avatarCostumer,
  isAdmin,
  avatarOwner,
};
