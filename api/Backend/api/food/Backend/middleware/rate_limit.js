const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 200,
  message: "Too many requests. Please slow down."
});
