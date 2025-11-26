module.exports = function(req, res, next) {
  const key = req.headers["authorization"];
  if (!key) return res.status(401).json({ error: "Missing API key" });

  next();
};
