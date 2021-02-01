const router = require("express").Router();

const { isAuth, isAdmin } = require("../middlewares");
const { Admin } = require("../controllers");

router
  .get("/costumers/:page", isAuth, isAdmin, Admin.getCostumers)
  .get("/owners/:page", isAuth, isAdmin, Admin.getOwners)
  .get("/creators/:page", isAuth, isAdmin, Admin.getOwners)
  .delete("/remove-costumer/:costumerId", isAuth, isAdmin, Admin.deleteCostumer)
  .delete("/remove-owner/:ownerId", isAuth, isAdmin, Admin.deleteOwner)
  .delete("/remove-creator/:creatorId", isAuth, isAdmin, Admin.deleteCreator);

module.exports = router;
