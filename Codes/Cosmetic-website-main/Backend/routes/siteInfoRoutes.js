const express = require('express');
const router = express.Router();
const siteInfoController = require('../controllers/siteInfoController');

// Get site information
router.get('/', siteInfoController.getSiteInfo);

// Update site information (admin only)
// This route should be protected with authentication middleware for admin users
router.put('/update', siteInfoController.updateSiteInfo);

module.exports = router; 