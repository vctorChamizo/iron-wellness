require("dotenv").config();

const Sentry = require("@sentry/node");

Sentry.init({ dsn: process.env.SENTRY_DSN });

const handleServerError = (error, req, res, next) => {
  console.error("ERROR", req.method, req.path, error);

  Sentry.captureException(error);

  return res.status(500).json({ status: "ServerError" });
};

const handleNotFoundError = (req, res) =>
  res.status(400).json({ status: "NotFound" });

module.exports = {
  handleServerError,
  handleNotFoundError
};
