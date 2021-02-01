const cloudinary = require("cloudinary");
const createError = require("http-errors");

const { Costumer } = require("../../models");

const getCreators = async (req, res, next) => {
  try {
    const pageNum = parseInt(req.params.page);

    if (isNaN(pageNum)) {
      return res.status(400).send("Bad Request");
    }

    const creatorsPage = (pageNum - 1) * 10;
    const creators = await Costumer.find({ userType: "CREATOR" })
      .skip(creatorsPage)
      .limit(10);
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
