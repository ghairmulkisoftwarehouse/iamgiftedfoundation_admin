export const validateLoginForm = (data) => {
  const errors = {};

  // Email validation
  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else {
    // Simple email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};
