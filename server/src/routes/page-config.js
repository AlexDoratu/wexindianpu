const express = require('express');
const {
  listConfigs,
  getConfig,
  saveConfig
} = require('../controllers/page-config-controller');
const adminAuth = require('../middlewares/admin-auth');

const router = express.Router();

router.get('/page-config/:pageKey', getConfig);
router.get('/admin/page-configs', adminAuth, listConfigs);
router.get('/admin/page-config/:pageKey', adminAuth, getConfig);
router.put('/admin/page-config/:pageKey', adminAuth, saveConfig);

module.exports = router;
