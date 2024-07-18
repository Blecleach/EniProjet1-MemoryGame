import {
  showError,
  validateEmail,
  validatePassword,
  evaluatePasswordStrength,
  updateStrengthBar,
  saveUser,
} from "./functionsForm.js";


document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formulaire");
  const username = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const cancelButton = document.getElementById("cancel-button");


  const passwordHelp = document.createElement("div");
  passwordHelp.className = "password-help";
  password.parentNode.insertBefore(passwordHelp, password.nextSibling);

  const strengthBarContainer = document.createElement("div");
  strengthBarContainer.id = "password-strength";

  const strengthBar = document.createElement("div");
  strengthBar.id = "strength-bar";
  strengthBarContainer.appendChild(strengthBar);
  password.parentNode.insertBefore(
    strengthBarContainer,
    passwordHelp.nextSibling
  );

  password.addEventListener("input", function () {
    const strength = evaluatePasswordStrength(password.value);
    passwordHelp.textContent = `Niveau de sécurité du mot de passe : ${strength.text}`;
    updateStrengthBar(strength.score, strengthBar);
  });

  // Gestion de la soumission du formulaire
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    let valid = true;

    // reini error messages
    document.querySelectorAll(".error").forEach((el) => el.remove());

    if (username.value.length < 3) {
      valid = false;
      showError(
        username,
        "Le nom d'utilisateur doit être constitué d'au moins 3 caractères."
      );
    }

    if (!validateEmail(email.value)) {
      valid = false;
      showError(email, "Veuillez entrer une adresse email valide.");
    } else {
      // verif asynchrone si l'email est déjà utilisé
      const emailExists = await checkEmailExists(email.value);
      if (emailExists) {
        valid = false;
        showError(email, "Cet email est déjà utilisé :(");
      }
    }

   
    if (!validatePassword(password.value)) {
      valid = false;
      showError(
        password,
        "Le mot de passe doit comporter au moins 6 caractères."
      );
    }

 
    if (password.value !== confirmPassword.value) {
      valid = false;
      showError(
        confirmPassword,
        "Les mots de passe ne correspondent pas. (bouffon)"
      );
    }

    // Empêcher l'envoi du formulaire si des validations ont échoué
    if (!valid) {
      return;
    }

    // Enregistrement de l'utilisateur dans le localStorage
    saveUser(username.value, email.value, password.value);

    // Redirection après inscription réussie
    alert("Inscription réussie !");
    window.location.href = "../connection.html";
  });

  // Gestion du bouton Annuler
  if (cancelButton) {
    cancelButton.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }

  // Fonction asynchrone pour vérifier si l'email est déjà utilisé
  async function checkEmailExists(email) {
    // Simulation de vérification côté client
    // conversion JSON-> tableau JS
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = existingUsers.find((user) => user.email === email);
    return foundUser ? true : false;
  }
});
