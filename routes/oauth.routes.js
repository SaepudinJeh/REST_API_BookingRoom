const router = require("express").Router();
const passport = require("passport");

router
  .get(
    "/facebook",
    passport.authenticate("facebook", {
      scope: ["email"],
    })
  )
  .get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      scope: ["email"],
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.json({
        message: "Login facebook successfully",
      });
    }
  )
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    passport.authenticate("google"),
    async (req, res, next) => {
      res.json({
        message: "Login with Google successfully",
      });
    }
  );

module.exports = router;
