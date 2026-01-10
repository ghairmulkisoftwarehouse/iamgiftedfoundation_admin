export const validatePanelUserForm = (data) => {
  const errors = {};

  // Name
  if (!data.name || data.name.trim() === "") {
    errors.name = "User name is required.";
  } else if (data.name.trim().length < 3) {
    errors.name = "User name must be at least 3 characters.";
  }

  // Email
  if (!data.email || data.email.trim() === "") {
    errors.email = "Email is required.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.email = "Enter a valid email address.";
  }

  // Phone Number
  if (!data.phoneNumber || data.phoneNumber.trim() === "") {
    errors.phoneNumber = "Phone number is required.";
  } else if (!/^\+?\d{10,15}$/.test(data.phoneNumber.replace(/\s/g, ""))) {
    errors.phoneNumber = "Enter a valid phone number.";
  }

  // User Type
  if (!data.userType || data.userType.trim() === "") {
    errors.userType = "User type is required.";
  }

  // Password
  if (!data.password) {
    errors.password = "Password is required.";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  // Confirm Password
  if (!data.confrimPassword) {
    errors.confrimPassword = "Confirm password is required.";
  } else if (data.password !== data.confrimPassword) {
    errors.confrimPassword = "Passwords do not match.";
  }

  // Gallery
  if (!data.gallery || data.gallery.length === 0) {
    errors.gallery = "At least one image is required.";
  }



  return errors;
};
