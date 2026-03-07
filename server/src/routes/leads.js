const express = require('express');
const db = require('../db');

const router = express.Router();
const mobileReg = /^1\d{10}$/;

router.post('/', (req, res) => {
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
    return res.status(400).json({
      code: 400,
      message: '请填写必填字段：姓名、手机号、微信号、商品'
    });
  }

  if (!mobileReg.test(mobile)) {
    return res.status(400).json({
      code: 400,
      message: '手机号格式不正确'
    });
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

  db.run(sql, values, function onInsert(err) {
    if (err) {
      return res.status(500).json({
        code: 500,
        message: '提交失败，请稍后重试'
      });
    }

    return res.json({
      code: 0,
      message: '提交成功',
      data: { id: this.lastID }
    });
  });
});

module.exports = router;
