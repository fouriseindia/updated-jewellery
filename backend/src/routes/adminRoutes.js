// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { login ,getAdminCredentials } = require('../controllers/adminController');
const adminSettingController = require('../controllers/adminSettingController');

router.post('/login', login);
router.get('/', getAdminCredentials);
router.put('/update', adminSettingController.changePassword);
module.exports = router;