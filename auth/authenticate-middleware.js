module.exports = function restrictAccess(req, res, next) {
  req.session && req.session.user
    ? next()
    : res.status(401).json({ message: "Error: you must be logged in to do that." });
};
