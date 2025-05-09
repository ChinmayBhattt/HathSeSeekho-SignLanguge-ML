// Authentication utilities

/**
 * Check if user is logged in
 * @returns {boolean} Whether the user is logged in
 */
function isUserLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

/**
 * Log out the current user
 */
function logoutUser() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
  window.location.href = '/react-login/index.html';
}

/**
 * Get the current user data
 * @returns {Object|null} The user data or null if not logged in
 */
function getCurrentUser() {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (e) {
      return null;
    }
  }
  return null;
}

// Check if we need to redirect
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath.includes('/react-login/');
  
  if (isUserLoggedIn() && isLoginPage) {
    // Redirect logged in users away from login page
    window.location.href = '/';
  } else if (!isUserLoggedIn() && !isLoginPage) {
    // Redirect non-logged in users to login page
    window.location.href = '/react-login/index.html';
  }
}); 