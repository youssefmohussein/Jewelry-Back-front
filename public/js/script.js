// Animation toggle
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Sign Up Form
const signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("Email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!name || !email || !password || !confirmPassword) {
    alert("All fields are required!");
    return;
  }

  const isValid = password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password);

  if (!isValid) {
    alert("Password must be at least 8 characters and include both letters and numbers.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, Email: email, password })
    });

    const result = await response.text();
    alert(result);
    if (response.ok) {
      container.classList.remove("active"); // Go to login view
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred. Please try again.");
  }
});

// Sign In Form
const signInForm = document.getElementById("signInForm");
signInForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Email and password are required!");
    return;
  }

  const isValid = password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password);

  if (!isValid) {
    alert("Password must be at least 8 characters and include both letters and numbers.");
    return;
  }

  try {
    const response = await fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email, password })
    });

    const result = await response.json();

    if (response.ok) {
      alert("Login successful!");
      
      // Check the role and redirect accordingly
      if (result.role === "customer") {
        window.location.href = "/home";  // Redirect to customer home page
      } else if (result.role === "admin") {
        window.location.href = "/admin-dashboard";  // Redirect to admin dashboard
      } else {
        alert("Unknown role. Please contact support.");
      }
    } else {
      alert(result.message || "Invalid credentials");
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred. Please try again.");
  }
  
});
