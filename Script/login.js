
alert("Username: Yashraj \n Password: 305");
const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  // id and pass
  if (username === "yashraj" && password === "305") {
    // Successful login
    errorMessage.textContent = "";
    alert("Login successful!");
    window.location.href = "Webpages/Home.html";
  } else {
    // Failed login
    errorMessage.textContent = "Invalid username or password";
  }
});
