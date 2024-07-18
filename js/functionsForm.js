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

export function updateStrengthBar(score, strengthBar) {
  strengthBar.style.width = score + "%";
  if (score < 50) strengthBar.style.backgroundColor = "red";
  else if (score < 75) strengthBar.style.backgroundColor = "orange";
  else strengthBar.style.backgroundColor = "green";
}

export function saveUser(username, email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
}

export async function checkEmailExists(email) {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const foundUser = existingUsers.find((user) => user.email === email);
  return foundUser ? true : false;
}
