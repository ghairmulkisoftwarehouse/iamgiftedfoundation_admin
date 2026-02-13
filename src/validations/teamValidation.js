export const validateTeamForm = (data) => {
  const errors = {};

  // Name validation
  if (!data.name || data.name.trim() === "") {
    errors.name = "Name is required.";
  } else if (data.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }

  // Designation validation
  if (!data.designation || data.designation.trim() === "") {
    errors.designation = "Designation is required.";
  }


  return errors;
};
