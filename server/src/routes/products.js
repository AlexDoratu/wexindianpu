const express = require('express');
const { getProducts, getProductDetail } = require('../controllers/products-controller');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductDetail);

module.exports = router;
