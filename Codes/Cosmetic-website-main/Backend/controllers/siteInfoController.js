const SiteInfo = require('../models/SiteInfo');

// Get site information
exports.getSiteInfo = async (req, res) => {
    try {
        const siteInfo = await SiteInfo.getSiteInfo();
        res.status(200).json({
            success: true,
            data: siteInfo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update site information (admin only)
exports.updateSiteInfo = async (req, res) => {
    try {
        const { contact, location } = req.body;
        
        // Find the site info document or create if it doesn't exist
        let siteInfo = await SiteInfo.findOne();
        if (!siteInfo) {
            siteInfo = new SiteInfo();
        }
        
        // Update fields if provided
        if (contact) {
            if (contact.phone) siteInfo.contact.phone = contact.phone;
            if (contact.email) siteInfo.contact.email = contact.email;
            if (contact.address) siteInfo.contact.address = contact.address;
        }
        
        if (location) {
            if (location.coordinates) {
                if (location.coordinates.lat) siteInfo.location.coordinates.lat = location.coordinates.lat;
                if (location.coordinates.lng) siteInfo.location.coordinates.lng = location.coordinates.lng;
            }
            if (location.mapUrl) siteInfo.location.mapUrl = location.mapUrl;
        }
        
        siteInfo.updatedAt = Date.now();
        
        await siteInfo.save();
        
        res.status(200).json({
            success: true,
            data: siteInfo,
            message: 'Site information updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}; 