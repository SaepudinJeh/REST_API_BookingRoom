module.exports = (app) => {
  app.use("/auth", require("./auth.routes"));
  app.use("/admin", require("./admin.routes"));
  app.use("/costumer", require("./costumer.routes"));
  app.use("/owner", require("./owner.routes"));
  app.use("/oauth", require("./oauth.routes"));
};
