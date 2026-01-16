
export const validateCategoriesForm = (data) => {
  const errors = {};

  // Title
  if (!data.title.trim()) {
    errors.title = "Title is required";
  } else if (data.title.length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  return errors;
};
