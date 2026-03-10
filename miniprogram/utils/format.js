function price(num) {
  return `¥${Number(num || 0).toFixed(0)}`;
}

module.exports = { price };
