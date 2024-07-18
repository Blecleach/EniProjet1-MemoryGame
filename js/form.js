import {
  showError,
  validateEmail,
  validatePassword,
  evaluatePasswordStrength,
  updateStrengthBar,
  saveUser,
  checkEmailExists,
} from "./functionsForm.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formulaire");
  const username = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const cancelButton = document.getElementById("cancel-button");

  // Créer les éléments d'aide pour le mot de passe
  const { passwordHelp, strengthBar } = createPasswordHelpElements(password);

  // Mise à jour de l'aide pour le mot de passe lors de la saisie
  password.addEventListener("input", function () {
    const strength = evaluatePasswordStrength(password.value);
    passwordHelp.textContent = `Force du mot de passe : ${strength.text}`;
    updateStrengthBar(strength.score, strengthBar);
  });

  // Gestion de la soumission du formulaire
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const valid = await validateForm(
      username,
      email,
      password,
      confirmPassword
    );

    if (valid) {
      saveUser(username.value, email.value, password.value);
      alert("Inscription réussie !");
      window.location.href = "../connection.html";
    }
  });

  // Gestion du bouton Annuler
  if (cancelButton) {
    cancelButton.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }
});

function createPasswordHelpElements(password) {
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

  return { passwordHelp, strengthBar };
}

async function validateForm(username, email, password, confirmPassword) {
  let valid = true;

  document.querySelectorAll(".error").forEach((el) => el.remove());

  if (username.value.length < 3) {
    valid = false;
    showError(
      username,
      "Le nom d'utilisateur doit comporter au moins 3 caractères."
    );
  }

  if (!validateEmail(email.value)) {
    valid = false;
    showError(email, "Veuillez entrer une adresse email valide.");
  } else {
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
    showError(confirmPassword, "Les mots de passe ne correspondent pas. >:(");
  }

  return valid;
}
