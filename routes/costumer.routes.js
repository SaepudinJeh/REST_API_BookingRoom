const router = require("express").Router();

const { avatarCostumer } = require("../middlewares");
const { Costumer } = require("../controllers");

router
  .get("/:costumerId", Costumer.getCostumer)
  .put("/:costumerId", Costumer.updateCostumer)
  .post(
    "/upload-image/:costumerId",
    avatarCostumer.single("avatar"),
    Costumer.uploadImage
  )
  .delete("/delete-image/:costumerId", Costumer.deleteImage);

module.exports = router;
