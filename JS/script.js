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

/**
 * Displays the signup form and sets the title to Admin or User Signup.
 */
function showSignupForm(role) {
  const signupFormSection = document.getElementById('signupFormSection');
  const signupTitle = document.getElementById('signupTitle');

  // Hide role selection section (if you have a separate one)
  const roleSelection = document.querySelector('.role-selection');
  roleSelection.classList.add('hidden');

  // Show the signup form
  signupFormSection.classList.remove('hidden');

  // Update the title based on role
  if (role === 'admin') {
    signupTitle.textContent = 'Admin Signup';
  } else {
    signupTitle.textContent = 'User Signup';
  }
}
