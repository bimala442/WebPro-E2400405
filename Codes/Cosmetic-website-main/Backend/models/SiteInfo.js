const mongoose = require('mongoose');

const siteInfoSchema = new mongoose.Schema({
    contact: {
        phone: {
            type: String,
            default: '9876555000'
        },
        email: {
            type: String,
            default: 'cosmetic20@gmail.com'
        },
        address: {
            type: String,
            default: '123 Lazimpat, Kathmandu, Nepal'
        }
    },
    location: {
        coordinates: {
            lat: {
                type: Number,
                default: 27.719889482786618
            },
            lng: {
                type: Number,
                default: 85.31563611506166
            }
        },
        mapUrl: {
            type: String,
            default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0212217171857!2d85.31563611506166!3d27.719889482786618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19017f2c0e5d%3A0xcc73b44d26fa8ca!2sLazimpat%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1654321234567!5m2!1sen!2snp'
        }
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// There should only be one document in this collection
siteInfoSchema.statics.getSiteInfo = async function() {
    // Find the first document or create a default one if none exists
    let siteInfo = await this.findOne();
    if (!siteInfo) {
        siteInfo = await this.create({});
    }
    return siteInfo;
};

const SiteInfo = mongoose.model('SiteInfo', siteInfoSchema);

module.exports = SiteInfo; 