//avant tout : s'assurer que le DOM est chargé sinon boom askip (j'ai pas testé + menfou + j'ai pas lu)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".formulaire");
  const username = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

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
        "Le mot de passe doit comporter au moins 6 caractères, inclure un symbole, un chiffre et des lettres."
      );
    }


    if (password.value !== confirmPassword.value) {
      valid = false;
      showError(confirmPassword, "Les mots de passe ne correspondent pas. (bouffon va)");
    }

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

  function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return re.test(String(password));
  }
});
