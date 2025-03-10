// User state
let currentUser = null;

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize demo users if they don't exist
    initDemoUsers();
    
    const user = localStorage.getItem('currentUser');
    if (user) {
        try {
            currentUser = JSON.parse(user);
            updateUIForLoggedInUser();
        } catch (error) {
            // Invalid data, clear it
            localStorage.removeItem('currentUser');
            updateUIForLoggedOutUser();
        }
    } else {
        updateUIForLoggedOutUser();
    }
});

// Initialize demo users for testing
function initDemoUsers() {
    const users = getUsersFromStorage();
    
    if (users.length === 0) {
        // Add demo users if no users exist
        const demoUsers = [
            {
                id: '1',
                username: 'Demo User',
                email: 'demo@example.com',
                password: 'password123',
                location: 'Kathmandu, Nepal'
            },
            {
                id: '2',
                username: 'Test User',
                email: 'test@example.com',
                password: 'test123',
                location: 'Pokhara, Nepal'
            }
        ];
        
        localStorage.setItem('users', JSON.stringify(demoUsers));
        console.log('Demo users initialized.');
    }
}

// Register a new user
function registerUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const location = document.getElementById('register-location').value || 'Not specified';
    
    // Check if email already exists
    const users = getUsersFromStorage();
    if (users.some(user => user.email === email)) {
        showMessage('Email already registered. Please login instead.', 'error');
        return;
    }
    
    // Create user object
    const user = {
        id: Date.now().toString(),
        username,
        email,
        password, // In a real app, this would be hashed
        location
    };
    
    // Add user to storage
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set current user
    currentUser = { ...user };
    delete currentUser.password; // Don't store password in memory
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update UI
    updateUIForLoggedInUser();
    
    // Close login modal
    closeAuthModal();
    
    showMessage('Registration successful!', 'success');
}

// Login a user
function loginUser(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Find user in storage
    const users = getUsersFromStorage();
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        // Set current user
        currentUser = { ...user };
        delete currentUser.password; // Don't store password in memory
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update UI
        updateUIForLoggedInUser();
        
        // Close login modal
        closeAuthModal();
        
        showMessage('Login successful!', 'success');
    } else {
        showMessage('Invalid email or password', 'error');
    }
}

// Logout user
function logoutUser() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateUIForLoggedOutUser();
    showMessage('Logged out successfully!', 'success');
}

// Get users from storage
function getUsersFromStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Show user profile
function showUserProfile() {
    if (!currentUser) return;
    
    // Set user profile details
    document.getElementById('profile-username').textContent = currentUser.username;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-location').textContent = currentUser.location || 'Not specified';
    
    // Display purchase history
    if (typeof displayPurchaseHistory === 'function') {
        displayPurchaseHistory();
    }
    
    // Show profile modal
    const profileModal = document.getElementById('profile-modal');
    profileModal.style.display = 'block';
}

// Close user profile modal
function closeProfileModal() {
    const profileModal = document.getElementById('profile-modal');
    profileModal.style.display = 'none';
}

// Show auth modal (login or register)
function showAuthModal(tab = 'login') {
    const authModal = document.getElementById('auth-modal');
    authModal.style.display = 'block';
    
    // Set active tab
    if (tab === 'login') {
        document.getElementById('login-tab').classList.add('active');
        document.getElementById('register-tab').classList.remove('active');
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    } else {
        document.getElementById('register-tab').classList.add('active');
        document.getElementById('login-tab').classList.remove('active');
        document.getElementById('register-form').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
    }
}

// Close auth modal
function closeAuthModal() {
    const authModal = document.getElementById('auth-modal');
    authModal.style.display = 'none';
}

// Update UI based on login state
function updateUIForLoggedInUser() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('user-profile').style.display = 'flex';
    
    // Update greeting with the username
    document.getElementById('user-greeting').textContent = `Hello, ${currentUser.username}`;
}

function updateUIForLoggedOutUser() {
    document.getElementById('auth-section').style.display = 'flex';
    document.getElementById('user-profile').style.display = 'none';
}

// Show message
function showMessage(message, type = 'info') {
    const messageContainer = document.getElementById('message-container');
    
    if (!messageContainer) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    messageContainer.appendChild(messageElement);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            messageContainer.removeChild(messageElement);
        }, 500); // Wait for fade animation
    }, 3000);
}

// Toggle dropdown
function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.user-profile-btn') && !event.target.closest('.user-profile-btn')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
} 