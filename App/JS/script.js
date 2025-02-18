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
  if (role === 1) {
    loginTitle.textContent = 'Login';
  } else {
    loginTitle.textContent = 'Login';
  }
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

/**
     * This sections handles the backend for the sign up form, it registers the data into the database.
     * It also validates that both passwords match.
     */
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

    // Function to handle team creation
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("createTeamForm").addEventListener("submit", async function (event) {
      event.preventDefault();

      const teamData = {
          teamName: document.getElementById("teamNameInput").value,
          teamDescription: document.getElementById("teamDescInput").value
      };
      console.log(teamData);

      try {
          const response = await fetch("http://localhost:5008/teams", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(teamData)
          });

          const data = await response.json();
          if (response.ok) {
              alert("Team created successfully!");
              window.location.reload(); // Reload the page to see the new team
          } else {
              alert("Team creation failed: " + data.message);
          }
      } catch (error) {
          alert("An error occurred.");
          console.error("Team Creation Error:", error);
      }
  });
});
