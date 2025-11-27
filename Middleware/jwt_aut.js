const jwt = require('jsonwebtoken');
const { JWT } = require('../config/security');

function signToken(payload, secret, opts = {}) {
  return jwt.sign(payload, secret, {
    algorithm: JWT.ALGORITHM,
    expiresIn: JWT.EXPIRY,
    ...opts
  });
}

function verifyToken(token, secret) {
  return jwt.verify(token, secret, { algorithms: [JWT.ALGORITHM] });
}

function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'Missing auth token' });
    const token = header.split(' ')[1];
    const payload = verifyToken(token, process.env.JWT_SECRET);
    req.auth = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { signToken, verifyToken, authMiddleware };
