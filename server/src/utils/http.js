function success(res, data, message = 'ok') {
  return res.json({
    code: 0,
    message,
    data
  });
}

function fail(res, code, message, data = null) {
  return res.status(code).json({
    code,
    message,
    data
  });
}

module.exports = {
  success,
  fail
};
