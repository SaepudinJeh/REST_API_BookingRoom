const Cloudinary = require("cloudinary");
const createError = require("http-errors");

const { Costumer } = require("../../models");

// GET User
const getCostumer = async (req, res, next) => {
  try {
    const costumerId = req.params.costumerId;

    const costumer = await Costumer.findById(costumerId, {
      fullName: 1, 
      avatar: 1,
      gender: 1,
      avatar: 1,
      emailVertification: 1,
      userType: 1,
      email: 1, 
    })

    //Check Id by Costumer
    if (!costumer) {
      return next(createError.BadRequest());
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

    // Data from req.body
    const data = {
      gender: req.body.gender || costumer.gender,
      phoneNumber: req.body.phoneNumber || costumer.phoneNumber,
      fullName: req.body.fullName || costumer.fullName,
    }

    // Check Id by Costumer
    if (!costumer) {
      return next(createError.BadRequest());
    } else {
      const costumerUpdate = await Costumer.findByIdAndUpdate(
        costumer,
        data,
        {
          new: true,
        }
      );
      res.json({
        message: "Update Costumer successfully"
      });
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
      return next(createError.BadRequest());
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
      return next(createError.BadRequest());
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
