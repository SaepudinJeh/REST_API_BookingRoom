const createError = require("http-errors");

const { Costumer } = require("../../models");
const { costumerValidator } = require("../../validators");

const costumerLogin = async (req, res, next) => {
  res.json({
    message: "Costumer login successfully"
  });
};

const costumerRegister = async (req, res, next) => {
  try {
    // Validation
    const validation = costumerValidator.validate(req.body);
    if (validation.error) {
      const err = new Error(validation.error.message);
      err.status = 400;
      return next(err);
    }

    // Check existence
    const { email } = req.body;

    const doesExist = await Costumer.findOne({ email });

    if (doesExist) {
      next(createError.BadRequest("This email is already in use"));
      return;
    }

    const costumer = new Costumer(req.body);
    await costumer.save();

    res.json({
      message: "Register costumer successfully!"
    });

  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  req.logOut();
  res.send("Success Logout");
};

module.exports = {
  costumerLogin,
  costumerRegister,
  logout,
};
