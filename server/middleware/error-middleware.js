const Sentry = require("@sentry/node");

Sentry.init({ dsn: process.env.SENTRY_DSN });

const error = (err, req, res) => {
  console.error("ERROR", req.method, req.path, err);

  // Sentry.captureException(err);

  if (!res.headersSent) {
    return res.status(500).json({ status: "ServerError", err });
  }
};

const notFound = (req, res) => res.status(400).json({ status: "NotFound" });

module.exports = {
  error,
  notFound
};
