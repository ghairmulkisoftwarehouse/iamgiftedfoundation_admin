export const validatePostForm = (data) => {
  const errors = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required";
  } else if (data.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters";
  }

  return errors;
};