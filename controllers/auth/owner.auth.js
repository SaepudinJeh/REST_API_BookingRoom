const createError = require("http-errors");

const { Owner } = require("../../models");
const { ownerRegister } = require("../../validators");

const ownerLogin = async (req, res, next) => {
  res.json({
    message: "Owner login successfully"
  });
};

const ownerRegister = async (req, res, next) => {
  try {
    // Validation
    const validation = ownerRegister.validate(req.body);
    if (validation.error) {
      const err = new Error(validation.error.message);
      err.status = 400;
      return next(err);
    }

    // Check existence
    const { email } = req.body;

    const doesExist = await Owner.findOne({ email });

    if (doesExist) {
      next(createError.BadRequest("This email is already in use"));
      return;
    }

    const owner = new Owner(req.body);
    await owner.save();

    res.json({
      message: "Register owner successfully"
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  ownerLogin,
  ownerRegister,
};
