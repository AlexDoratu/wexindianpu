const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  const productsPath = path.join(__dirname, '..', '..', 'data', 'products.json');
  fs.readFile(productsPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        code: 500,
        message: '读取商品数据失败',
        data: null
      });
    }

    try {
      const allProducts = JSON.parse(data);
      const { category } = req.query;
      const filtered = category
        ? allProducts.filter((item) => item.category === category)
        : allProducts;

      return res.json({
        code: 0,
        message: 'ok',
        data: filtered
      });
    } catch (parseErr) {
      return res.status(500).json({
        code: 500,
        message: '商品数据格式错误',
        data: null
      });
    }
  });
});

module.exports = router;
