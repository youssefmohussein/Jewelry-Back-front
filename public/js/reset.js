const resetForm = document.getElementById("resetPasswordForm");

resetForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const Email = document.getElementById("Email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!Email || !password || !confirmPassword) {
    alert("All fields are required!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("/users/resetpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email, password, confirmPassword })
    });

    const result = await response.json();
    alert(result.message);

    if (response.ok) {
      window.location.href = "/login"; // Redirect to login page
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred. Please try again.");
  }
});
