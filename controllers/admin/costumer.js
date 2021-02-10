const cloudinary = require("cloudinary");
const createError = require("http-errors");

const { Costumer } = require("../../models");

const getCostumers = async (req, res, next) => {
  try {

    const costumers = await Costumer.find({ userType: "COSTUMER" });
    
    res.json({costumers});
  } catch (error) {
    next(error);
  }
};

const deleteCostumer = async (req, res, next) => {
  try {
    const costumer = await Costumer.findById(req.params.costumerId);

    // Check Costumer
    if (!costumer) {
      return next(createError.InternalServerError());
    }

    if (costumer.avatarId === null) {
      await costumer.remove();
    } else {
      await cloudinary.uploader.destroy(costumer.avatarId);
      await costumer.remove();
    }

    res.json({ message: "Delete Costumer successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCostumers, deleteCostumer };
