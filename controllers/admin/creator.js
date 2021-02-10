const cloudinary = require("cloudinary");
const createError = require("http-errors");

const { Costumer } = require("../../models");

const getCreators = async (req, res, next) => {
  try {

    const creators = await Costumer.find({ userType: "CREATOR" });

    res.json({ creators });
    
  } catch (error) {
    next(error);
  }
};

const deleteCreator = async (req, res, next) => {
  try {
    const creator = await Costumer.findById(req.params.creatorId);

    // Check creator
    if (!creator) {
      return next(createError.InternalServerError());
    }

    if (creator.avatarId === null) {
      await creator.remove();
    } else {
      await cloudinary.uploader.destroy(creator.avatarId);
      await creator.remove();
    }
    res.json({ message: "Delete Creator successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCreators, deleteCreator };
