import { combineDateTime } from "../utils/combineDateTime"; 

export const validateEventForm = (data, startDate, startTime, endDate, endTime) => {
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

  // Start & End Dates
  if (!startDate) {
    errors.startDate = "Start date is required";
  }
  if (!endDate) {
    errors.endDate = "End date is required";
  }

  // Only check order if both dates exist
  if (startDate && endDate && startTime != null && endTime != null) {
    const start = combineDateTime(startDate, startTime);
    const end = combineDateTime(endDate, endTime);
    if (start && end && new Date(start) > new Date(end)) {
      errors.startDate = "Start date cannot be later than end date";
      errors.endDate = "End date cannot be earlier than start date";
    }
  }

  return errors;
};
