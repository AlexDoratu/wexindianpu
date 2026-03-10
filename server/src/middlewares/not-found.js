const { fail } = require('../utils/http');

function notFound(req, res) {
  return fail(res, 404, '接口不存在');
}

module.exports = notFound;
