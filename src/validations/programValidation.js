export const validateProgramForm = (data) => {
  const errors = {};

  // Title
  if (!data.title.trim()) {
    errors.title = "Title is required";
  } else if (data.title.length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  // Category
  if (!data.category.trim()) {
    errors.category = "Category is required";
  }

  // Tags
  // if (!data.tags || data.tags.length === 0) {
  //   errors.tags = "Please add at least one tag";
  // }

//   // Description
//   if (!data.description || data.description.trim().length < 4) {
//     errors.description = "Description must be at least 4 characters";
//   }

  // Cover Image
  // if (!data.coverImage) {
  //   errors.coverImage = "Cover image is required";
  // }

//   // Gallery Images
  // if (!data.gallery || data.gallery.length === 0) {
  //   errors.gallery = "Please upload at least one gallery image";
  // }

  // Organization Name
  // if (!data.organizationName.trim()) {
  //   errors.organizationName = "Organization name is required";
  // }

  // Phone Number
  // if (!data.phoneNumber.trim()) {
  //   errors.phoneNumber = "Phone number is required";
  // } else if (!/^[0-9]{7,15}$/.test(data.phoneNumber)) {
  //   errors.phoneNumber = "Invalid phone number";
  // }

  // Email
  // if (!data.email.trim()) {
  //   errors.email = "Email is required";
  // } else if (
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
  // ) {
  //   errors.email = "Invalid email address";
  // }

  // Website (optional)
  // if (data.website && !/^https?:\/\/.+\..+/.test(data.website)) {
  //   errors.website = "Invalid website URL";
  // }

  return errors;
};
