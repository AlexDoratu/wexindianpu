function base(level, message, meta = {}) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    message,
    ...meta
  };

  const line = JSON.stringify(payload);
  if (level === 'error') {
    console.error(line);
    return;
  }
  console.log(line);
}

function info(message, meta) {
  base('info', message, meta);
}

function error(message, meta) {
  base('error', message, meta);
}

module.exports = {
  info,
  error
};
