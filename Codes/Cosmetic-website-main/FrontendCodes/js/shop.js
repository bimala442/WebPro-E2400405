// Global variables
let cart = [];
let productDetails = {
    'Lipstick': {
        image: 'images/lipstick.jpg',
        description: 'Long-lasting, moisturizing lipstick with a matte finish. Available in 10 stunning shades.',
        originalPrice: 550,
        price: 500,
        benefits: 'Long-lasting, non-drying formula with vitamin E.',
        directions: 'Apply directly to lips. For a more defined look, use with a lip liner.'
    },
    'Foundation': {
        image: 'images/foundation.jpg',
        description: 'Smooth, medium-coverage foundation that blends seamlessly for a natural look.',
        originalPrice: 550,
        price: 500,
        benefits: 'Oil-free formula with SPF 15 protection.',
        directions: 'Apply to clean, moisturized skin with fingers, brush, or sponge.'
    },
    'Highlighter': {
        image: 'images/highlighter.jpg',
        description: 'Illuminating highlighter that gives your skin a radiant, dewy glow.',
        originalPrice: 550,
        price: 500,
        benefits: 'Enriched with light-reflecting particles for a natural glow.',
        directions: 'Apply to cheekbones, brow bone, and cupid\'s bow for a radiant finish.'
    },
    'Mascara': {
        image: 'images/mascara.jpg',
        description: 'Volumizing mascara that lengthens and separates lashes without clumping.',
        originalPrice: 650,
        price: 600,
        benefits: 'Smudge-proof formula that lasts all day.',
        directions: 'Apply from root to tip in a zigzag motion for maximum volume.'
    },
    'Hair Oil': {
        image: 'images/hairoil.jpg',
        description: 'Nourishing hair oil that tames frizz and adds shine to dull hair.',
        originalPrice: 550,
        price: 500,
        benefits: 'Contains argan and jojoba oils for deep hydration.',
        directions: 'Apply a small amount to damp or dry hair, focusing on the ends.'
    },
    'Blush': {
        image: 'images/blush.jpg',
        description: 'Silky, buildable blush that adds a natural flush to your cheeks.',
        originalPrice: 550,
        price: 500,
        benefits: 'Infused with antioxidants and vitamin E.',
        directions: 'Apply to the apples of your cheeks and blend upward toward temples.'
    },
    'Nail Polish': {
        image: 'images/nail.jpg',
        description: 'Quick-drying, chip-resistant nail polish in a variety of trendy colors.',
        originalPrice: 550,
        price: 500,
        benefits: '5-free formula without harmful chemicals.',
        directions: 'Apply two coats after a base coat for best results.'
    },
    'Perfume': {
        image: 'images/perfume.jpg',
        description: 'Long-lasting fragrance with notes of jasmine, vanilla, and sandalwood.',
        originalPrice: 550,
        price: 500,
        benefits: 'Alcohol-free formula that\'s gentle on sensitive skin.',
        directions: 'Apply to pulse points: wrists, neck, and behind ears.'
    },
    'Cleanser': {
        image: 'images/cleanser.jpg',
        description: 'Gentle, foaming cleanser that removes makeup and impurities without stripping skin.',
        originalPrice: 550,
        price: 500,
        benefits: 'pH-balanced formula suitable for all skin types.',
        directions: 'Massage onto damp skin, then rinse with warm water.'
    }
};

// On page load
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to product boxes
    addProductClickListeners();
    
    // Initialize Buy Now buttons
    initBuyNowButtons();
    
    // Load cart from local storage
    loadCart();
    
    // Update cart badge
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }
});

// Add click listeners to product boxes to show details
function addProductClickListeners() {
    document.querySelectorAll('.product-img, .product-title').forEach(element => {
        element.addEventListener('click', function() {
            const productBox = this.closest('.box');
            const productName = productBox.querySelector('.product-title').textContent;
            showProductDetails(productName);
        });
    });
}

