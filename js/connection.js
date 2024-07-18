document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("passwordLog").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      alert("Tu es connecté !");
      window.location.href = "./profilutilisateur.html"; 
    } else {
      alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
  });

  const cancelButton = document.getElementById("cancel-button");
  if (cancelButton) {
    cancelButton.addEventListener("click", function () {
      window.location.href = "./index.html"; 
    });
  }
});
