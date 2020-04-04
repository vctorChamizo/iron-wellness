//const Sentry = require("@sentry/node");

//Sentry.init({ dsn: process.env.SENTRY_DSN });

const error = (error, req, res) => {
  console.error("ERROR", req.method, req.path, error);

  // Sentry.captureException(err);

  return res.status(500).json({ status: "ServeError" });
};

const notFound = (req, res) => res.status(400).json({ status: "NotFound" });

module.exports = {
  error,
  notFound
};