// Show product details when clicked
function showProductDetails(productName) {
    // Get product details
    const product = productDetails[productName];
    if (!product) return;
    
    // Create modal if it doesn't exist
    let productModal = document.getElementById('product-modal');
    
    if (!productModal) {
        productModal = document.createElement('div');
        productModal.id = 'product-modal';
        productModal.className = 'modal';
        document.body.appendChild(productModal);
    }
    
    // Generate product detail content
    let modalContent = `
        <div class="modal-content product-detail-content">
            <span class="close" onclick="closeModal('product-modal')">&times;</span>
            
            <div class="product-detail">
                <div class="product-image">
                    <img src="${product.image}" alt="${productName}">
                    <div class="product-discount">10% OFF</div>
                </div>
                
                <div class="product-info">
                    <h2>${productName}</h2>
                    <div class="product-price">
                        <span class="current-price">Nrs.${product.price}</span>
                        <span class="original-price">Nrs.${product.originalPrice}</span>
                    </div>
                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>
                    
                    <div class="product-meta">
                        <div class="meta-item">
                            <h4>Benefits</h4>
                            <p>${product.benefits}</p>
                        </div>
                        <div class="meta-item">
                            <h4>Directions</h4>
                            <p>${product.directions}</p>
                        </div>
                    </div>
                    
                    <div class="product-quantity">
                        <h4>Quantity</h4>
                        <div class="quantity-selector">
                            <button onclick="updateDetailQuantity(-1)">-</button>
                            <input type="number" id="detail-quantity" value="1" min="1" max="10">
                            <button onclick="updateDetailQuantity(1)">+</button>
                        </div>
                    </div>
                    
                    <div class="product-total">
                        <h4>Total Amount</h4>
                        <span id="product-total-amount">Nrs.${product.price}</span>
                    </div>
                    
                    <div class="product-actions">
                        <button class="buy-now-btn" onclick="buyNowFromDetail('${productName}', ${product.price})">Buy Now</button>
                    </div>
                </div>
            </div>
            
            <div class="product-tabs">
                <div class="tabs">
                    <button class="tab-btn active" onclick="openProductTab(event, 'description')">Description</button>
                    <button class="tab-btn" onclick="openProductTab(event, 'reviews')">Reviews</button>
                    <button class="tab-btn" onclick="openProductTab(event, 'shipping')">Shipping</button>
                </div>
                
                <div id="description" class="tab-content active">
                    <h3>Product Description</h3>
                    <p>${product.description}</p>
                    <p>Our ${productName} is made with high-quality ingredients that are gentle on your skin. We never test on animals and all our products are cruelty-free.</p>
                </div>
                
                <div id="reviews" class="tab-content">
                    <h3>Customer Reviews</h3>
                    <div class="reviews-container">
                        <div class="review">
                            <div class="review-header">
                                <span class="reviewer-name">Sarah M.</span>
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                            <p class="review-text">Love this product! It's become an essential part of my daily routine.</p>
                        </div>
                        
                        <div class="review">
                            <div class="review-header">
                                <span class="reviewer-name">Rajesh K.</span>
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="far fa-star"></i>
                                </div>
                            </div>
                            <p class="review-text">Great product at a reasonable price. Would recommend to friends.</p>
                        </div>
                    </div>
                </div>
                
                <div id="shipping" class="tab-content">
                    <h3>Shipping Information</h3>
                    <p>Free delivery within Kathmandu Valley. Delivery typically takes 2-3 business days.</p>
                    <p>For deliveries outside the valley, additional charges may apply. Please contact customer support for more information.</p>
                </div>
            </div>
        </div>
    `;
    
    productModal.innerHTML = modalContent;
    productModal.style.display = 'block';
    
    // Initialize quantity input
    updateProductTotal(product.price);
}

// Update quantity in product detail
function updateDetailQuantity(change) {
    const quantityInput = document.getElementById('detail-quantity');
    const totalElement = document.getElementById('product-total-amount');
    
    if (!quantityInput || !totalElement) return;
    
    let quantity = parseInt(quantityInput.value) + change;
    
    // Ensure quantity is between 1 and 10
    if (quantity < 1) quantity = 1;
    if (quantity > 10) quantity = 10;
    
    quantityInput.value = quantity;
    
    // Get price from displayed total
    const priceText = totalElement.textContent;
    const price = parseInt(priceText.replace('Nrs.', '')) / parseInt(quantityInput.value);
    
    updateProductTotal(price);
}

