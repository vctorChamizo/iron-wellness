const isLoggedIn = () => (req, res, next) =>
  req.user ? next() : res.status(401).json({ status: "User must be logged" });

const isLoggedOut = () => (req, res, next) =>
  !req.user ? next() : res.status(401).json({ status: "User already logged" });

const isAdmin = () => (req, res, next) =>
  req.user.type === "ADMIN"
    ? next()
    : res.status(401).json({ status: "User must be ADMIN" });

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isAdmin
};
