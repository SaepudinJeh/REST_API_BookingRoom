const router = require("express").Router();

const { Owner } = require("../controllers");
const { avatarOwner } = require("../middlewares");

router
  .get("/:ownerId", Owner.getOwner)
  .put("/:ownerId", Owner.updateOwner)
  .post(
    "/upload-image/:ownerId",
    avatarOwner.single("avatar"),
    Owner.uploadImage
  )
  .delete("/delete-image/:ownerId", Owner.deleteImage);

module.exports = router;
