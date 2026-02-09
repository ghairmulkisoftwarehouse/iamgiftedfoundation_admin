export const validateUpadateImpactForm = (data) => {
  const errors = {};

//   if (!data.title || data.title.trim() === "") {
//     errors.title = "Title is required.";
//   }

//   if (!data.piller) {
//     errors.piller = "Pillar is required.";
//   }

  if (
    data.supportCount !== "" &&
    (isNaN(data.supportCount) || Number(data.supportCount) < 0)
  ) {
    errors.supportCount = "Support count must be a valid number.";
  }

  if (
    data.amount !== "" &&
    (isNaN(data.amount) || Number(data.amount) < 0)
  ) {
    errors.amount = "Amount must be a valid number.";
  }

  return errors;
};
