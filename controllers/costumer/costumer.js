const Cloudinary = require("cloudinary");
const createError = require("http-errors");

const { Costumer } = require("../../models");

// GET User
const getCostumer = async (req, res, next) => {
  try {
    const costumerId = req.params.costumerId;
    const costumer = await Costumer.findById(costumerId);

    //Check Id by Costumer
    if (!costumer) {
      return next(createError.InternalServerError());
    }

    res.json(costumer);
  } catch (error) {
    next(error);
  }
};

// Update User
const updateCostumer = async (req, res, next) => {
  try {
    const costumerId = req.params.costumerId;
    const costumer = await Costumer.findById(costumerId);

    // Check Id by Costumer
    if (!costumer) {
      return next(createError.InternalServerError());
    } else {
      const costumerUpdate = await Costumer.findByIdAndUpdate(
        costumer,
        req.body,
        {
          new: true,
        }
      );
      res.json(costumerUpdate);
    }
  } catch (error) {
    next(error);
  }
};

//Upload Image
const uploadImage = async (req, res, next) => {
  try {
    const costumerId = req.params.costumerId;
    const costumer = await Costumer.findById(costumerId);

    // Check Id by Costumer
    if (!costumer) {
      return next(createError.InternalServerError());
    }

    const data = {
      avatar: req.file.path,
      avatarId: req.file.filename,
    };

    await Costumer.findByIdAndUpdate(costumerId, data, {
      new: true,
      useFindAndModify: false,
    });
    res.json({
      message: "Update avatar successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete Image
const deleteImage = async (req, res, next) => {
  try {
    const costumerId = req.params.costumerId;
    const costumer = await Costumer.findById(costumerId);

    // Check Id by Costumer
    if (!costumer) {
      return next(createError.InternalServerError());
    }

    // Delete image Cloudinary
    await Cloudinary.uploader.destroy(costumer.avatarId);

    const data = {
      avatar: null,
      avatarId: null,
    };

    // Update image
    await Costumer.findByIdAndUpdate(costumerId, data, {
      new: true,
      useFindAndModify: false,
    });

    res.json({
      message: "Avatar has been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCostumer,
  updateCostumer,
  uploadImage,
  deleteImage,
};
