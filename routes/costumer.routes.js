const router = require("express").Router();

const { avatarCostumer, isCostumer, isAuth } = require("../middlewares");
const { Costumer } = require("../controllers");

router
  .get("/:costumerId", isAuth, isCostumer, Costumer.getCostumer)
  .put("/:costumerId", isAuth, isCostumer, Costumer.updateCostumer)
  .post(
    "/upload-image/:costumerId",
    avatarCostumer.single("avatar"), isAuth, isCostumer,
    Costumer.uploadImage
  )
  .delete("/delete-image/:costumerId", isAuth, isCostumer, Costumer.deleteImage);

module.exports = router;
