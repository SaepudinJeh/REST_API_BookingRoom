const cloudinary = require("cloudinary");
const createError = require("http-errors");

const { Owner } = require("../../models");

const getOwners = async (req, res, next) => {
  try {

    const owners = await Owner.find({ userType: "OWNER" });

    res.json({ owners });
    
  } catch (error) {
    next(error);
  }
};

const deleteOwner = async (req, res, next) => {
  const owner = await Owner.findById(req.params.ownerId);

  // Check owner
  if (!owner) {
    return next(createError.InternalServerError());
  }

  if (owner.avatarId === null) {
    await owner.remove();
  } else {
    await cloudinary.uploader.destroy(owner.avatarId);
    await owner.remove();
  }
  res.json({ message: "Delete Owner successfully" });
};

module.exports = { getOwners, deleteOwner };
