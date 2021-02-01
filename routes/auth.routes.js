const router = require("express").Router();
const passport = require("passport");

const { Auth } = require("../controllers");

router
  .post(
    "/costumer-login",
    passport.authenticate("costumer-local"),
    Auth.costumerLogin
  )
  .post("/costumer-register", Auth.costumerRegister)
  .post("/owner-login", passport.authenticate("owner-local"), Auth.ownerLogin)
  .post("/owner-register", Auth.ownerRegister)
  .get("/logout", Auth.logout);

module.exports = router;
