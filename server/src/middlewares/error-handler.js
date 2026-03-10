const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error('unhandled_error', {
    requestId: req.requestId,
    method: req.method,
    path: req.path,
    stack: err.stack
  });

  const statusCode = err.statusCode || 500;
  const message = statusCode >= 500 ? '服务器开小差，请稍后再试' : err.message;

  return res.status(statusCode).json({
    code: statusCode,
    message,
    data: err.details || null
  });
}

module.exports = errorHandler;
