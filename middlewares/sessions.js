const session = require("express-session");
const connectMongo = require("connect-mongo");
const MongoStore = connectMongo(session);
const mongoose = require("mongoose");

module.exports = (app) => {
  app.use(
    session({
      name: "kosku-app",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
      },
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );
};
