const { fail } = require('../utils/http');

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;
const visits = new Map();

function leadsRateLimit(req, res, next) {
  const now = Date.now();
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const current = visits.get(ip) || { count: 0, startAt: now };

  if (now - current.startAt > WINDOW_MS) {
    visits.set(ip, { count: 1, startAt: now });
    return next();
  }

  if (current.count >= MAX_REQUESTS) {
    return fail(res, 429, '请求过于频繁，请稍后再试');
  }

  current.count += 1;
  visits.set(ip, current);
  return next();
}

module.exports = leadsRateLimit;
