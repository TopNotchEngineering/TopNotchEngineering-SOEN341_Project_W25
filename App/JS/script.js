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
  document.getElementById("loginSection").classList.remove("hidden");
  document.getElementById("loginTitle").innerText = role === 1 ? "Admin Login" : "User Login";
  document.getElementById("role").value = role; // Set role as 1 (admin) or 0 (user)
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
  if (role === 1) {
    signupTitle.textContent = 'Admin Signup';
  } else {
    signupTitle.textContent = 'User Signup';
  }

  document.getElementById("signupFormSection").classList.remove("hidden");
  document.getElementById("signupTitle").innerText = role === 1 ? "Admin Signup" : "User Signup";
  document.getElementById("role").value = role; // Set role as 1 (admin) or 0 (user)
}

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
  const linkId = tabId.replace('Tab', 'Link');
  const activeLink = document.getElementById(linkId);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

    // DOMContentLoaded event listener to prevent the script from running before the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
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
      const response = await fetch("http://localhost:5008/register", {
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
});

// DOMContentLoaded event listener to prevent the script from running before the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Function to handle the login form submission
  document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const loginData = {
        username: document.getElementById("username").value,
        logInPassword: document.getElementById("password").value,
        isAdmin: parseInt(document.getElementById("role").value, 10)
    };
    
    const roleElement = document.getElementById("role");
  
    try {
        const response = await fetch("http://localhost:5008/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });
  
        const data = await response.json();
        if (response.ok) {
          if (roleElement.value === "1") {
            alert("You have been logged as admin!");
             // Redirect to the admin dashboard and display the sessions username
            window.location.href = `Admin/AdminDashboard.html?username=${loginData.username}`; // Redirect to the admin dashboard and display the sessions username
          }
          else {
            alert("You have been logged in as user!");
            window.location.href = `User/UserDashboard.html?username=${loginData.username}`; // Redirect to the user dashboard and display the sessions username
          }
        } else {
            alert("Login failed: " + data.message);
        }
    } catch (error) {
        alert("An error occurred.");
        console.error("Login Error:", error);
    }
  });
  });

document.addEventListener('DOMContentLoaded', () => {
  // Get the team name from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const teamName = urlParams.get('team') || 'Team Name';

  // Existing code...
  const newChannelBtn = document.getElementById('newChannelBtn');
  const createChannelModal = document.getElementById('createChannelModal');

  newChannelBtn.addEventListener('click', () => {
    // Auto-populate the team name field in the create channel form
    const teamNameInputField = document.getElementById('teamNameInput');
    teamNameInputField.value = teamName;
    createChannelModal.classList.remove('hidden');
  });

});

// Update welcome message using a URL parameter
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username') || 'User';
document.getElementById('welcomeMessage').innerText = `Welcome to your dashboard, ${username}.
Please choose a tab above to get started.`;

// Also prefill the username in the profile form
document.getElementById('profileUsernameInput').value = username;

// Event listener for Logout button inside the modal
document.getElementById('modalLogoutBtn').addEventListener('click', () => {
  // Clear session or perform logout tasks here
  window.location.href = '../login.html';
});

// Modal handling for Profile button
const profileModal = document.getElementById('profileModal');
const profileBtn = document.getElementById('profileBtn');
const closeModal = document.getElementById('closeModal');

profileBtn.addEventListener('click', () => {
  profileModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  profileModal.classList.add('hidden');
  // Hide password change section if visible
  document.getElementById('passwordChangeSection').classList.add('hidden');
});

// Close modal if user clicks outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === profileModal) {
    profileModal.classList.add('hidden');
    document.getElementById('passwordChangeSection').classList.add('hidden');
  }
});

// Toggle Change Password section visibility
const changePasswordBtn = document.getElementById('changePasswordBtn');
const passwordChangeSection = document.getElementById('passwordChangeSection');
changePasswordBtn.addEventListener('click', () => {
  passwordChangeSection.classList.toggle('hidden');
});

