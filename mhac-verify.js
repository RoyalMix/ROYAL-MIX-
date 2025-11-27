const crypto = require('crypto');
const { HMAC } = require('../config/security');
const keyManager = require('../services/key_manager');

function computeHmac(secret, method, path, timestamp, nonce, body = '') {
  const payload = [method.toUpperCase(), path, timestamp, nonce, body].join('|');
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

async function hmacMiddleware(req, res, next) {
  try {
    const signature = req.headers[HMAC.HEADER];
    const ts = req.headers[HMAC.TIMESTAMP_HEADER];
    const nonce = req.headers[HMAC.NONCE_HEADER];

    if (!signature || !ts || !nonce) {
      return res.status(401).json({ error: 'Missing signature headers' });
    }

    const now = Math.floor(Date.now() / 1000);
    const reqTs = parseInt(ts, 10);
    if (Math.abs(now - reqTs) > HMAC.WINDOW_SECS) {
      return res.status(401).json({ error: 'Request timestamp outside allowed window' });
    }

    // fetch current active secret from key manager
    const secret = await keyManager.getActiveHmacKey(); // returns string
    const body = (req.body && Object.keys(req.body).length) ? JSON.stringify(req.body) : '';
    const expected = computeHmac(secret, req.method, req.originalUrl.split('?')[0], ts, nonce, body);

    if (!crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature, 'hex'))) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Optionally track nonce to prevent replay (store in Redis with short TTL)
    // await keyManager.markNonceUsed(nonce, ts);

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = hmacMiddleware;
