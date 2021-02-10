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
        createError.Unauthorized("You are not Admin!")
      );
    }
  },
  isCostumer: (req, res, next) => {
    const checkCostumer = req.user.userType;

    if (checkCostumer === roles.costumer) {
      next()
    } else {
      return next(
        createError.Unauthorized("You are not Costumer!")
      )
    }
  },
  isOwner: (req, res, next) => {
    const checkOwner = req.user.userType;

    if (checkOwner === roles.owner) {
      next();
    } else {
      return next(
        createError.Unauthorized("You are not Owner!")
      )
    }
  }
};
