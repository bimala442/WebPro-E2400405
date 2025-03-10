// API base URL - adjust as needed for your environment
const API_URL = 'http://localhost:5000/api';

// Elements to update with site information
const phoneElements = document.querySelectorAll('[data-site-phone]');
const emailElements = document.querySelectorAll('[data-site-email]');
const addressElements = document.querySelectorAll('[data-site-address]');
const mapContainer = document.querySelector('.map-container iframe');

// Fetch site information from the backend
async function fetchSiteInfo() {
    try {
        const response = await fetch(`${API_URL}/site-info`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch site information');
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
            updateSiteInfo(data.data);
        } else {
            console.error('Invalid site information data received');
        }
    } catch (error) {
        console.error('Error fetching site information:', error.message);
        // Use default values if unable to fetch from backend
        const defaultSiteInfo = {
            contact: {
                phone: '9876555000',
                email: 'cosmetic20@gmail.com',
                address: '123 Lazimpat, Kathmandu, Nepal'
            },
            location: {
                mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0212217171857!2d85.31563611506166!3d27.719889482786618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19017f2c0e5d%3A0xcc73b44d26fa8ca!2sLazimpat%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1654321234567!5m2!1sen!2snp'
            }
        };
        updateSiteInfo(defaultSiteInfo);
    }
}

// Update site information in the DOM
function updateSiteInfo(siteInfo) {
    const { contact, location } = siteInfo;
    
    // Update phone numbers
    phoneElements.forEach(element => {
        const el = element.tagName === 'A' 
            ? element 
            : element.querySelector('a[href^="tel:"]');
            
        if (el) {
            el.textContent = contact.phone;
            el.href = `tel:${contact.phone}`;
        }
    });
    
    // Update email addresses
    emailElements.forEach(element => {
        const el = element.tagName === 'A' 
            ? element 
            : element.querySelector('a[href^="mailto:"]');
            
        if (el) {
            el.textContent = contact.email;
            el.href = `mailto:${contact.email}`;
        }
    });
    
    // Update address
    addressElements.forEach(element => {
        element.textContent = contact.address;
    });
    
    // Update map
    if (mapContainer && location.mapUrl) {
        mapContainer.src = location.mapUrl;
    }
}

// Initialize site information when the page loads
document.addEventListener('DOMContentLoaded', fetchSiteInfo); 