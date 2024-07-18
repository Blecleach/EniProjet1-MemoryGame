//avant tout : s'assurer que le DOM est chargé sinon boom askip (j'ai pas testé + menfou + j'ai pas lu)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formulaire");
  const username = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  //aide au mdp à tafer

  const passwordHelp = document.createElement("div");

  passwordHelp.className = "password-help";
  password.parentNode.insertBefore(passwordHelp, password.nextSibling);

  password.addEventListener("input", function () {
    const strength = evaluatePasswordStrength(password.value);
    passwordHelp.textContent = `Niveau de sécurité du mot de passe : ${strength}`;
  });

  // *

  form.addEventListener("submit", function (event) {
    let valid = true;

    // reinitialise les messages d'erreur
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
        "Les mots de passe ne correspondent pas. (bouffon va)"
      );
    }
    // preventDefault sert à empecher le comportement par défaut (ici action)
    if (!valid) {
      event.preventDefault();
    }
  });
  function showError(input, message) {
    const error = document.createElement("div");
    error.className = "error";
    error.textContent = message;
    input.parentNode.insertBefore(error, input.nextSibling);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  // règle assouplie
  function validatePassword(password) {
    return password.length >= 6;
  }
  // force du mdp
  function evaluatePasswordStrength(password) {
    if (password.length < 6) {
      return "Faible";
    } else if (
      password.length >= 6 &&
      password.length <= 9 &&
      containsSymbolOrNumber(password)
    ) {
      return "Moyen";
    } else if (password.length > 9 && containsSymbolAndNumber(password)) {
      return "Fort";
    } else {
      return "Faible";
    }
  }

  // Fonction pour la présence de symboles OU de chiffres dans le mdp
  function containsSymbolOrNumber(password) {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(password);
  }

  // Fonction pour la présence de symboles ET de chiffres dans le mdp
  function containsSymbolAndNumber(password) {
    return (
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(password) &&
      /[0-9]/.test(password)
    );
  }
});