// Update product total in detail view
function updateProductTotal(price) {
    const quantityInput = document.getElementById('detail-quantity');
    const totalElement = document.getElementById('product-total-amount');
    
    if (!quantityInput || !totalElement) return;
    
    const quantity = parseInt(quantityInput.value);
    const total = price * quantity;
    
    totalElement.textContent = `Nrs.${total}`;
}

// Buy now from product detail
function buyNowFromDetail(productName, price) {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        showMessage("Please login to make a purchase", "error");
        showAuthModal('login');
        return;
    }
    
    const quantityInput = document.getElementById('detail-quantity');
    if (!quantityInput) return;
    
    const quantity = parseInt(quantityInput.value);
    
    // Close product modal
    closeModal('product-modal');
    
    // Show purchase summary before checkout
    showProductSummary(productName, price, quantity);
    
    // Save purchase to user's purchase history
    savePurchase(productName, price, quantity);
}

// Open product tab
function openProductTab(event, tabName) {
    // Hide all tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show the selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to the button that opened the tab
    event.currentTarget.classList.add('active');
}

// Add item to cart - Removed
function addToCart(productName, price) {
    // Functionality removed
    console.log("Add to cart functionality has been removed");
    showMessage("Cart functionality has been removed. Please use Buy Now instead.", "info");
}

// Buy product immediately
function buyNow(productName, price) {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        showMessage("Please login to make a purchase", "error");
        showAuthModal('login');
        return;
    }
    
    // Show purchase summary before checkout
    showProductSummary(productName, price, 1);
    
    // Save purchase to user's purchase history
    savePurchase(productName, price, 1);
}

// Show product summary when Buy Now is clicked
function showProductSummary(productName, price, quantity) {
    // Create modal if it doesn't exist
    let summaryModal = document.getElementById('product-summary-modal');
    
    if (!summaryModal) {
        summaryModal = document.createElement('div');
        summaryModal.id = 'product-summary-modal';
        summaryModal.className = 'modal';
        document.body.appendChild(summaryModal);
    }
    
    const total = price * quantity;
    const product = productDetails[productName];
    
    if (!product) {
        console.error('Product details not found for:', productName);
        return;
    }
    
    // Generate simpler product summary focusing just on name and total cost without favorite button
    let summaryContent = `
        <div class="modal-content product-summary-content">
            <span class="close" onclick="closeModal('product-summary-modal')">&times;</span>
            <h2>YOUR ORDER SUMMARY</h2>
            
            <div class="product-list">
                <div class="product-item">
                    <div class="product-item-image">
                        <img src="${product.image}" alt="${productName}">
                    </div>
                    <div class="product-item-details">
                        <h3 class="product-item-name">${productName}</h3>
                        <div class="product-item-price">Unit Price: Nrs.${price}</div>
                        <div class="product-item-quantity">Quantity: ${quantity}</div>
                    </div>
                </div>
            </div>
            
            <div class="total-section">
                <div class="total-row">
                    <div class="total-label">TOTAL COST:</div>
                    <div class="total-amount">Nrs.${total}</div>
                </div>
            </div>
            
            <div class="product-summary-actions">
                <button class="btn secondary" onclick="closeModal('product-summary-modal'); window.location.href='#shop';">Continue Shopping</button>
                <button class="btn checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
            </div>
        </div>
    `;
    
    summaryModal.innerHTML = summaryContent;
    summaryModal.style.display = 'block';
}

// Proceed to checkout - completes the purchase
function proceedToCheckout() {
    closeModal('product-summary-modal');
    showMessage("Your order has been placed successfully!", "success");
}

// Show checkout modal
function showCheckout() {
    // Create product summary modal for direct checkout
    let checkoutModal = document.getElementById('checkout-modal');
    
    if (!checkoutModal) {
        checkoutModal = document.createElement('div');
        checkoutModal.id = 'checkout-modal';
        checkoutModal.className = 'modal';
        document.body.appendChild(checkoutModal);
    }
    
    // Show message
    showMessage("Cart functionality has been removed. Please use Buy Now for individual products.", "info");
    
    // Close modal automatically
    setTimeout(() => {
        closeModal('checkout-modal');
    }, 2000);
}

