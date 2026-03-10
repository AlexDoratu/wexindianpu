const express = require('express');
const { createLead } = require('../controllers/leads-controller');
const leadsRateLimit = require('../middlewares/leads-rate-limit');

const router = express.Router();

router.post('/', leadsRateLimit, createLead);

module.exports = router;
