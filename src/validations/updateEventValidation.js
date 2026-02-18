import { combineDateTime } from "../utils/combineDateTime";

export const validateUpdateEventForm = (
  data,
  eventDate,
  eventTime,
  startDate,
  startTime,
  endDate,
  endTime
) => {
  const errors = {};

  // Title (optional, only validate length if provided)
  if (data.title?.trim() && data.title.length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  // Category (optional)
  // Only validate dependent fields if category exists
  const isProgramCategory = data.category?.title === "Program";

  // Capacity
  if (data.capacity !== null && data.capacity !== "") {
    const capacityNumber = Number(data.capacity);
    if (Number.isNaN(capacityNumber)) {
      errors.capacity = "Capacity must be a number";
    } else if (capacityNumber <= 0) {
      errors.capacity = "Capacity must be greater than 0";
    }
  }

  // Combine date and time only if both exist
  const eventDateTime = eventDate && eventTime ? combineDateTime(eventDate, eventTime) : null;
  const startDateTime = startDate && startTime ? combineDateTime(startDate, startTime) : null;
  const endDateTime = endDate && endTime ? combineDateTime(endDate, endTime) : null;

  // Validate date order only if dates exist
  if (startDateTime && endDateTime) {
    if (new Date(startDateTime) > new Date(endDateTime)) {
      errors.startDate = "Registration start cannot be later than registration end";
      errors.endDate = "Registration end cannot be earlier than registration start";
    }
  }

  if (startDateTime && eventDateTime) {
    if (new Date(startDateTime) > new Date(eventDateTime)) {
      errors.startDate = "Registration start must be before the event date";
    }
  }

  if (endDateTime && eventDateTime) {
    if (new Date(endDateTime) > new Date(eventDateTime)) {
      errors.endDate = "Registration end must be before the event date";
    }
  }

  // Program category validations
  if (isProgramCategory) {
    if (!data.piller) {
      errors.piller = "Piller is required for Program category";
    }
    if (!data.program) {
      errors.program = "Program is required";
    }
  }

  return errors;
};