// Save purchase to user's purchase history
function savePurchase(productName, price, quantity) {
    // Get current user
    const currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) return;
    
    const currentUser = JSON.parse(currentUserJson);
    const userId = currentUser.email;
    
    // Get existing purchases for this user
    let userPurchases = getUserPurchases(userId);
    
    // Add new purchase with timestamp
    userPurchases.push({
        productName: productName,
        price: price,
        quantity: quantity,
        total: price * quantity,
        date: new Date().toISOString(),
        orderId: generateOrderId()
    });
    
    // Save updated purchases
    localStorage.setItem(`purchases_${userId}`, JSON.stringify(userPurchases));
    
    // Show success message
    showMessage(`${productName} has been purchased successfully!`, "success");
}

// Get user's purchase history
function getUserPurchases(userId) {
    const purchases = localStorage.getItem(`purchases_${userId}`);
    return purchases ? JSON.parse(purchases) : [];
}

// Generate a unique order ID
function generateOrderId() {
    return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// Display user's purchase history in profile
function displayPurchaseHistory() {
    // Get current user
    const currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) return;
    
    const currentUser = JSON.parse(currentUserJson);
    const userId = currentUser.email;
    
    // Get purchases for this user
    const purchases = getUserPurchases(userId);
    
    // Get purchase history container
    const purchaseHistoryContainer = document.getElementById('purchase-history');
    if (!purchaseHistoryContainer) return;
    
    // If no purchases, show message
    if (purchases.length === 0) {
        purchaseHistoryContainer.innerHTML = '<p>You have not made any purchases yet.</p>';
        return;
    }
    
    // Generate HTML for purchase history
    let purchaseHistoryHTML = `
        <h3>Your Purchase History</h3>
        <div class="purchase-list">
    `;
    
    // Sort purchases by date (newest first)
    purchases.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Generate HTML for each purchase
    purchases.forEach(purchase => {
        const date = new Date(purchase.date).toLocaleDateString();
        purchaseHistoryHTML += `
            <div class="purchase-item">
                <div class="purchase-header">
                    <div class="purchase-date">${date}</div>
                    <div class="purchase-order-id">Order ID: ${purchase.orderId}</div>
                </div>
                <div class="purchase-details">
                    <div class="purchase-product">${purchase.productName}</div>
                    <div class="purchase-info">
                        <span>Quantity: ${purchase.quantity}</span>
                        <span>Price: Nrs.${purchase.price}</span>
                    </div>
                    <div class="purchase-total">Total: Nrs.${purchase.total}</div>
                </div>
            </div>
        `;
    });
    
    purchaseHistoryHTML += `
        </div>
    `;
    
    // Update purchase history container
    purchaseHistoryContainer.innerHTML = purchaseHistoryHTML;
}

// Initialize Buy Now buttons
function initBuyNowButtons() {
    document.querySelectorAll('.buy-now-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Extract product name and price from attributes
            const productBox = this.closest('.box');
            if (!productBox) return;
            
            const productName = productBox.querySelector('.product-title').textContent;
            const priceText = productBox.querySelector('.price').textContent;
            const price = parseInt(priceText.match(/Nrs\.(\d+)/)[1]);
            
            buyNow(productName, price);
        });
    });
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Show message
function showMessage(message, type = 'info') {
    // Create message container if it doesn't exist
    let messageContainer = document.getElementById('message-container');
    
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'message-container';
        document.body.appendChild(messageContainer);
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    messageContainer.appendChild(messageElement);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            if (messageContainer.contains(messageElement)) {
                messageContainer.removeChild(messageElement);
            }
        }, 500); // Wait for fade animation
    }, 3000);
}

// Load cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cosmeticCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Show cart modal - Removed
function showCart() {
    // Functionality removed
    console.log("Cart functionality has been removed");
    showMessage("Cart functionality has been removed. Please use Buy Now instead.", "info");
}

// Update cart display - Removed
function updateCartDisplay() {
    // Functionality removed
    console.log("Cart functionality has been removed");
}

// Update quantity - Removed
function updateQuantity(index, change) {
    // Functionality removed
    console.log("Cart functionality has been removed");
}

// Remove item from cart - Removed
function removeItem(index) {
    // Functionality removed
    console.log("Cart functionality has been removed");
} 