export const validateImpactForm = (data) => {
  const errors = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required.";
  }

  if (!data.foundUses || data.foundUses.trim() === "") {
    errors.foundUses = "Found Uses is required.";
  }

  if (!data.type || data.type.trim() === "") {
    errors.type = "Type is required.";
  }

  if (!data.count || data.count.trim() === "") {
    errors.count = "Impact Count is required.";
  } else if (isNaN(data.count)) {
    errors.count = "Impact Count must be a number.";
  }

  if (!data.description || data.description.trim() === "") {
    errors.description = "Description is required.";
  }

  if (!data.gallery || data.gallery.length === 0) {
    errors.gallery = "At least one image is required.";
  }

  return errors;
};
