const createError = require("http-errors");
const { roles } = require("../configurations/role");

module.exports = {
  isAuth: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next(createError.Unauthorized());
    }
    next();
  },
  isAdmin: (req, res, next) => {
    const checkAdmin = req.user.userType;

    if (checkAdmin === roles.admin) {
      next();
    } else {
      return next(
        createError.Unauthorized("You are not authorized to see this route")
      );
    }
  },
};
