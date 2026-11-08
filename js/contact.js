const form = document.getElementById("contact-form");
const success = document.getElementById("form-success");

const fields = ["name", "email", "phone", "message"];

// Show or clear an error for one field
function setError(id, message) {
  document.getElementById(id + "-error").textContent = message;
  document.getElementById(id).classList.toggle("invalid", message !== "");
}

// Return an error message for a field, or "" if valid
function validateField(id, value) {
  if (value === "") return "This field cannot be empty.";

  if (id === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) return "Please enter a valid email address.";
  }

  if (id === "phone") {
    if (!/^\d+$/.test(value)) return "Phone number must contain digits only.";
  }

  return "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  success.textContent = "";
  let allValid = true;

  fields.forEach(function (id) {
    const value = document.getElementById(id).value.trim();
    const error = validateField(id, value);
    setError(id, error);
    if (error !== "") allValid = false;
  });

  if (allValid) {
    success.textContent = "Thank you! Your message has been sent successfully.";
    form.reset();
  }
});

// Clear a field's error as the user fixes it
fields.forEach(function (id) {
  document.getElementById(id).addEventListener("input", function () {
    setError(id, validateField(id, this.value.trim()));
  });
});