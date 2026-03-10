const db = require('../db');
const { success, fail } = require('../utils/http');

const mobileReg = /^1\d{10}$/;

function createLead(req, res) {
  const {
    name,
    mobile,
    wechatId,
    productId,
    productName,
    color,
    size,
    remark
  } = req.body;

  if (!name || !mobile || !wechatId || !productName) {
    return fail(res, 400, '请填写必填字段：姓名、手机号、微信号、商品');
  }

  if (!mobileReg.test(mobile)) {
    return fail(res, 400, '手机号格式不正确');
  }

  const sql = `
    INSERT INTO leads
      (name, mobile, wechatId, productId, productName, color, size, remark, createdAt)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    mobile,
    wechatId,
    productId || '',
    productName,
    color || '',
    size || '',
    remark || '',
    new Date().toISOString()
  ];

  return db.run(sql, values, function onInsert(err) {
    if (err) {
      return fail(res, 500, '提交失败，请稍后重试');
    }

    return success(res, { id: this.lastID }, '提交成功');
  });
}

module.exports = {
  createLead
};
