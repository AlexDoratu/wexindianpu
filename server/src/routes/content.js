const express = require('express');
const {
  listCategories,
  listSeries,
  getBrandInfo
} = require('../controllers/content-controller');

const router = express.Router();

router.get('/categories', listCategories);
router.get('/series', listSeries);
router.get('/brand', getBrandInfo);

module.exports = router;
