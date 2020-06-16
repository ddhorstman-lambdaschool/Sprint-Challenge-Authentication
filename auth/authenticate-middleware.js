const config = require("../config/serverInfo");
module.exports = function restrictAccess(req, res, next) {
  if (req.session && req.session.user) return next();

  res.clearCookie(config.COOKIE_NAME);
  req.session.destroy();
  res.status(401).json({ message: "Error: you must be logged in to do that." });
};
