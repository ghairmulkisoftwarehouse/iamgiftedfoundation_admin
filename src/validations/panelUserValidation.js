export const validatePanelUserForm = (data) => {
  const errors = {};

  // Username
  if (!data.name || data.name.trim() === "") {
    errors.name = "User name is required.";
  } else if (data.name.trim().length < 3) {
    errors.name = "User name must be at least 3 characters.";
  }

  // Email
  if (!data.email || data.email.trim() === "") {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  // Password
  if (!data.password) {
    errors.password = "Password is required.";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  // Confirm Password
  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirm password is required.";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};    