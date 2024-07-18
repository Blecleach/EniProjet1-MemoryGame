export function showError(input, message) {
  const error = document.createElement("div");
  error.className = "error";
  error.textContent = message;
  input.parentNode.insertBefore(error, input.nextSibling);
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  return password.length >= 6;
}

export function evaluatePasswordStrength(password) {
  let score = 0;
  if (password.length >= 6) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (
    password.length > 9 &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
    /\d/.test(password)
  )
    score += 1;

  let text = "Faible";
  if (score === 2) text = "Moyen";
  if (score === 3) text = "Fort";
  if (score === 4) text = "Très Fort";

  return { score: score * 25, text: text };
}

