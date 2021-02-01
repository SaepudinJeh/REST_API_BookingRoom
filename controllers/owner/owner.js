const Cloudinary = require("cloudinary");
const createError = require("http-errors");

const { Owner } = require("../../models");

// Get Owner
const getOwner = async (req, res, next) => {
  try {
    const ownerId = req.params.ownerId;
    const owner = await Owner.findById(ownerId);
    res.json(owner);
  } catch (error) {
    next(error);
  }
};

// Update Owner
const updateOwner = async (req, res, next) => {
  try {
    const ownerId = req.params.ownerId;

    const owner = await Owner.findById(ownerId);

    // Check Id by Owner
    if (!owner) {
      return next(createError.InternalServerError());
    } else {
      const costumerUpdate = await Owner.findByIdAndUpdate(ownerId, req.body, {
        new: true,
        useFindAndModify: false,
      });

      res.json(costumerUpdate);
    }
  } catch (error) {
    next(error);
  }
};

// Upload Image Owner
const uploadImage = async (req, res, next) => {
  try {
    const ownerId = req.params.ownerId;
    const owner = await Owner.findById(ownerId);

    // Check Id by Owner
    if (!owner) {
      return next(createError.InternalServerError());
    }

    const data = {
      avatar: req.file.path,
      avatarId: req.file.filename,
    };

    await Owner.findByIdAndUpdate(ownerId, data, {
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

const deleteImage = async (req, res, next) => {
  try {
    const ownerId = req.params.ownerId;
    const owner = await Owner.findById(ownerId);

    // Check Id by Owner
    if (!owner) {
      return next(createError.InternalServerError());
    }

    // Delete image Clodinary
    await Cloudinary.uploader.destroy(owner.avatarId);

    const data = {
      avatar: null,
      avatarId: null,
    };

    await Owner.findByIdAndUpdate(ownerId, data, {
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
  getOwner,
  updateOwner,
  uploadImage,
  deleteImage,
};
