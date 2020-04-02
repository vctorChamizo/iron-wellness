const isLoggedIn = () => (req, res, next) =>
  req.user ? next() : res.status(401).json({ status: "User must be logged" });

const isLoggedOut = () => (req, res, next) =>
  !req.user ? next() : res.status(401).json({ status: "User already logged" });

const isAdmin = () => (req, res, next) =>
  req.user.type === "ADMIN"
    ? next()
    : res.status(401).json({ status: "User must be ADMIN" });

const isClient = () => (req, res, next) =>
  req.user.type === "CLIENT"
    ? next()
    : res.status(401).json({ status: "User must be CLIENT" });

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isAdmin,
  isClient
};
