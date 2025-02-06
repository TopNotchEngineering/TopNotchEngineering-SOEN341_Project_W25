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

// script.js

/**
 * Show one of the dashboard tabs (dashboard, chats, channels, teams, friends),
 * and hide the others.
 */
function showTab(tabId) {
  // 1. Hide all tab sections
  const allTabs = document.querySelectorAll('.tab-section');
  allTabs.forEach((tab) => {
    tab.classList.add('hidden');
  });

  // 2. Remove 'active' state from all nav links
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach((link) => {
    link.classList.remove('active');
  });

  // 3. Show the selected tab
  const targetTab = document.getElementById(tabId);
  if (targetTab) {
    targetTab.classList.remove('hidden');
  }

  // 4. Highlight the corresponding nav link
  // We'll assume we named the link's id as tabId + "Link" => e.g., "chatsTab" => "chatsLink"
  const linkId = tabId.replace('Tab', 'Link'); // e.g. "chatsTab" -> "chatsLink"
  const activeLink = document.getElementById(linkId);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

function handleLogin(e) {
  e.preventDefault();
  // Validate username/password. If valid:
  window.location.href = 'dashboard.html';
}

function showSignupForm(role) {
  document.getElementById("signupFormSection").classList.remove("hidden");
  document.getElementById("signupTitle").innerText = role === 1 ? "Admin Signup" : "User Signup";
  document.getElementById("role").value = role; // Set role as 1 (admin) or 0 (user)
}

/**
     * This sections handles the backend for the sign up form, it registers the data into the database.
     * It also validates that both passwords match.
     */
document.getElementById("registerForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Check if passwords match
  if (password !== confirmPassword) {
      alert("The passwords do not match!");
      return;
  }

  const userData = {
      username: document.getElementById("username").value,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      country: document.getElementById("country").value,
      logInEmail: document.getElementById("email").value,
      logInPassword: password,
      isAdmin: parseInt(document.getElementById("role").value, 10)
  };

  try {
      const response = await fetch("http://localhost:5004/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (response.ok) {
          alert("You have been registered successfully! You can now log in to your account.");
          window.location.href = "login.html"; // Redirect to login page
      } else {
          alert("Registration failed: " + data.message);
      }
  } catch (error) {
      alert("An error occurred.");
      console.error("Registration Error:", error);
  }
});

