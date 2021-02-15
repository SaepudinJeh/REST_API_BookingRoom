const router = require("express").Router();

const { Owner } = require("../controllers");
const { avatarOwner } = require("../middlewares");
const { isAuth, isOwner } = require('../middlewares/')

router
  .get("/:ownerId", isAuth, isOwner, Owner.getOwner)
  .put("/:ownerId", isAuth, isOwner, Owner.updateOwner)
  .post(
    "/upload-image/:ownerId",  isAuth, isOwner,
    avatarOwner.single("avatar"),
    Owner.uploadImage
  )
  .delete("/delete-image/:ownerId", isAuth, isOwner, Owner.deleteImage);

module.exports = router;
