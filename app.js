const express = require("express");
const createErrors = require("http-errors");

const app = express();
const { middlewares, sessions, authPassport } = require("./middlewares");
const routers = require("./routes");

// Middlewares
middlewares(app);

// Sessions
sessions(app);

// authPassport
authPassport(app);

// Routers
routers(app);

// Error handlers
app.use(async (req, res, next) => {
  next(createErrors.NotFound());
});

app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.send({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
