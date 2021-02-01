const cloudinary = require("cloudinary");
const createError = require("http-errors");

const { Owner } = require("../../models");

const getOwners = async (req, res, next) => {
  try {
    const pageNum = parseInt(req.params.page);

    if (isNaN(pageNum)) {
      return res.status(400).send("Bad Request");
    }

    const ownersPage = (pageNum - 1) * 10;

    const owners = await Owner.find({ userType: "OWNER" })
      .skip(ownersPage)
      .limit(10);
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
