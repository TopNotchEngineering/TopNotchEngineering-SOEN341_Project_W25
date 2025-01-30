/**
 * Shows the login form for the specified role (admin or user).
 */
function showLoginForm(role) {
  const roleSelection = document.querySelector('.role-selection');
  const loginSection = document.getElementById('loginSection');
  const loginTitle = document.getElementById('loginTitle');

  // Hide role selection
  roleSelection.classList.add('hidden');

  // Show login form
  loginSection.classList.remove('hidden');

  // Update title based on role
  if (role === 'admin') {
    loginTitle.textContent = 'Admin Login';
  } else {
    loginTitle.textContent = 'User Login';
  }
}