// Fetches the user data from the database using the username stored in the URL
function populateProfileModal() {
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

if (!username) {
  console.error('No username found in the URL');
  return;
}

// Fetch user data from your backend endpoint
fetch(`http://localhost:5008/getUser?username=${username}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(userData => {
    // Populate the profile modal fields with the data from the server
    document.getElementById('profileUsernameInput').value = userData.username;
    document.getElementById('profileFirstNameInput').value = userData.firstName;
    document.getElementById('profileLastNameInput').value = userData.lastName;
    document.getElementById('profileEmailInput').value = userData.email;

   // IMPORTANT: Update the hidden field with the original username
    document.getElementById('originalUsernameInput').value = userData.username;
  })
  .catch(error => {
    console.error('Error fetching user data:', error);
  });
}

// When the profile button is clicked, show the modal and populate the fields
profileBtn.addEventListener('click', () => {
// First, fetch and populate the user data
populateProfileModal();

// Then show the modal
profileModal.classList.remove('hidden');
});

// Handle profile form submission (placeholder)
document.getElementById('profileForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  profileModal.classList.add('hidden');
});

/** Valides that both the new password and confirm password watch
* Sends a POST request to the /changePasword endpoint
*/
document.getElementById('passwordChangeForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    alert("The new passwords do not match!");
    return;
  }

// Retrieve the updated username from the hidden field instead of the URL
const username = document.getElementById('originalUsernameInput').value;
if (!username) {
  alert("Username not found.");
  return;
}

  if (!username) {
    alert("Username not found.");
    return;
  }

  

  // Create the data payload
  const data = { username, currentPassword, newPassword };

  try {
    const response = await fetch('http://localhost:5008/changePassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      // Hide the password change section after success.
      document.getElementById('passwordChangeSection').classList.add('hidden');
    } else {
      alert("Error: " + result.error);
    }
  } catch (error) {
    alert("An error occurred.");
    console.error("Error updating password:", error);
  }
});

/**
* Handles updating the profil form when the admin wants to update their account info
* add a hidden original username field
* event listener that calls the updateUser endpoint
*/
document.getElementById('profileForm').addEventListener('submit', async (e) => {
e.preventDefault();

// Get the values from the form
const originalUsername = document.getElementById('originalUsernameInput').value;
const username = document.getElementById('profileUsernameInput').value;
const firstName = document.getElementById('profileFirstNameInput').value;
const lastName = document.getElementById('profileLastNameInput').value;
const email = document.getElementById('profileEmailInput').value;

// Create a payload with the updated user details
const data = { originalUsername, username, firstName, lastName, email };

try {
  const response = await fetch('http://localhost:5008/updateUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();

  if (response.ok) {
    // Update the form fields with the new data (if needed)
    document.getElementById('profileUsernameInput').value = result.updatedUser.username;
    document.getElementById('profileFirstNameInput').value = result.updatedUser.firstName;
    document.getElementById('profileLastNameInput').value = result.updatedUser.lastName;
    document.getElementById('profileEmailInput').value = result.updatedUser.email;
    // **Update the hidden field with the new username**
    document.getElementById('originalUsernameInput').value = result.updatedUser.username;


    // Optionally update the welcome message, etc.
    document.getElementById('welcomeMessage').innerHTML = `
      Welcome to your dashboard, ${result.updatedUser.username}.<br>
      Please choose a tab above to get started.
    `;
    
    alert(result.message);
    // Close the modal if you want
    document.getElementById('profileModal').classList.add('hidden');
  } else {
    alert("Error: " + result.error);
  }
} catch (error) {
  alert("An error occurred while updating the profile.");
  console.error("Update error:", error);
}
});

function setTeamsLink() {
    // 1. Get the username
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    
    // 2. If we have it, update the link
    if (username) {
      document.getElementById('teamsLink').href = `Teams.html?username=${username}`;
    }
  }

  // 3. Run after DOM is ready
  document.addEventListener('DOMContentLoaded', setTeamsLink);

  