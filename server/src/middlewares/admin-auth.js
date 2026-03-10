const crypto = require('crypto');
const { fail } = require('../utils/http');

function safeEqual(a, b) {
  const aBuf = Buffer.from(a || '');
  const bBuf = Buffer.from(b || '');

  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function adminAuth(req, res, next) {
  const expected = process.env.ADMIN_TOKEN;
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';

  if (!expected || !safeEqual(token, expected)) {
    return fail(res, 401, '无权限访问管理接口');
  }

  return next();
}

module.exports = adminAuth;
